import '../App.css';
import{useEffect,useState} from "react";
import axios from "axios";
import{Link,useHistory}from"react-router-dom";
function EtudiantTable() {
       const history=useHistory();
       const[etudiant,setEtudiant]=useState("");
        const[data,setData]=useState([]);
        const loadData=async()=>{
        fetch("http://localhost:5000/Etudiants/get")
        .then(data=>{return data.json()})
        .then(data=>{setData(data)})
    };

    useEffect(()=>{
       loadData();
    }
    )
    const handleDelete=(id)=>{
        if(window.confirm("voulez supprimez cet étudiant?")){
        axios.delete("http://localhost:5000/Etudiants/remove/"+id)
        .then(()=>{loadData();});
    }
    }
    const handleFind=(etudiant)=>{
      if(etudiant===""){
        alert("veuillez remplir le champ de recherche");
      }else{
      history.push("/Etudiants/find/"+etudiant);
    }
  }
    return (
      <div className="App">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="active">Etudiants</Link></li>
            <li><Link to="/Matieres" className="">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav>
    
    <input type="text" value={etudiant} onChange={(e)=>{setEtudiant(e.target.value)}} placeholder="Search.. num ou nom" /> 
    <button onClick={()=>{handleFind(etudiant)}} >Rechercher</button>
    <div className="tableau"> 
    <Link to="/Etudiants/create" className="new">Nouveau Etudiant</Link>
        <table>
            <thead>
                <tr>
                    <th>N° inscription</th>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Sexe</th>
                    <th>Niveau</th>
                    <th>Anneé</th>
                    <th></th>
                </tr>
            </thead>
              <tbody>
                  {data.map((item)=>{
                      return(
                   <tr color="white" key={item.num}>
                    <td>{item.num}</td>
                     <td>{item.nom}</td>
                     <td>{item.adresse}</td>
                      <td>{item.sexe}</td>
                    <td>{item.niveau}</td>
                     <td>{item.annee}</td>
                     <td>
                     <Link to={"/Etudiants/Edit/"+item.num} className="">Modifier</Link>
                    <button onClick={()=>{handleDelete(item.num)}}>Supprimer</button>
                    <Link to={"/Etudiants/Bulletin/"+item.num} className="Bulletin">Bulletin de note</Link>

                 </td>
                 </tr>
                )   
                })}
            </tbody>
        </table>
        </div>
      </div>
    );
  }
  
  export default EtudiantTable;
  