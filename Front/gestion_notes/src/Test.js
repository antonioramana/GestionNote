import './App.css';
import {useParams,useHistory,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
function Test() {
    const history=useHistory();
    const{id}=useParams("ET01");
    const[num,setNum]=useState("");
    const[nom,setNom]=useState("");
    const[adresse,setAdresse]=useState("");
    const[sexe,setSexe]=useState("");
    const[niveau,setNiveau]=useState("");
    const[annee,setAnnee]=useState();
    
    const handleSubmit=()=>{
      axios.put("localhost:5000/Etudiants/Edit/"+id,{nom,adresse,sexe,niveau,annee})
      .then(()=>{history.push('/Etudiants')});
  };
 
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
     <p>Modification de l' étudiant {num}</p>
     <div className="formulaire">
        <form onSubmit={handleSubmit}>
      
        <input type="text"value={nom} onChange={(e)=>setNom(e.target.value)}/>
        <input type="text" value={adresse} onChange={(e)=>setAdresse(e.target.value)}/>
        <select value={sexe} onChange={(e)=>setSexe(e.target.value)}>
            <option value="M" >Male</option>
            <option value="F">Femelle</option>
        </select>
        <select value={niveau} onChange={(e)=>setNiveau(e.target.value)}>
            <option value="L1">L1</option>
            <option value="L2" >L2</option>
            <option value="L3" >L3</option>
            <option value="M1">M1</option>
            <option value="M2" >M2</option>
        </select>
        <input type="number"value={annee} onChange={(e)=>setAnnee(e.target.value)}/>
        <input type="submit" value="Modifier"/>
        <Link to="/Etudiants" className="">Annuler</Link>

        </form>
        </div>
        {num}{nom}{adresse}{sexe}{niveau}{annee}
        </header>
      </div>
    );
  }
  
  export default Test;
  /*

  setEtudiant(e.target.value);
  if(etudiant===""){
    AlltabShow=true;
    FindtabShow=false;
  }else{
    AlltabShow=true;
    FindtabShow=false;
    fetch("http://localhost:5000/Etudiants/get/"+etudiant)
    .then(data=>{return data.json()})
    .then(data=>{setDatafind(data)})
  }*/