import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [age,setAge] = useState(0);
  const [address,setAddress] = useState("");
  const [position,setPosition] = useState("");

  const [newAge, setNewAge] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);


  const addEmployee = () =>{
    console.log(firstname);
    Axios.post("http://localhost:3001/create",{
      firstname: firstname,
      lastname: lastname,
      age: age,
      address: address,
      position: position,
    }).then(()=> {
      setEmployeeList([
        ...employeeList, 
        {
          firstname: firstname,
          lastname: lastname,
          age: age,
          address: address,
          position: position,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeAge = (personid) => {
    Axios.put("http://localhost:3001/update", {age: newAge, personid: personid}).then (
      (response) => {
        alert("update");
    });
  }

  const deleteEmployee = (personid) => {
    Axios.delete(`http://localhost:3001/delete/${personid}`)
  }

  return (
    <div className="App">
      <div className="information">
        <label>FirstName:</label>
        <input 
          type="text"          
          onChange={(event) => {
            setFirstName(event.target.value);
          }} 
          />
        <label>LastName:</label>
        <input 
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }} 
          />
        <label>Age:</label>
        <input 
        type="number"          
        onChange={(event) => {
            setAge(event.target.value);
          }}
          />
        <label>Address:</label>
        <input 
        type="text"
        onChange={(event) => {
          setAddress(event.target.value);
        }} 
        />
        <label>Position:</label>
        <input 
        type="text"
        onChange={(event) => {
          setPosition(event.target.value);
        }} 
        />
        <button onClick={addEmployee}>Add Employee:</button>
      </div>
      <div className = "employees">
        <button onClick = {getEmployees}>Show Employees</button>
        
        {employeeList.map((val, key)=>{
          return (
            <div className="employee">
              <div> 
              <h3> First Name: {val.firstname} </h3> 
              <h3> Last Name: {val.lastname} </h3> 
              <h3> Age: {val.age} </h3> 
              <h3> Address: {val.address} </h3> 
              <h3> Position: {val.position} </h3>
              </div> 
              <div> 
                <input 
                type="text" 
                placeholder = "newage..."
                onChange={(event) => {
                  setNewAge(event.target.value);
                }} 
              />
              <button onClick={()=>{updateEmployeeAge(val.personid)}}>Update Age</button>
              <button onClick={()=>{deleteEmployee(val.personid)}}> Delete </button>
            </div>
          </div>
        );        
        })}
      </div>
    </div>
  );
}

export default App;