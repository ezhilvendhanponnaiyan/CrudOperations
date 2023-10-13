import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { SiFormstack } from "react-icons/si";
import { API_URL } from "../constants/API";
import { useNavigate } from "react-router-dom";
import countryPhoneCodes from "../assets/countryPhoneCodes.json";
import * as Yup from "yup";
import { useFormik } from "formik";

const Create = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [flag,setFlag] = useState(false);
  const [flag1,setFlag1] = useState(false);
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
    lastName: Yup.string()
      .min(1, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
      dob:Yup.string().required("*Required"),
      countryCode: Yup.string().required("*Required"),
      country: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    age:Yup.string().required("*Required").matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Please Enter Numeric Value"
    ),
    phoneNumber: Yup.string().required("*Required").matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Not Valid Phone Number"
      ),
  });

  const formValueCatcher = async () => {
    formik.handleSubmit();
    if(Object.keys(formik.errors).length === 0){
      await axios.post(API_URL, {
        firstname,
        lastname,
        dob,
        age,
        email,
        country,
        countryCode,
        phoneNumber,
      });
      navigate("/read");
    }
    
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob:"",
      age:"",
      email: "",
      country:"",
      countryCode:countryCode,
      phoneNumber: "",
    },
    validationSchema,
  });

  console.log(formik.errors)

  return (
    <div className="create">
      <SiFormstack size={40} />
      <h2 className="create-title">Complete the form</h2>
      <form action="" className="form">
        <div className="form-section">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your First Name"
            autoComplete="off"
            onChange={(event) => {
              setFirstName(event.target.value)
              formik.handleChange(event)}}
            value={firstname}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.firstName&&formik.errors.firstName?<p className="error">{formik.errors.firstName}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            autoComplete="off"
            placeholder="Enter your Last Name"
            onChange={(event) => {
              setLastName(event.target.value)
              formik.handleChange(event)}}
            value={lastname}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.lastName&&formik.errors.lastName?<p className="error">{formik.errors.lastName}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Date of Birth</label>
          <input
            type="date"
            name="dob"
            autoComplete="off"
            placeholder="Enter your Date of Birth"
            onChange={(event) => {
              setDob(event.target.value)
              formik.handleChange(event)}}
            value={dob}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.dob&&formik.errors.dob?<p className="error">{formik.errors.dob}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Age</label>
          <input
            type="number"
            name="age"
            autoComplete="off"
            placeholder="Enter your Age"
            onChange={(event) => {
              setAge(event.target.value)
              formik.handleChange(event)}}
            value={age}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.age&&formik.errors.age?<p className="error">{formik.errors.age}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            onChange={(event) => {
              setEmail(event.target.value)
              formik.handleChange(event)}}
            value={email}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.email&&formik.errors.email?<p className="error">{formik.errors.email}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Country</label>
          <input
            type="search"
            name="country"
            autoComplete="off"
            placeholder="Please Select Country"
            className="country-input"
            onChange={(event) => {
              setFlag1(true)
              setCountry(event.target.value)
              formik.handleChange(event)}}
            value={country}
            onBlur={formik.handleBlur}
          />
        

        {
          (flag1 && (
          <div className="country-dropdown">
            {countryPhoneCodes.filter((countries)=>{
              let searchCountry = country.toLowerCase();
              let JSONCountryList = countries.country.toLowerCase();
              return(
                searchCountry&&JSONCountryList.startsWith(searchCountry)
              )
            }).map((filteredCountries)=>{
              return(
                <p onClick={()=>{setFlag1(false);setCountry(filteredCountries.country)} }className="countries-dropdown">{filteredCountries.country}</p>
              )
            })
            }
          </div>
          ))
        }

</div>

        {formik.touched.country&&formik.errors.country?<p className="error">{formik.errors.country}</p>:<br />}

        <div className="form-section">
          <label htmlFor="">Phone Number</label>
          

          <input
            type="search"
            autoComplete="off"
            placeholder="Country/Code"
            className="countryInput"
            name="countryCode"
            onChange={(event) => {
              setFlag(true);
              setCountryCode(event.target.value)
              formik.handleChange(event)}}
            value={countryCode}
            onBlur={formik.handleBlur}
          />
           {
            (flag && (
              <div className="dropdown">
              {countryPhoneCodes.filter((codes)=>{
                const searchTerm = countryCode.toLowerCase();
                const JSONObjectCountries = codes.country.toLowerCase();
                const JSONObjectCountryCodes = codes.code;
                if(searchTerm&&JSONObjectCountries.startsWith(searchTerm)){
                  return(
                      searchTerm&&JSONObjectCountries.startsWith(searchTerm)
                  )
              } else if(searchTerm&&JSONObjectCountryCodes.startsWith(searchTerm)){
                  return(
                      searchTerm&&JSONObjectCountryCodes.startsWith(searchTerm)
                  )
              } 
              }).map((codes)=>{
                return(
                  
                  <p onClick={()=>{setFlag(false); setCountryCode("+"+codes.code)}} className="dropdown-results"><span> +{"  "+codes.code}</span></p>
                )
              })}
            </div>
            )) 
}   
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter your Phone Number"
            className="phone-number-input"
            name="phoneNumber"
            onChange={(event) => {
              setPhoneNumber(event.target.value)
              formik.handleChange(event)}}
            value={phoneNumber}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="country-code-errors">
        {formik.touched.countryCode&&formik.errors.countryCode?<p className="errorcc">{formik.errors.countryCode}</p>:<br />}
        {formik.touched.phoneNumber&&formik.errors.phoneNumber?<p className="errorc">{formik.errors.phoneNumber}</p>:null}
        </div>
        

        <p onClick={formValueCatcher} className="submit-btn">
          Submit the form
        </p>
      </form>
    </div>
  );
};

export default Create;
