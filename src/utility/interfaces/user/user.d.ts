export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}
export interface IUserSignIn extends omit<IUserSignUp, "name"> {}
export interface IUser extends Omit<IUserSignUp, "password"> {
}
export interface IUserSignUpResponse {
  user:IUser;
  token: string;
}