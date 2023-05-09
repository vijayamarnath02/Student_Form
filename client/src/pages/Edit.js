import React, { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';


const Edit = ({ history }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    location: '',
    dob: '',
    about: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/edit/${id}`);
        const { firstname, lastname, email, location, dob, about } = response.data;
        setFormData({ firstname, lastname, email, location, dob, about });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/update/${id}`, formData);
    var r =  window.confirm("updated successfully");
    if(r===true){
        console.log("Updated successfully");
    }
 } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <Link to='/'>
        <button type="submit" className="btn btn-primary">
          Back
        </button>
        </Link>
      </form>
    </div>
  );
};
export default Edit;