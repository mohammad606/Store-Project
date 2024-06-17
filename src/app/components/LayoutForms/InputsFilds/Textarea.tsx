import React from "react";
import { useFormContext } from "react-hook-form";

interface textAreaType {
  className?: string;
  label?: string;
  name: string;
  props?: any[];
  dir?: string;
  defaultValue?: any;
  required?: boolean;
}

const Textarea: React.FC<textAreaType> = ({
  className,
  label,
  name,
  dir,
  defaultValue,
  required = false,

  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={className}>
      {label ? (
        <label className={"label w-fit"}>
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : false} :
        </label>
      ) : (
        ""
      )}
      <textarea
        {...props}
        {...register(`${name}`)}
        id="message"
        rows={4}
        dir={dir}
        className="text-sm textarea textarea-bordered w-full"
        placeholder="Write your thoughts here..."
        defaultValue={defaultValue ? defaultValue : ""}
      />
    </div>
  );
};

export default Textarea;