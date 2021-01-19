import moment from 'moment';
import OTP from '../db/models/otp';
import getRandomNumbers from './getRandom';

const generateOTP = async (length = 6, { user }) => {
  try {
    const generateCode = getRandomNumbers(length);
    const expires = moment().add(10, 'minutes').toDate();
    const createOtp = await OTP.create({
      code: generateCode,
      user,
      expires
    });
    if (!createOtp) {
      return false;
    }
    return generateCode;
  } catch (err) {
    return false;
  }
};

export default generateOTP;
