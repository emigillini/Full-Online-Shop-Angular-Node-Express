export interface IRegisterUser {
    username: string;
    email: string;
    password: string;
    identification_number:number;
    phone: string;
    address: string;
  }

  export interface ILoginUser {
    username: string;
    email: string;
    password: string;
  }