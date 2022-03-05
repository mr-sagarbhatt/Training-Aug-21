import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log(props, field, meta);

  return (
    <div className='form-group mb-2'>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
        {...field}
        {...props}
        autoComplete='off'
      />
      <ErrorMessage
        component='div'
        name={field.name}
        className='position-absolute text-danger'
      />
    </div>
  );
};

export { InputField };
