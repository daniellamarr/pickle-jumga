import moment from 'moment';
import bcrypt from 'bcryptjs';
import OTP from '../../db/models/otp';
import User from '../../db/models/user';
import generateOTP from '../../helpers/generateOTP';
import sendgrid from '../../helpers/sendgrid';
import userTypes from '../../helpers/userTypes';
import { generateToken } from '../../helpers/token';
import { validateEmail, validateFields } from '../../helpers/validation';

export const signup = async (req, res) => {
  try {
    const {
      firstname, surname, phoneNumber, dob, email, type, password, store
    } = req.body;
    if (!type || !userTypes.includes(type)) {
      return res.status(400).send({
        success: false,
        message: 'Please enter a valid user type'
      });
    }
    const requiredFields = [
      {
        name: 'firstname',
        value: firstname,
      },
      {
        name: 'surname',
        value: surname,
      },
      {
        name: 'phone number',
        value: phoneNumber,
      },
      {
        name: 'date of birth',
        value: dob,
      },
      {
        name: 'password',
        value: password,
      },
    ];
    if (type === 'merchant') {
      requiredFields.push(
        {
          name: 'store name',
          value: store?.name,
        },
        {
          name: 'store address',
          value: store?.address,
        },
        {
          name: 'store city',
          value: store?.city,
        },
        {
          name: 'store country',
          value: store?.country,
        },
        {
          name: 'store legal form',
          value: store?.legalForm,
        },
      );
    }
    const validate = validateFields(requiredFields);
    if (!validate.status) {
      return res.status(400).send({
        success: false,
        message: validate.message
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).send({
        success: false,
        message: 'The email sent is invalid'
      });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).send({
        success: false,
        message: 'A user already exists with this email address'
      });
    }
    const hashPassword = bcrypt.hashSync(password);
    const user = await User.create({
      ...req.body,
      password: hashPassword,
      store,
    });
    delete user.password;
    const otp = await generateOTP(6, { user: user._id });
    if (otp) {
      await sendgrid(
        email,
        'Welcome to Jumga',
        `Your otp is ${otp}`,
        `<p>Your otp is <strong>${otp}</strong></p>`
      )
    }
    const token = generateToken({
      id: user._id,
      email,
    });
    if (user) {
      return res.status(201).send({
        success: true,
        message: 'Signup was successful',
        data: {
          user,
          token
        }
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'an error occured',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Incorrect user details'
      });
    }
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      return res.status(400).send({
        success: false,
        message: 'Incorrect user details'
      });
    }
    delete user.password;
    const token = generateToken({
      id: user._id,
      email,
    });
    return res.status(200).send({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token,
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const {code, user} = req.body;

    const findOtp = await OTP.findOne({ code, user });
    if (!findOtp) {
      return res.status(400).send({
        success: false,
        message: 'The otp entered is either invalid/already expired'
      });
    }

    const expiry = moment().diff(findOtp.expires, 'minutes');

    if (expiry >= 10) {
      return res.status(400).send({
        success: false,
        message: 'The otp entered is either invalid/already expired'
      });
    }

    const findUserAndUpdate = await User.findByIdAndUpdate(user, {accountVerified: true});
    if (!findUserAndUpdate) {
      return res.status(400).send({
        success: false,
        message: 'An error occured while verifying user'
      });
    }

    await OTP.deleteOne({ code, user });

    return res.status(200).send({
      success: true,
      message: 'Verification Successful',
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      message: 'an error occured'
    });
  }
}

export const verifyPayment = async (req, res) => {
  
}
