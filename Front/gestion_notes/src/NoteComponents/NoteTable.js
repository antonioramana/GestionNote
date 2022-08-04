import '../App.css';
import{useEffect,useState} from "react";
import axios from "axios";
import{Link,useHistory}from"react-router-dom";

function NoteTable() {
    const history=useHistory();
    const[data,setData]=useState([]); 
    const[note,setNote]=useState(""); 
    const loadData=async()=>{
        fetch("http://localhost:5000/Notes/get")
        .then(data=>{return data.json()})
        .then(data=>{setData(data)})
    };

    useEffect(()=>{
       loadData();
    }
    )
    const handleDelete=(id)=>{
        if(window.confirm("voulez supprimez cette note?")){
        axios.delete("http://localhost:5000/Notes/remove/"+id)
        .then(()=>{loadData();});
    }
    }
    const handleFind=(note)=>{
        if(note==""){
          alert("veuillez remplir le champ de recherche");
        }else{
        history.push("/Notes/find/"+note);
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
    <div className="tableau">  
    <input type="text" value={note} onChange={(e)=>{setNote(e.target.value)}} placeholder="Search... num étudiant" /> 
    <button onClick={()=>{handleFind(note)}}>Rechercher</button>
      <Link to="Notes/create" className="new">Nouveau Note</Link>
              <table>
            <thead>
                <tr>
                    <th>N° d' inscription</th>
                    <th>Codemat</th>
                    <th>Note</th>
                    <th>Niveau</th>
                    <th>Année</th>
                    <th></th>
                </tr>
            </thead>
              <tbody>
                  {data.map((item)=>{
                      return(
                 <tr color="white" key={item.id}>
                    <td>{item.num}</td>
                     <td>{item.codemat}</td>
                     <td>{item.note}</td>
                     <td>{item.niveau}</td>
                     <td>{item.annee}</td>
                     <td>
                     <Link to={"/Notes/Edit/"+item.id} className="">Modifier</Link>
                     <button onClick={()=>{handleDelete(item.id)}}>Supprimer</button>
                     </td>
                 </tr>
                      )
                   })}
            </tbody>
        </table>
        </div>
         </header>
      </div>
    );
  }
  
  export default NoteTable;
  