import React ,{useState,useEffect}from 'react';
import {Link, redirect} from "react-router-dom";
import "./Home.css";
import axios from 'axios';


export const Home = () => {
    const [data, setData]= useState([]);
    const loadData = async()=>{
        const response= await axios.get("http://localhost:8000/show");
        setData(response.data);
    };
    useEffect(()=>{
        loadData();

    },[]);
   const deleteData = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this data?');
        if (confirmDelete) {
          await axios.delete(`http://localhost:8000/delete/${id}`);
          loadData();
          redirect('/');
        }
      }
    
      useEffect(() => {
        loadData();
      }, []);
  return (  
    
       <div className="container">    
        <h1>Student Detail</h1>
        <form>
           <table class="table table-bordered table-striped">
           <thead>
            <tr>
                <td >No
                </td>
                <td >FirstName
                </td>
                <td >LastName
                </td>
                <td >Email
                </td>
                <td >Location
                </td>
                <td>Date
                </td>
                <td>About
                </td>
            </tr>
            </thead> 
            <tbody>
                {data.map((item,index)=>{
                    return(
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.location}</td>
                            <td>{item.dob}</td>
                            <td>{item.about}</td>
                            <td>
                                <Link to={`/edit/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                                <button className="btn btn-delete" onClick={() => deleteData(item.id)} > Delete </button>
                               
                            </td>
                        </tr>
                     )

                  })}
                
            </tbody>
            <Link  to="show/add">
        <button className='btn btn-contact'>Add Contact</button>
        </Link>
        </table>
        </form>
    </div>
  )
}
export default Home;