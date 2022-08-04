import '../App.css';
import{useState,useEffect} from "react";
import axios from "axios";
import{Link,useHistory} from "react-router-dom";
function NoteCreate() {
    const history=useHistory();
    const[num,setNum]=useState("");
    const[annee,setAnnee]=useState("");
    const[codemat,setCodemat]=useState("");
    const[note,setNote]=useState();
    const[niveau,setNiveau]=useState("L1");   
    const[data1,setData1]=useState([]);
    const[data2,setData2]=useState([]);
    
    const loadData1=async()=>{
         fetch("http://localhost:5000/Etudiants/get")
         .then(data=>{return data.json()})
         .then(data=>{setData1(data);setNum(data[0].num);setAnnee(data[0].annee);})
     };
 
     useEffect(()=>{
        loadData1();
     }
     ,[]);
        const loadData2=async()=>{
            fetch("http://localhost:5000/Matieres/get")
            .then(data=>{return data.json()})
            .then(data=>{setData2(data);setCodemat(data[0].codemat);})
            };
    
        useEffect(()=>{
           loadData2();
        }
        ,[]);

    const handleSubmit=(e)=>{
      if(!(num&&codemat&&note&&niveau&&annee)){
          e.preventDefault();
          alert("veuillez remplir les champs");
    }else{e.preventDefault();
        axios.post("http://localhost:5000/Notes/create",{num,codemat,note,niveau,annee}).then(()=>{return (history.push("/Notes"));})
        }
    }
    return (
      <div className="App">
        <header className="App-header">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="">Etudiants</Link></li>
            <li><Link to="/Matieres" className="">Matières</Link></li>
            <li><Link to="/Notes" className="active">Notes</Link></li>
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav>
    <div className="formulaire">
    <h3>Nouveau Note</h3>
     <form onSubmit={handleSubmit}>
     <label>Numéro d'inscription:</label> <select value={num} onChange={(e)=>setNum(e.target.value)}>
            {data1.map((item)=>{ return(
            <option value={item.num} >{item.num}</option>
            )})}
        </select>
        <label>Codemat:</label><select value={codemat} onChange={(e)=>setCodemat(e.target.value)}>
            {data2.map((item)=>{return(
            <option value={item.codemat} >{item.codemat}</option>
            )})}
        </select>

        <label>Note:</label> <input type="number"value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Entrer le note..."/>
        <label>Niveau:</label><select value={niveau} onChange={(e)=>setNiveau(e.target.value)}>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
        </select>
        <input type="submit" value="Enregistrer"/>
        <Link to="/Notes" className="">Annuler</Link>
        </form>
        </div>
        </header>
        <p>{num}{codemat}{note}{niveau}{annee}</p>
      </div>
    );
  }
  
  export default NoteCreate;
