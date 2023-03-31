import {
  emailCheck,
  forgotPassword,
  login,
  loginCheck,
  logout,
  removeAccessToken,
  sendOtp,
  storeAccessToken,
  updatePassword,
  verifyOtp,
} from './AuthService';

import {
  getAllCustomers,
  getCustomerById,
  getCustomerRetirementDetailsbyId,
  getCustomerMonthlyDepositbyId
} from './CustomerService';

import {
  register,
  getAllUsers,
  updateEmployee,
  removeEmployee,
  emailAlreadyExists,
  getUserTokenById,
  getUserById
} from './UserService';

export {
  loginCheck,
  storeAccessToken,
  removeAccessToken,
  login,
  sendOtp,
  verifyOtp,
  logout,
  emailCheck,
  forgotPassword,
  updatePassword,
  getAllCustomers,
  getCustomerById,
  getCustomerRetirementDetailsbyId,
  getCustomerMonthlyDepositbyId,
  register,
  getAllUsers,
  updateEmployee,
  removeEmployee,
  emailAlreadyExists,
  getUserTokenById,
  getUserById
};
