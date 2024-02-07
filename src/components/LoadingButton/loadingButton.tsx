import { ButtonHTMLAttributes, HTMLProps } from "react";
import Image from "next/image";
const CustomLoadingButton = ({
  type,
  disabled,
  size = "small",
  title,
  className,
  spinner="right",
  isLoading=false,
  ...rest

}: ICustomButtonProps): ReturnType<React.FC> => {
  return (
    <button
      {...rest}
      disabled={disabled??isLoading}
      type={type}
      className={`flex items-center justify-between ${className} ${buttonSizes[size]}`}
    >
        <Image
        src="/icons/spinner.svg" 
        alt="Spinner"
        width={24}
        height={24}
        className="animate-spin h-[26px]"
        style={{ order: spinnerOrder[spinner], display: isLoading ? 'block' : 'none' }}
      />
      <div className={isLoading?'mx-0':'mx-auto'}>
        {title}
      </div>

    </button>
  );
};

const spinnerOrder={
    left:0,
    right:1
}

const buttonSizes = {
  small: "w-[115px]",
  medium: "w-[130px]",
  large: "w-[150px]",
  fullWidth: "w-full",
  halfWidth: "w-1/2",
};

interface ICustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large" | "fullWidth" | "halfWidth";
  className?: HTMLProps<HTMLElement>["className"];
  title: string;
  spinner?:"left"|"right"
  isLoading?:boolean
}
export default CustomLoadingButton;