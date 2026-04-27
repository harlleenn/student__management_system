import React, { useState } from "react";
import axios from "axios";
import FormData from "../formData/FormData";
import styles from './addStudent.module.css';
import { UserRoundPlus } from 'lucide-react';
export default function AddStudent({ fetchData }) {
  // const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [active , setActive] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      course,
      email
    }; // this goes as an object name: Harleen 
    axios
      .post("http://localhost:3000/students", newStudent)
      .then((response) => {
        console.log(response);
        // setDetails(newStudent)

        setCourse("");
        setName("");
        setEmail("");
        setActive(false)
      
        fetchData();
     

      });
  };
  const handleAdd = () => {
    setActive((prev) => !prev)
  }
  return (
    <div>
      <div className={styles.addBtnCont}>
           <button className={styles.addBtn} onClick={handleAdd}>Add student <UserRoundPlus width={20}/></button>
      </div>
   
      {active ?   
      <div className={styles.formData}>
           <FormData
        email={email}
        setEmail={setEmail}
        course={course}
        setCourse={setCourse}
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
      />
      </div>
     : ""}
  
    </div>
  );
}
