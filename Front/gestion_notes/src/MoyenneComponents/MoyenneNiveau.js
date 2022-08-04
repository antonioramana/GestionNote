import '../App.css';
import{useState} from "react";
import{Link}from"react-router-dom";
import { useParams } from 'react-router-dom';

function MoyenneNiveau() {
    const{id}=useParams();
    const[niv,setNiv]=useState("L1");

    return (
      <div className="App">
        <header className="App-header">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="">Etudiants</Link></li>
            <li><Link to="/Matieres" className="">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
            <li><Link to="/Moyennes" className="active">Moyennes</Link></li>

        </ul>
    </nav>
    <div>
    <Link to="/Etudiants" className="">Liste des étudiants</Link>
    <form>
        <select value={niv} onChange={(e)=>setNiv(e.target.value)}>
        <option value="L1">L1</option>
        <option value="L2">L2</option>
        <option value="L3">L3</option>
        <option value="M1">M1</option>
        <option value="M2">M2</option>
        </select>
        <Link to={"/Moyennes/"+niv} className="Bulletin">Obtnir les moyennes des étudiants {niv}</Link>
     </form>
     </div>
    </header>
      </div>
    );
    }
  
  export default MoyenneNiveau;
  