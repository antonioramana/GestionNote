import '../App.css';
import{useEffect,useState} from "react";
import{Link}from"react-router-dom";
import { useParams } from 'react-router-dom';
import jsPdf from "jspdf";

function Bulletin() {

  //déclaration des variables 

    const{id1,id2}=useParams();
    const[data,setData]=useState([]);
    const[nom,setNom]=useState();
    const[annee,setAnnee]=useState();
    var sumnotep=0;
    var sumcoef=0;

  //récupération des données 
    const loadData=async()=>{
        fetch("http://localhost:5000/Bulletins/"+id1+"/"+id2)
        .then(data=>{return data.json()})
        .then(data=>{
          setData(data);
          setNom(data[0].nom);
          setAnnee(data[0].annee);
        })
        };
      useEffect(()=>{
        loadData();
    }
    ,[]);
//calcul du moyenne
    const calculmoyenne=(sumcoef,sumnotep)=>{
      var moyenne=(sumnotep/sumcoef);
      if(moyenne){
      return moyenne;
    }else{
      return 0;
    }
    }
//Generer le fichier pdf
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
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav>
    <div>
    <Link to={"/Etudiants/Bulletin/"+id1} className="">Choisir le niveau</Link>
    <Link to="/Etudiants" className="">Liste des étudiants</Link>
    
    <div id="bulletin">
        N° ETUDIANTS:{id1}
        NOM:{nom}
        NIVEAU:{id2}
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
  