import '../App.css';
import{useState} from "react";
import axios from "axios";
import{Link,useHistory} from "react-router-dom";

function MatièreCreate() {
  const history=useHistory();
  const[codemat,setCodemat]=useState("");
    const[libellé,setLibellé]=useState("");
    const[coef,setCoef]=useState();
    const handleSubmit=(e)=>{
      if(!(codemat&&libellé&&coef)){
        e.preventDefault();
        window.alert("veuillez remplir les champs");
    }else{
        e.preventDefault();
        axios.post("http://localhost:5000/Matieres/create",{codemat,libellé,coef}).then(()=>{history.push('/Matieres')});
    }};
    return (
      <div className="App">
        <header className="App-header">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="">Etudiants</Link></li>
            <li><Link to="/Matieres" className="active">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav>
    <div className="formulaire">
    <h3>Nouveau Matière</h3>
        <form onSubmit={handleSubmit}>
        <label>Numero d'inscription:</label><input placeholder="Entrer le codemat..." type="text"value={codemat} onChange={(e)=>setCodemat(e.target.value)}/>
        <label>Libellé:</label><input type="text"value={libellé} onChange={(e)=>setLibellé(e.target.value)} placeholder="Entrer le libellé..."/>
        <label>Coéfficient</label><input type="number"value={coef} onChange={(e)=>setCoef(e.target.value)} placeholder="Entrer le coéfficient..."/>
        <input type="submit" value="Enregistrer"/>
        <Link to="/Matieres" className="">Annuler</Link>

        </form>
        </div>
        </header>
      </div>
    );
  }
  
  export default MatièreCreate;
  