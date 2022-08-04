import '../App.css';
import {useParams,useHistory,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
function EtudiantEdit() {
    const history=useHistory();
    const{id}=useParams();
    const[nom,setNom]=useState("aa");
    const[adresse,setAdresse]=useState("aa");
    const[sexe,setSexe]=useState("aa");
    const[niveau,setNiveau]=useState("11");
    const[annee,setAnnee]=useState(11);
    
    
    useEffect(()=>{
      fetch("http://localhost:5000/Etudiants/get/"+id)
      .then(data=>{return data.json()})
      .then(data=>{
        setNom(data[0].nom);
        setAdresse(data[0].adresse);
       setSexe(data[0].sexe);
      setNiveau(data[0].niveau);
      setAnnee(data[0].annee);
      })
    },[]
    );
    const handleSubmit=(e)=>{
      e.preventDefault();
      axios.put("http://localhost:5000/Etudiants/Edit/"+id,{nom,adresse,sexe,niveau,annee})
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
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav> <Link to="/Etudiants" className="new">Annuler</Link>
     <p>Modification de l' étudiant {id}</p>
     <div className="formulaire">
        <form onSubmit={handleSubmit}>
      
        <input type="text" value={nom} onChange={(e)=>setNom(e.target.value)}/>
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
       

        </form>
        </div>
        {id}{nom}{adresse}{sexe}{niveau}{annee}
        </header>
      </div>
    );
  }
  
  export default EtudiantEdit;
  