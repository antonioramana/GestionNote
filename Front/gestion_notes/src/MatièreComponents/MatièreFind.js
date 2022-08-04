import '../App.css';
import{useEffect,useState} from "react";
import axios from "axios";
import{Link,useParams}from"react-router-dom";

function MatièreFind() {
       const{id}=useParams();
        const[data,setData]=useState([]);
        const loadData=async()=>{
        fetch("http://localhost:5000/Matieres/get/"+id)
        .then(data=>{return data.json()})
        .then(data=>{setData(data)})
    };

    useEffect(()=>{
       loadData();
    }
    ,[])
    const handleDelete=(id)=>{
        if(window.confirm("voulez supprimez cet matière?")){
        axios.delete("http://localhost:5000/Matieres/remove/"+id)
        .then(()=>{loadData();});
    }
    }
    return (
      <div className="App">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="">Etudiants</Link></li>
            <li><Link to="/Matieres" className="active">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav>
    <div className="tableau"> 
    <Link to="/Matieres" className="new">Table des Matières</Link>
    <h2>Résultat de recherche:</h2>

        {data!=0 && <table>
            <thead>
                <tr>
                    <th>CodeMat</th>
                    <th>Libellé</th>
                    <th>Coef</th>
                    <th></th>
                </tr>
            </thead>
              <tbody>
                  {data.map((item)=>{
                      return(
                 <tr color="white" key={item.codemat}>
                    <td>{item.codemat}</td>
                     <td>{item.libellé}</td>
                     <td>{item.coef}</td>
                     <td>
                     <Link to={"/Matieres/Edit/"+item.codemat} className="">Modifier</Link>
                     <button onClick={()=>{handleDelete(item.codemat)}}>Supprimer</button>
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
  
  export default MatièreFind;
  