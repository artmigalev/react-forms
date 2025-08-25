import { Controller, useForm } from "react-hook-form";
import "./Form.css";
import { schema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldData, FormData } from "@/types/form";
import { fieldMap, fields } from "@/data/variables";
import { Field } from "./Field";
import { useAppDispatch } from "@/app/hooks";
import { setState } from "@/app/formData/formSlice";
import type React from "react";
const Form = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const providerFields = fields["formData"];
  const onSubmit = async (data: FormData) => {
    dispatch(setState(data));
  };
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      const maxSize = 5 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        return;
      }
      if (file.size > maxSize) {
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const renderField = (name: keyof FormData, fieldData: FieldData) => {
    switch (fieldData.type) {
      case "text":
      case "password":
        return (
          <Field
            label={fieldData.label}
            required={!!fieldData.validation?.required}
            error={errors[name]}
            key={name}
          >
            <input
              className="border rounded-xl text-center placeholder:text-2xl placeholder:red"
              {...register}
              type={fieldData.type}
              id={name}
              autoComplete={"off"}
            />
          </Field>
        );
      case "select":
        return (
          <Field label={fieldData.label} htmlFor={name} key={name} error={errors[name]}>
            <Controller
              rules={fieldData.validation}
              name={name}
              control={control}
              render={({
                field: { value, onChange, ...fieldProps },
                // fieldState: { invalid },
              }) => {
                return (
                  <select
                    {...fieldProps}
                    value={typeof value === "string" ? value : ""}
                    onChange={onChange}
                  >
                    {fieldData.placeholder && (
                      <option value={""} disabled>
                        {fieldData.placeholder}
                      </option>
                    )}
                    {(fieldData.options || []).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }}
            />
          </Field>
        );
      case "checkbox":
        return (
          <Field label={fieldData.label} htmlFor={name} key={name} error={errors[name]}>
            <input
              {...register(name, { required: fieldData.validation?.message })}
              type={fieldData.type}
              id={name}
              autoComplete={"off"}
            />
          </Field>
        );
      case "file":
        return (
          <Field label={fieldData.label} htmlFor={name} key={name} error={errors[name]}>
            <input
              {...register(name, { required: fieldData.validation?.message })}
              type={fieldData.type}
              id={fieldData.type}
              onChange={handleFile}
              accept="image/png ,image/jpeg"
              name={fieldData.type}
            />
          </Field>
        );
      default:
        throw new Error(`Unknown field type: ${(fieldData.type, fieldData.label)} `);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="mw-[100%] w-[100%]">
        <>
          {providerFields.map((fieldName) => {
            const field = fieldMap[fieldName];

            return renderField(fieldName, field);
          })}
          <div>
            <Field>
              <button className="btn-form-submit">{"Save"}</button>
            </Field>
          </div>
        </>
      </form>
    </div>
  );
};

export default Form;
