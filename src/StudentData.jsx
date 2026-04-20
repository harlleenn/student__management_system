import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
import AddStudent from "./AddStudent";

export default function StudentData() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        setStudents(response.data);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //  console.log("hiii")
  return (
    <div className="studentDisplay">
      <table>
        <tbody>
       
            <tr>
                <th>Student id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Created At</th>
            </tr>
        
          {students.map((student) => (
            <tr key={student.id}>
                <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.created_at}</td>
              <td>
                <button>Delete</button>
                </td>
               
            

            </tr>
        
          ))}
        </tbody>
      </table>
      <AddStudent/>

    </div>
  );
}
