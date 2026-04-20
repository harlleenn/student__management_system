import React, { useState } from 'react'
import axios from 'axios';

export default function AddStudent() {
    const [details,setDetails] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
      const [course, setCourse] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()

        const newStudent = {
            name, 
            email,
            course
        }
        axios.post("http://localhost:3000/students", newStudent)
        .then ((response) => {
            // setDetails(newStudent)
            setCourse("")
            setName("")
            setEmail("")
            setDetails("student has been added succesfully!")
            console.log(details)
            console.log(newStudent)
            // console.log(details , "hellooo")
        })
    }
  return (
    <div>

    <form onSubmit={handleSubmit} className='form'>
     {(e) => setDetails(e.target.value)}
    
          <input
        type='text'
        required
        placeholder='Student name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
          <input
        
        required
        placeholder='Student Email'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
          <input
        type='text'
        required
        placeholder='Student Course'
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        />
         <button type="submit">Add student</button>
    </form>
    {details && <p>{details}</p>}
         
    </div>
  )
}
