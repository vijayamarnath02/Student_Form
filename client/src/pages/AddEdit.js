import React, { useState } from 'react';
import Axios from 'axios';
import "./AddEdit.css";
import {Link} from "react-router-dom";
const AddEdit = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    date: '',
    location: '',
    about: ''
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8000/save', data);
      console.log(response);
      setTableData([...tableData, data]);
      setData({
        firstname: '',
        lastname: '',
        email: '',
        date: '',
        location: '',
        about: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />

          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">DOB:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="about">About:</label>
          <textarea
          type="text"
            id="about"
            name="about"
            rows={3}
            value={data.about}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      {tableData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Location</th>
              <th>About</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.location}</td>
                <td>{item.about}</td>
                <Link to={'/'}>
                  <button>Goback</button>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddEdit;
