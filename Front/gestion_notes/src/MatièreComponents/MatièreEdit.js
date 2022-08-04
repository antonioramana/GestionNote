import '../App.css';
import {useParams,useHistory,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
function MatièreEdit() {
    const history=useHistory();

    const{id}=useParams();
    const[codemat,setCodemat]=useState("");
    const[libellé,setLibellé]=useState("");
    const[coef,setCoef]=useState();
    
    const loadData=async()=>{
        fetch("http://localhost:5000/Matieres/get/"+id)
        .then(data=>{return data.json()})
        .then(data=>{
        setCodemat(data[0].codemat);
        setLibellé(data[0].libellé);
        setCoef(data[0].coef); 
        })
    };

    useEffect(()=>{
       loadData();
    }
    ,[]);
    const handleSubmit=(e)=>{
      e.preventDefault();
      axios.put("http://localhost:5000/Matieres/Edit/"+id,{libellé,coef}).then(()=>{history.push('/Matieres')});
  };
 

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
    <div className="formulaire">

     <p>Modification de la Matière {codemat}</p>
     
        <form onSubmit={handleSubmit}>

        <input type="text"value={libellé} onChange={(e)=>setLibellé(e.target.value)}/>
        <input type="number"value={coef} onChange={(e)=>setCoef(e.target.value)}/>
        <input type="submit" value="Modifier"/>
        <Link to="/Matieres" className="">Annuler</Link>
        </form>
        </div>

        {libellé}{coef}
        </header>
      </div>
    );
  }
  
  export default MatièreEdit;
  