interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

interface EmployeeBody {
    firstName: string;
    lastName?: string;
    email?: string;
}

export type {
    RegisterData,
    EmployeeBody
}