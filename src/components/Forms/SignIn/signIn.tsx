"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/components/InputField/inputField";
import * as yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useUserContext } from "@/hooks/user/user";
import { useMutation } from "@tanstack/react-query";
import Toastr from "@/components/Toastr/Toastr";
import { signInUser } from "@/api/user/user";
const signInSchema = yup
  .object({
    email: yup.string().email().trim().required(),
    password: yup.string().trim().required(),
  })
  .required();
export type ISignInFormData = yup.InferType<typeof signInSchema>;
const SignInForm = ({ className, ...res }: ISignInFormProps) => {
  const [responseError, setResponseError] = useState<string>("");
  const { isError: signInError, mutateAsync: signInUserMutation } = useMutation(
    {
      mutationFn: signInUser,
    }
  );
  const { signIn, isAuthenticated } = useUserContext();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ISignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleFormSubmit = async (formData: ISignInFormData): Promise<void> => {
    try {
      const response = await signInUserMutation(formData);
      const { user, token } = response.data;
      if (!user) {
        setResponseError("Invalid Credentials");
        setTimeout(() => {
          setResponseError("");
        }, 3000);
      } else {
        signIn(user, token);
      }
    } catch (err: any) {
      console.log("err", err);
    }
  };
  return (
    <>
      {(signInError || responseError) && (
        <Toastr
          type="error"
          message={responseError ?? "An error has occured"}
        />
      )}
      {isAuthenticated && <Toastr message="User signedIn successfully" />}
      <div
        className={`h-[550px] w-[600px] rounded-xl bg-black shadow-2xl shadow-black ${className}`}
      >
        <form
          className="h-full w-full flex flex-col py-10 px-7 items-center"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h2 className="text-2xl font-extrabold text-white">Sign In</h2>
          <div className="my-5 w-full">
            <InputField
              fieldName="email"
              fieldLabel="Email"
              errMsg={errors.email?.message}
              register={register}
            />
            <InputField
              fieldName="password"
              fieldLabel="Password"
              errMsg={errors.password?.message}
              register={register}
            />
          </div>
          <button
            className="bg-black rounded-lg min-w-[100px] h-[50px] font-bold text-white border-2 border-white hover:bg-white hover:text-black "
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

interface ISignInFormProps extends HTMLAttributes<HTMLDivElement> {}

export default SignInForm;
