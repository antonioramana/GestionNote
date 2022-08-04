import './App.css';
import{useEffect,useState} from "react";
import{Link}from"react-router-dom";
import { useParams } from 'react-router-dom';


function Niveau() {
    const{id}=useParams();
    const[datanote,setDatanote]=useState([]);
    const[niv,setNiv]=useState();
    const loadData1=async()=>{
      fetch("http://localhost:5000/Niveau/"+id)
      .then(data=>{return data.json()})
      .then(data=>{
        setDatanote(data.filter((item)=>item.niveau="L2"));
        setNiv(data[0].niveau);
            })
      };
    
    useEffect(()=>{
        loadData1();
    }
    ,[]);
    
    const getbulletin=()=>{
          const dat=datanote.filter(datanote.niveau="L2");
        
    }
    return (
      <div className="App">
        <header className="App-header">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="active">Etudiants</Link></li>
            <li><Link to="/Matieres" className="">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
        </ul>
    </nav>
    <div>
    <Link to="/Etudiants" className="">Liste des étudiants</Link>
    <form onSubmit={getbulletin}>
    <select value={niv} onChange={(e)=>{setNiv(e.target.value)}}>
    {datanote.map((item)=>{return(
      <option value={item.niveau}>{item.niveau}</option>
      )})} 
    </select>
    <input type="submit" value="obtenir le bulletin des notes"/> 
    <p>{niv}</p>
    </form>
       </div>
         </header>
  
      </div>
    );
    }
  
  export default Niveau;
  