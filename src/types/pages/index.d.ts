export interface ICustomerData {
    profileImage: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    callingCode: string;
    country: string;
    citizenship: string;
    dob: string;
    address: string;
    employmentStatus: string;
    ppsnNumber: string;
}
export interface ICustomerResponse extends ICustomerData {
    basicInfo: {
        empId: number;
        lastName: string;
        profileImage?: string;
        firstName?: string;
    };
}

export interface IReuseGridProps {
    customName: string;
    customerDetails: string;
}

export interface IErrorResponse {
    response: {
        data: {
            message: string;
        };
        status: number;
    };
}