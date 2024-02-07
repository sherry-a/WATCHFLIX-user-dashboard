"use client";
import { HTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
export const InputField = ({
  className,
  fieldLabel,
  fieldName,
  errMsg,
  register,
  ...rest
}: IInputFieldProps) => {
  return (
    <div {...rest} className={`flex flex-col gap-2 w-full ${className}`}>
      <label className="text-white font-bold">{fieldLabel}</label>
      <input className="p-3 rounded-lg text-sm" {...register(fieldName)} />
      <p className="text-red-600">{errMsg}</p>
    </div>
  );
};
interface IInputFieldProps extends HTMLAttributes<HTMLDivElement> {
  fieldLabel: string;
  fieldName: string;
  errMsg?: string;
  register: UseFormRegister<any>;
}
