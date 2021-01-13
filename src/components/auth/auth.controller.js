import bcrypt from 'bcryptjs';
import User from '../../db/models/user';
import { generateToken } from '../../helpers/token';
import { validateEmail, validateFields } from '../../helpers/validation';

export const signup = async (req, res) => {
  try {
    const {
      email, type, password, store
    } = req.body;
    if (!type) {
      return res.status(400).send({
        success: false,
        message: 'Please enter a valid user type'
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).send({
        success: false,
        message: 'The email sent is invalid'
      });
    }
    const hashPassword = bcrypt.hashSync(password);
    if (type === 'merchant') {
      const requiredFields = [
        {
          name: 'store name',
          value: store.name,
        },
        {
          name: 'store address',
          value: store.address,
        },
        {
          name: 'store city',
          value: store.city,
        },
        {
          name: 'store country',
          value: store.country,
        },
        {
          name: 'store legal form',
          value: store.legalForm,
        },
      ];
      const validate = validateFields(requiredFields);
      if (!validate.status) {
        return res.status(400).send({
          success: false,
          message: validate.message
        });
      }
    }
    const user = await User.create({
      ...req.body,
      password: hashPassword,
      store,
    });
    delete user.password;
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
    return res.status(500).send({
      success: false,
      message: 'an error occured'
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
