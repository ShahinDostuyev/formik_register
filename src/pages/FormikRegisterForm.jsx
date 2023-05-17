import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function FormikRegisterForm() {
  const addRegistrationValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name field could not be empty!")
      .max(50, "Name can not be more than 50 characters!"),
    email: Yup.string().required("Email field could not be empty!"),
    gender: Yup.string().required("Gender field could not be empty!"),
    password: Yup.string().required(
      "You have to set a password for safety reasons!"
    ),
    confirmPassword: Yup.string()
      .required("You have to confirm your password above!")
      .oneOf([Yup.ref("password")], "You have to enter the same password as in above"),
  });
  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@code\.edu\.az$/i.test(value)) {
      error = "You should have an email with @code.edu.az address ";
    }
    return error;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "female",
      password: "",
      confirmPassword: "",
    },
    validationSchema: addRegistrationValidationSchema,

    validate: (values) => {
      const errors = {};
      errors.email = validateEmail(values.email);
      if (errors.email) {
        return errors;
      }
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p style={{ color: "red" }}>{formik.errors?.name}</p>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p style={{ color: "red" }}>{formik.errors?.email}</p>
          </div>
          <div>
            <label htmlFor="gender">Gender: </label>
            <input
              id="gender"
              name="gender"
              type="radio"
              onChange={formik.handleChange}
              value={"male"}
            />
            male
            <input
              id="gender"
              name="gender"
              type="radio"
              onChange={formik.handleChange}
              value={"female"}
              checked={formik.values.gender === "female"}
            />
            female
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p style={{ color: "red" }}>{formik.errors?.password}</p>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password: </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <p style={{ color: "red" }}>{formik.errors?.confirmPassword}</p>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </>
      </form>
    </>
  );
}

export default FormikRegisterForm;
