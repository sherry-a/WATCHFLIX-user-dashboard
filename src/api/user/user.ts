'use client'
import axios,{AxiosResponse} from "axios";
import { IUserSignUp,IUserSignUpResponse, IUserSignIn} from "@/utility/interfaces/user/user";
const USER_API_URL='http://localhost:9000';
const apiUser: Record<string,string>={
    create: `${USER_API_URL}/users/signup`,
    signIn: `${USER_API_URL}/users/signin`

}
export const createUser=(formData:IUserSignUp): Promise<AxiosResponse<IUserSignUpResponse>> =>{
    return axios.post(apiUser.create,{
      ...formData
    })
}
export const signInUser=(formData:IUserSignIn)=>{
    return axios.post(apiUser.signIn,{
      ...formData
    })
}