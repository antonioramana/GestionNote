import '../App.css';
import{useState,useEffect} from "react";
import axios from "axios";
import{Link,useHistory} from "react-router-dom";
function EtudiantCreate() {
    const history=useHistory();
    const[num,setNum]=useState("");
    const[nom,setNom]=useState("");
    const[adresse,setAdresse]=useState("");
    const[sexe,setSexe]=useState("M");
    const[niveau,setNiveau]=useState("L1");
    const[annee,setAnnee]=useState("");
    //const[data,setData]=useState([]);
   // const loadData=async()=>{
   /* fetch("http://localhost:5000/Etudiants/get")
    .then(data=>{return data.json()})
    .then(data=>{setData(data)})
    };
    useEffect(()=>{
        loadData();
     }
     )*/
    const handleSubmit=(e)=>{
        if(!(num&&nom&&adresse&&sexe&&niveau&&annee)){
            e.preventDefault();
            window.alert("veuillez remplir les champs");
        }
        else{
        e.preventDefault();
        axios.post("http://localhost:5000/Etudiants/create",{num,nom,adresse,sexe,niveau,annee}).then(()=>{return history.push("/Etudiants")});
    } };
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
    
    <div className="formulaire">
         <h3>Nouveau Etudiant</h3>
        <form onSubmit={handleSubmit}>
        <label>Numéro d'inscription:</label><input name="num" placeholder="Entrer le numéro d'inscription..." type="text"value={num} onChange={(e)=>setNum(e.target.value)}/>
        <label>Nom:</label> <input name="nom" type="text"value={nom} onChange={(e)=>setNom(e.target.value)} placeholder="Entrer le nom..."/>
        <label>Adresse :</label><input name="adresse" type="text" value={adresse} onChange={(e)=>setAdresse(e.target.value)}placeholder="Entrer l'adresse.."/>
        <label>Sexe:</label><select value={sexe} onChange={(e)=>setSexe(e.target.value)} name="sexe">
            <option value="M" >Male</option>
            <option value="F">Femelle</option>
        </select>
        <label>Niveau:</label><select value={niveau} onChange={(e)=>setNiveau(e.target.value)} name="niveau">
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
        </select>
        <label>Annnée:</label><input type="number"value={annee} onChange={(e)=>setAnnee(e.target.value)} name="annnee" placeholder="Entrer l'année..."/>
        <input type="submit" value="Enregistrer"/>
       
        </form>
        </div>
        </header>
    <p>{num}{nom}{adresse}{sexe}{niveau}{annee}</p>
      </div>
    );
  }
  
  export default EtudiantCreate;
  