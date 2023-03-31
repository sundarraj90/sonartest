import ApiUtil from '../utils/ApiUtil';

interface Customer {
  id: number;
  name: string;
  email: string;
  // other properties
}

const getAllCustomers = async (
  rowsperpage: number,
  page: number,
  order: string,
): Promise<Customer[]> => {
  const response = await ApiUtil.getWithoutToken(
    `admin/customer?rowsperpage=${rowsperpage}&page=${page}&order=${order}`,
  );
  return response as Customer[];
}

const getCustomerById = async (customerId: number): Promise<unknown> =>
  await new Promise((resolve, reject) => {
    ApiUtil.getWithoutToken(`admin/customer/${customerId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });

const getCustomerRetirementDetailsbyId = async (
  id: string,
): Promise<unknown> =>
  await new Promise((resolve) => {
    const res = ApiUtil.getWithoutToken(`admin/customer-retire/${id}`);
    resolve(res);
  });

const getCustomerMonthlyDepositbyId = async (id: string): Promise<unknown> =>
  await new Promise((resolve) => {
    const res = ApiUtil.getWithoutToken(`admin/customer-payment/${id}`);
    resolve(res);
  });

export {
  getAllCustomers,
  getCustomerById,
  getCustomerRetirementDetailsbyId,
  getCustomerMonthlyDepositbyId
}