export interface IUser {
  id?: string;
  enabled?: boolean;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  attributes: {
    organizationId: string[];
    organizationName: string[];
  };
}
export interface ITempUserData {
  username?: string;
  userId?: string;
}

export interface ICreateProject {
  organization_id: string;
  name: string;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface IChangePassword {
  userId: string;
  newPassword: string;
}

export interface ISignUp {
  email: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  username: string;
}

export interface ISignUpResponse {
  email: string;
  registered: boolean;
}

export interface IVerifyResponse {
  email: string;
  verified: boolean;
  userId: string;
}

export interface IResetPassword {
  password: string;
  confirmPassword: string;
}
