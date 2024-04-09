import './Crud.css';
import { useState ,useEffect} from 'react';
import Axios from 'axios';


function Crud() {
  const[Name, setName]=useState('');
  const[EmpId,setEmpId]=useState('');
  const[Email,setEmail]=useState('')

  
  const[nameList,setNameList]=useState([]);
  const[newEmpName, setNewEmpName]=useState('');

  useEffect(() => {
    Axios.get('http://localhost:3005/reads')
    .then((response) => {
      setNameList(response.data);
    })

  },[])

  const addEmpData = () =>{
    Axios.post("http://localhost:3005/insert",
    {
      Name:Name, 
      EmpId:EmpId,
      Email:Email
    });
  };

const UpdateEmpData = (id) =>{
    Axios.put("http://localhost:3005/update", {
      id:id, newEmpName:newEmpName})
  }

  const DeleteData = (id) =>{
    Axios.delete(`http://localhost:3005/delete/${id}`)
      
  };


  return (
    <div className="Crud">
      <h1>EMPLOYEE DETAILS</h1>
      <input type="text" placeholder="Employee name" required 
      onChange={(event) => {setName(event.target.value)}}/>
      <br></br><br></br>
      <input type="text" placeholder="Employee Id" required
     onChange={(event) => {setEmpId(event.target.value)}}/>
      <br></br><br></br>
      <input type="text" placeholder="Email Id" required
     onChange={(event) => {setEmail(event.target.value)}}/>
      <br></br><br></br>
      <button onClick={addEmpData}>Add</button>
      <br></br><br></br>
      <table>
        <tr>
          <th>Name</th>
          <th>Employee Id</th>
          <th>Email Id</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
       
          {nameList.map((val,key) => {
            return    <tr>
       <td>{val.Name}</td>
       <td>{val.EmpId}</td> 
       <td>{val.Email}</td> 
       <td>
        <input type="text" placeholder="update name"
        onChange={(event) => {
          setNewEmpName(event.target.value);
        }}></input>
        <button onClick={()=> UpdateEmpData(val._id)}>Edit</button>
        </td>
        <td>
          <button onClick={()=> DeleteData(val._id)}>Delete</button>
          </td>
        
  
        </tr>
          })}
      </table>
    </div>
  );
}

export default Crud;