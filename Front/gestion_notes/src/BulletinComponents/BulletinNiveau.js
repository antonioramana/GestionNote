import '../App.css';
import{useState} from "react";
import{Link}from"react-router-dom";
import { useParams } from 'react-router-dom';

function BulletinNiveau() {
    const{id}=useParams();
    const[niv,setNiv]=useState("L1");

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
        <Link to={"/Etudiants/Bulletin/"+id+"/"+niv} className="Bulletin">Bulletin de note</Link>
     </form>
     </div>
    </header>
      </div>
    );
    }
  
  export default BulletinNiveau;
  