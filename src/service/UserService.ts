import { type EmployeeBody, type RegisterData } from 'types';
import ApiUtil from '../utils/ApiUtil';

interface IEmployeeProps {
  empId: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  profileImage: string | null;
  rememberToken: string | null;
  emailVerifiedAt: string | null;
  employeeResetToken: string | null;
  isActive: boolean;
  createdBy: number;
  updatedBy: number | null;
  createdAt: string;
  updatedAt: string;
}

const register = async (data: RegisterData): Promise<unknown> =>
  await new Promise((resolve) => {
    const employee = ApiUtil.postWithoutToken('admin/employee-register', data);
    resolve(employee);
  });

const getAllUsers = async (): Promise<IEmployeeProps> => {
  const employee = await ApiUtil.getWithoutToken('admin/employee') as IEmployeeProps;
  return employee;
};

const updateEmployee = async (id: number, body: EmployeeBody): Promise<string | undefined> => {
  try {
    await ApiUtil.postWithoutToken(`admin/employee-update/${id}`, body);
    return 'Successfully Updated';
  } catch (error) {
    // handle error here if necessary
    throw new Error(`Unable to Update. ${String(error)}`);

  }
};

const removeEmployee = async (id: number): Promise<string> => {
  try {
    await ApiUtil.postWithoutToken(`admin/employee-delete/${id}`);
    return 'Successfully Deleted';
  } catch (error) {
    throw new Error(`Unable to delete employee. ${String(error)}`);
  }
};

const emailAlreadyExists = async (email: string): Promise<unknown> =>
  await new Promise((resolve) => {
    const res = ApiUtil.postWithoutToken('admin/auth/emailAlreadyExists', {
      email,
    });
    resolve(res);
  });

const getUserTokenById = async (empId: number): Promise<unknown> =>
  await new Promise((resolve) => {
    const res = ApiUtil.getWithoutToken(`admin/employee-token/${empId}`);
    resolve(res);
  });

const getUserById = async (empId: number): Promise<unknown> =>
  await new Promise((resolve) => {
    const res = ApiUtil.getWithoutToken(`admin/employee-show/${empId}`);
    resolve(res);
  });

export {
  register,
  getAllUsers,
  updateEmployee,
  removeEmployee,
  emailAlreadyExists,
  getUserTokenById,
  getUserById
}