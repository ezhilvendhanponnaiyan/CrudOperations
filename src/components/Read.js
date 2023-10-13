import React, { useState, useEffect } from "react";
import { SiFormstack } from "react-icons/si";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
import { API_URL } from "../constants/API";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const Read = () => {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState([]);

  async function ShowData() {
    const response = await axios.get(API_URL);
    setApiData(response.data);
  }

  function UpdateData({ firstname, lastname, dob, age, email, id }) {
    localStorage.setItem("id", id);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("dob", dob);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
    navigate("/update");
  }

  async function DeleteData(id) {
    await axios.delete(API_URL + "/" + id);
    ShowData();
  }

  useEffect(() => {
    ShowData();
  }, []);

  return (
    <div className="read">
      <SiFormstack size={40} />
      <h2 className="read-title">Saved Data</h2>

      <table cellSpacing="15" className="table">
        {apiData.length == 0 ? (
          <div>
            <h4>No Data to Show!</h4>
          </div>
        ) : (
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Email</th>
            <th>Country</th>
            <th>Country Code</th>
            <th>Phone Number</th>
          </tr>
        )}

        {apiData.map((data) => {
          return (
            <tr className="table-data">
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.dob}</td>
              <td>{data.age}</td>
              <td>{data.email}</td>
              <td>{data.country}</td>
              <td>{data.countryCode}</td>
              <td>{data.phoneNumber}</td>
              <td className="delete" onClick={() => DeleteData(data.id)}>
                <MdDeleteForever size={20} />
              </td>
              <td className="update" onClick={() => UpdateData(data)}>
                <MdOutlineEditNote size={20} />
              </td>
            </tr>
          );
        })}
        
      </table>
      <div className="back-btn">
        <h4>Back to</h4>
      <Link className="read-back-btn" to="/">Home</Link>
      <Link className="read-back-btn" to="/create">Create</Link>
      </div>
      
    </div>
  );
};

export default Read;
