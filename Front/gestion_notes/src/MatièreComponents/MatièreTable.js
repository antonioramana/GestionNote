import '../App.css';
import{useEffect,useState} from "react";
import axios from "axios";
import{Link,useHistory}from"react-router-dom";

function MatièreTable() {
    const history=useHistory();
    const[matiere,setMatiere]=useState(""); 
    const[data,setData]=useState([]); 
    const loadData=async()=>{
        fetch("http://localhost:5000/Matieres/get")
        .then(data=>{return data.json()})
        .then(data=>{setData(data)})
       // const resp= await axios.get("http://localhost:5000/Etudiants/get");
        //setData(resp.data);
    };

    useEffect(()=>{
       // fetch("http://localhost:5000/Etudiants/get").then(data=>{return data.json()}).then(data=>{setData(data)})
       loadData();
    }
    )
    const handleDelete=(id)=>{
        if(window.confirm("voulez supprimez cette matière?")){
        axios.delete("http://localhost:5000/Matieres/remove/"+id)
        .then(()=>{loadData();});
    }
    }
    const handleFind=(matiere)=>{
        if(matiere==""){
          alert("veuillez remplir le champ de recherche");
        }else{
        history.push("/Matieres/find/"+matiere);
      }
    }
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
    <input type="text" value={matiere} onChange={(e)=>{setMatiere(e.target.value)}} placeholder="Search.. codemat ou libellé" /> 
    <button onClick={()=>{handleFind(matiere)}}>Rechercher</button>
    <div className="tableau">      
    <Link to="/Matieres/create" className="new">Nouveau Matière</Link>    
     <table>
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
        </div>
         </header>
      </div>
    );
  }
  
  export default MatièreTable;
  