import "./my-profile-form.scss";
import { Formik, Form } from "formik";
import { InputField } from "./FormFields";
import * as Yup from "yup";

const MyProfileForm = ({ setEdit }) => {
  // *********** VALIDATE USER PROFILE ***********
  const phoneRegex =
    /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/;
  const faxRegex =
    /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/;
  const postalCodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "First name must be less than or equal to 20 characters.")
      .matches(/^[a-z]+$/, "First name can only contain lowercase letters.")
      .required("First name is required."),
    lastName: Yup.string()
      .max(20, "Last name must be less than or equal to 20 characters.")
      .matches(/^[a-z]+$/, "First name can only contain lowercase letters.")
      .required("Last name is required."),
    organization: Yup.string().max(
      60,
      "Last name must be less than or equal to 60 characters."
    ),
    defaultCurrency: Yup.string().max(
      20,
      "Last name must be less than or equal to 20 characters."
    ),
    primaryPhone: Yup.string()
      .matches(phoneRegex, "Primary phone must be valid.")
      .required("Primary phone is required."),
    mobilePhone: Yup.string().matches(
      phoneRegex,
      "Mobile phone must be valid."
    ),
    homePhone: Yup.string().matches(phoneRegex, "Home phone must be valid."),
    fax: Yup.string().matches(faxRegex, "Fax must be a type of string."),
    language: Yup.string().max(
      20,
      "Language must be less than or equal to 20 characters."
    ),
    country: Yup.string()
      .max(20, "Country must be less than or equal to 20 characters.")
      .required("Country is required."),
    address1: Yup.string()
      .max(100, "Last name must be less than or equal to 100 characters.")
      .required("Address1 is required."),
    address2: Yup.string().max(
      100,
      "Last name must be less than or equal to 100 characters."
    ),
    postalCode: Yup.string()
      .matches(postalCodeRegex, "Postal code must be valid.")
      .required("Postal code is required."),

    city: Yup.string()
      .max(100, "Last name must be less than or equal to 100 characters.")
      .required("City is required."),
    state: Yup.string()
      .max(100, "Last name must be less than or equal to 100 characters.")
      .required("State is required."),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    organization: "",
    defaultCurrency: "",
    primaryPhone: "",
    mobilePhone: "",
    homePhone: "",
    fax: "",
    language: "",
    country: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        <div>
          <Form>
            <InputField label='First Name' name='firstName' type='text' />
            <InputField label='Last Name' name='lastName' type='text' />
            <InputField label='Organization' name='organization' type='text' />
            <InputField
              label='Default Currency'
              name='defaultCurrency'
              type='text'
            />
            <InputField label='Primary Phone' name='primaryPhone' type='text' />
            <InputField label='Mobile Phone' name='mobilePhone' type='text' />
            <InputField label='Home Phone' name='homePhone' type='text' />
            <InputField label='Fax' name='fax' type='text' />
            <InputField label='Language' name='language' type='text' />
            <InputField label='Country' name='country' type='text' />
            <InputField label='Address1' name='address1' type='text' />
            <InputField label='Address2' name='address2' type='text' />
            <InputField label='Postal Code' name='postalCode' type='text' />
            <InputField label='City' name='city' type='text' />
            <InputField label='State' name='state' type='text' />
            <div className='profile-btn-container'>
              <button type='submit' className='btn btn-dark'>
                Save
              </button>
              <button
                type='button'
                className='btn btn-cancel'
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>;
      }}
    </Formik>
  );
};

export default MyProfileForm;
