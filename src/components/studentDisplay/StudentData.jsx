import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "../addStudent/AddStudent";
import styles from "./studentDisplay.module.css";
import { Edit, Trash } from "lucide-react";
// import "../App.css";

export default function StudentData() {
  const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
  // const [deletedMessage, setDeletedMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      setStudents(response.data);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/students/${id}`).then(() => {
      fetchData();
    });
  };
  const editData = {
    name,
     course,
    email
  }
  const handleEdit = async (id) => {
    try{
      axios.put(`http://localhost:3000/students/${id}`, editData);
    fetchData()
    console.log("i am being clicked")
    }catch (error){
console.log(error , "there was an error while updating")

    }
    
  };

  return (
    <div>
      <AddStudent fetchData={fetchData} />
      <table className={styles.tableDisplay}>
        <tbody>
          <tr>
            <th>Student id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.created_at}</td>

              <td>
                <div className={styles.actionCont}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit <Edit width={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className={styles.deleteBtn}
                  >
                    Delete <Trash width={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
