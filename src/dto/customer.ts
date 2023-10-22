export interface ICustomerProfile {
  dob: string;
  name: string;
  about: string;
  address: string;
  company: string;
  location: {
    lat: number;
    long: number;
  };
}

export interface ICustomer {
  id: string;
  email: string;
  profile: ICustomerProfile;
  username: string;
}
