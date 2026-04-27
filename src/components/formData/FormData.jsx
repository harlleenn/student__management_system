import React from "react";
import styles from './formData.module.css'

export default function FormData({
  name,
  setName,
  email,
  setEmail,
  course,
  setCourse,
  handleSubmit,
}) {
  return (
    <div className={styles.formCont}>
      <form onSubmit={handleSubmit} className={styles.formInputs}>
        <input
          type="text"
          required
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          placeholder="Student Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Student Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button type="submit" className={styles.addStudent}>Add student</button>
      </form>
    </div>
  );
}
