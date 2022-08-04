import '../App.css';
import{useEffect,useState} from "react";
import{Link,useParams}from"react-router-dom";

function Moyennes() {
    const{niv}=useParams();
    let rang=0;
    const[data,setData]=useState([]);
    const loadData=async()=>{
        fetch("http://localhost:5000/Moyennes/"+niv)
        .then(data=>{return data.json()})
        .then(data=>{
          setData(data);
        })
        };
        
    useEffect(()=>{
        loadData();
    }
    ,[]);
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
    <Link to="/Moyennes" className="">Choisir le niveau</Link>
    <div id="bulletin">
        NIVEAU:{niv}
        <table>
            <thead>
                <tr>
                    <th> RANG</th>
                    <th>  N° ETUDIANTS</th>
                    <th> NOM</th>
                    <th>moyenne</th>
                    <th>bulletin de note</th>
                </tr>
            </thead>
              <tbody>
                  {data.map((item)=>{
                
                  return(
                 <tr color="white" key={item}>
                     <td>{rang=rang+1}</td>
                     <td>{item.num}</td>
                     <td>{item.nom}</td>
                     <td>{item.moyenne}</td>
                     <td>
                       <Link to={"/Etudiants/Bulletin/"+item.num+"/"+niv}>Voir le Bulletin</Link>
                     </td>
                 </tr>
                   )})}
            </tbody>
        </table>
        </div>
        </div>
       
         </header>
  
      </div>
    );
    }
  
  export default Moyennes;
  