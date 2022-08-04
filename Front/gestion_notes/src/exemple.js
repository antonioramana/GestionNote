import{useEffect,useState} from "react";
import axios from "axios";

function Exemple() {
    const[data,setData]=useState([]);
   /* const loadData=async()=>{
        fetch("http://localhost:5000/Etudiants/get").then(data=>{return data.json()}).then(data=>{setData(data)})
       // const resp= await axios.get("http://localhost:5000/Etudiants/get");
        //setData(resp.data);
    };*/

    useEffect(()=>{
        fetch("http://localhost:5000/Etudiants/get")
        .then(data=>{return data.json()})
        .then(data=>{setData(data)})
       // loadData();
    }
    ,[])
    return (
      <div className="App">
        <header className="App-header">
        <ul>
   {data.map((item)=>{
       <li>{item.Num_inscription}</li>
   })}</ul>      </header>
      </div>
    );
  }
  
  export default Exemple;
  