import './App.css';
import{useEffect,useState} from "react";
import axios from "axios";
import{Link}from"react-router-dom";
import { useParams } from 'react-router-dom';
import jsPdf from "jspdf";

function Bulletin() {
    const{id}=useParams();
    const[data,setData]=useState([]);
    const[nom,setNom]=useState();
    const[niveau,setNiveau]=useState();
    const[annee,setAnnee]=useState();
    var sumnotep=0;
    var sumcoef=0;
    const loadData=async()=>{
        fetch("http://localhost:5000/Bulletin/"+id)
        .then(data=>{return data.json()})
        .then(data=>{
          setData(data);
          setNom(data[0].nom);
          setNiveau(data[0].niveau);
          setAnnee(data[0].annee);
        })
        };

    useEffect(()=>{
        loadData();
    }
    ,[]);
    const calculmoyenne=(sumcoef,sumnotep)=>{
      var moyenne=(sumnotep/sumcoef);
      if(moyenne){
      return moyenne;
    }else{
      return 0;
    }
    }
    const genererPdf=()=>{
      var doc= new jsPdf("p","pt","a4");
      doc.html(document.querySelector("#bulletin"),{
        callback: function(pdf){
          pdf.save("Bulletin.pdf");
        }
      })
    }
    return (
      <div className="App">
        <header className="App-header">
        <nav>
        <ul>
            <li><Link to="/" className="">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="active">Etudiants</Link></li>
            <li><Link to="/Matieres" className="">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
        </ul>
    </nav>
    <div>
    <Link to="/Etudiants" className="">Liste des étudiants</Link>
    <div id="bulletin">
        N° ETUDIANTS:{id}
        NOM:{nom}
        NIVEAU:{niveau}
        ANNEE:{annee}
        <table>
            <thead>
                <tr>
                    <th>DESIGNATION</th>
                    <th>COEF</th>
                    <th>NOTE</th>
                    <th>NOTE PONDEREE</th>
                </tr>
            </thead>
              <tbody>
                  {data.map((item)=>{
                    var notep=(item.note)*(item.coef);
                    sumnotep=sumnotep+notep;
                    sumcoef=sumcoef+item.coef;
                  return(
                 <tr color="white" key={item}>
                     <td>{item.codemat}</td>
                     <td>{item.coef}</td>
                     <td>{item.note}</td>
                      <td>{notep}</td>
                 </tr>
                   )})}
                   <tr>
                    <td>SOMME</td>
                     <td>{sumcoef}</td>
                     <td></td>
                     <td>{sumnotep}</td>
                   </tr>
                   <tr>
                     <td colSpan="3">MOYENNE</td>
                     <td>{calculmoyenne(sumcoef,sumnotep)}</td>
                   </tr>
                   <tr>
                     <td colSpan="3">OBSERVATION</td>
                     <td>{(calculmoyenne(sumcoef,sumnotep))<10?"REDOUBLANT":"ADMIS"}</td>
                   </tr>
            </tbody>
        </table>
        </div>
        </div>
        <button onClick={genererPdf}>Obtenir le Bulletin en Pdf</button>
         </header>
  
      </div>
    );
    }
  
  export default Bulletin;
  