import { Controller, useForm } from "react-hook-form";
import "./Form.css";
import type { FieldData, FormData, FormProps } from "@/types/form";
import { fieldMap, fields } from "@/data/variables";
import { Field } from "./Field";

const Form = ({ provider }: FormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const providerFields = fields[provider];
  const onSubmit = async (data: FormData) => data;

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
              {...register(name, {
                required: fieldData.validation?.message,
              })}
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
