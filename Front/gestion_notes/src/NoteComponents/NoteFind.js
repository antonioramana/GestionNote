import '../App.css';
import{useEffect,useState} from "react";
import axios from "axios";
import{Link,useParams}from"react-router-dom";

function NoteFind() {
       const{id}=useParams();
        const[data,setData]=useState([]);
        const loadData=async()=>{
        fetch("http://localhost:5000/Notes/get/Etudiant/"+id)
        .then(data=>{return data.json()})
        .then(data=>{setData(data)})
    };

    useEffect(()=>{
       loadData();
    }
    ,[])
    const handleDelete=(id)=>{
        if(window.confirm("voulez supprimez ce note?")){
        axios.delete("http://localhost:5000/Notes/remove/"+id)
        .then(()=>{loadData();});
    }
    }
    return (
      <div className="App">
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
    <Link to="/Notes" className="new">Table des Notes</Link>
    <h2>Résultat de recherche:</h2>

        {data!=0 &&   <table>
            <thead>
                <tr>
                    <th>N° d' inscription</th>
                    <th>Codemat</th>
                    <th>Note</th>
                    <th>Niveau</th>
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
                     <td>
                     <Link to={"/Notes/Edit/"+item.id} className="">Modifier</Link>
                     <button onClick={()=>{handleDelete(item.id)}}>Supprimer</button>
                     </td>
                 </tr>
                      )
                   })}
            </tbody>
        </table>
        }
        {data==0 && <p>Matiere non trouvé</p>}
        </div>
      </div>
    );
  }
  
  export default NoteFind;
  