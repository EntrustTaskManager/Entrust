import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const [editTeacherIndex, setEditTeacherIndex] = useState(null);
  const [editStudentIndex, setEditStudentIndex] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleTeacherInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value,
    });
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const addTeacher = async () => {
    try {
      await axios.post("/teachers", newTeacher);
      setNewTeacher({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
      fetchTeachers();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const editTeacher = async (id) => {
    try {
      await axios.put(`teachers/${id}`, newTeacher);
      setEditTeacherIndex(null);
      setNewTeacher({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
      fetchTeachers();
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const addStudent = async () => {
    try {
      await axios.post("/students", newStudent);
      setNewStudent({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const editStudent = async (id) => {
    try {
      await axios.put(`/students/${id}`, newStudent);
      setEditStudentIndex(null);
      setNewStudent({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h1>Welcome, Admin!</h1>
      <div>
        <h2>Add Teacher</h2>
        <input
          type="text"
          name="firstName"
          value={newTeacher.firstName}
          onChange={handleTeacherInputChange}
          placeholder="Enter first name"
        />
        <input
          type="text"
          name="lastName"
          value={newTeacher.lastName}
          onChange={handleTeacherInputChange}
          placeholder="Enter last name"
        />
        <input
          type="text"
          name="username"
          value={newTeacher.username}
          onChange={handleTeacherInputChange}
          placeholder="Enter username"
        />
        <input
          type="password"
          name="password"
          value={newTeacher.password}
          onChange={handleTeacherInputChange}
          placeholder="Enter password"
        />
        <input
          type="email"
          name="email"
          value={newTeacher.email}
          onChange={handleTeacherInputChange}
          placeholder="Enter email"
        />
        <button onClick={addTeacher}>Add Teacher</button>
      </div>
      <div>
        <h2>Teachers List</h2>
        <ul>
          {teachers.map((teacher, index) => (
            <li key={index}>
              {editTeacherIndex === index ? (
                <>
                  <input
                    type="text"
                    value={newTeacher.firstName}
                    onChange={handleTeacherInputChange}
                    name="firstName"
                  />
                  <input
                    type="text"
                    value={newTeacher.lastName}
                    onChange={handleTeacherInputChange}
                    name="lastName"
                  />
                  <input
                    type="text"
                    value={newTeacher.username}
                    onChange={handleTeacherInputChange}
                    name="username"
                  />
                  <input
                    type="password"
                    value={newTeacher.password}
                    onChange={handleTeacherInputChange}
                    name="password"
                  />
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={handleTeacherInputChange}
                    name="email"
                  />
                  <button onClick={() => editTeacher(teacher.id)}>Save</button>
                </>
              ) : (
                <>
                  {teacher.firstName} {teacher.lastName}
                  <button onClick={() => setEditTeacherIndex(index)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTeacher(teacher.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Student</h2>
        <input
          type="text"
          name="firstName"
          value={newStudent.firstName}
          onChange={handleStudentInputChange}
          placeholder="Enter first name"
        />
        <input
          type="text"
          name="lastName"
          value={newStudent.lastName}
          onChange={handleStudentInputChange}
          placeholder="Enter last name"
        />
        <input
          type="text"
          name="username"
          value={newStudent.username}
          onChange={handleStudentInputChange}
          placeholder="Enter username"
        />
        <input
          type="password"
          name="password"
          value={newStudent.password}
          onChange={handleStudentInputChange}
          placeholder="Enter password"
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleStudentInputChange}
          placeholder="Enter email"
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <div>
        <h2>Students List</h2>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {editStudentIndex === index ? (
                <>
                  <input
                    type="text"
                    value={newStudent.firstName}
                    onChange={handleStudentInputChange}
                    name="firstName"
                  />
                  <input
                    type="text"
                    value={newStudent.lastName}
                    onChange={handleStudentInputChange}
                    name="lastName"
                  />
                  <input
                    type="text"
                    value={newStudent.username}
                    onChange={handleStudentInputChange}
                    name="username"
                  />
                  <input
                    type="password"
                    value={newStudent.password}
                    onChange={handleStudentInputChange}
                    name="password"
                  />
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={handleStudentInputChange}
                    name="email"
                  />
                  <button onClick={() => editStudent(student.id)}>Save</button>
                </>
              ) : (
                <>
                  {student.firstName} {student.lastName}
                  <button onClick={() => setEditStudentIndex(index)}>
                    Edit
                  </button>
                  <button onClick={() => deleteStudent(student.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
