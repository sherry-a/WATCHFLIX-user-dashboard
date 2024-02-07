"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/components/InputField/inputField";
import * as yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useUserContext } from "@/hooks/user/user";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/user/user";
import { IUserSignUpResponse } from "@/utility/interfaces/user/user";
import CustomLoadingButton from "@/components/LoadingButton/loadingButton";
import Toastr from "@/components/Toastr/Toastr";
const signUpSchema = yup
  .object({
    name: yup.string().trim().required().min(4),
    email: yup.string().email().trim().required(),
    password: yup.string().trim().required().min(6),
  })
  .required();
export type ISignUpFormData = yup.InferType<typeof signUpSchema>;
const SignUpForm = ({ className, ...rest }: ISignUpFormProps) => {
  const [responseError, setResponseError] = useState<string>("");
  const {
    mutateAsync: createUserMutate,
    isSuccess: userCreationSuccess,
    isError: userCreationError,
    isPending,
  } = useMutation({
    mutationFn: createUser,
  });
  const { signIn } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const handleFormSubmit = async (formData: ISignUpFormData): Promise<void> => {
    try {
      const response = await createUserMutate(formData);
      const { user, token }: IUserSignUpResponse = response.data;
      signIn(user, token);
    } catch (err: any) {
      setResponseError(err.response?.data?.message);
    }
  };
  return (
    <>
      {userCreationError && (
        <Toastr
          type="error"
          message={responseError ?? "An error has occured"}
        />
      )}
      {userCreationSuccess && <Toastr message="User created successfully" />}
      <div
      {...rest}
        className={`h-[600px] w-[600px] rounded-xl bg-black shadow-2xl shadow-black ${className}`}
      >
        <form
          className="h-full w-full flex flex-col py-10 px-7 items-center"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h2 className="text-2xl font-extrabold text-white">Sign Up</h2>
          <div className="my-5 w-full">
            <InputField
              fieldName="name"
              fieldLabel="Name*"
              errMsg={errors.name?.message}
              register={register}
            />
            <InputField
              fieldName="email"
              fieldLabel="Email*"
              errMsg={errors.email?.message}
              register={register}
            />
            <InputField
              fieldName="password"
              fieldLabel="Password*"
              errMsg={errors.password?.message}
              register={register}
            />
          </div>
          <CustomLoadingButton
            title="Register"
            isLoading={isPending}
            className=" bg-black rounded-lg min-w-[100px] h-[50px] px-2 font-bold text-white border-2 border-white hover:bg-white hover:text-black "
          />
        </form>
      </div>
    </>
  );
};

interface ISignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

export default SignUpForm;
