import '../App.css';
import {useParams,useHistory,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
function NoteEdit() {
    const history=useHistory();
    const{id}=useParams();
    const[num,setNum]=useState("");
    const[codemat,setCodemat]=useState("");
    const[note,setNote]=useState();
    const[niveau,setNiveau]=useState("");
    
    const loadData=async()=>{
        fetch("http://localhost:5000/Notes/get/"+id)
        .then(data=>{return data.json()})
        .then(data=>{
        setNum(data[0].num);
        setCodemat(data[0].codemat);
        setNote(data[0].note);  
        setNiveau(data[0].niveau);  
        })
    };

    useEffect(()=>{
       loadData();
    }
    ,[]);
    const[data1,setData1]=useState([]);
    const[data2,setData2]=useState([]);
    const loadData1=async()=>{
         fetch("http://localhost:5000/Etudiants/get")
         .then(data=>{return data.json()})
         .then(data=>{setData1(data)})
     };
 
     useEffect(()=>{
        loadData1();
     }
     ,[]);
        const loadData2=async()=>{
            fetch("http://localhost:5000/Matieres/get")
            .then(data=>{return data.json()})
            .then(data=>{setData2(data)})
            };
    
        useEffect(()=>{
           loadData2();
        }
        ,[]);

    const handleSubmit=(e)=>{
      e.preventDefault();
      axios.put("http://localhost:5000/Notes/Edit/"+id,{num,codemat,note,niveau}).then(()=>{history.push('/Notes')});
  };
 

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
    <div className="formulaire">
        <form onSubmit={handleSubmit}>

       <label>Numéro d'inscription:</label> <select value={num} onChange={(e)=>setNum(e.target.value)}>
            {data1.map((item)=>{
                return(
            <option value={item.num}>{item.num}</option>
            )})}
        </select>
        <label>Code Matière:</label><select value={codemat} onChange={(e)=>setCodemat(e.target.value)}>
            {data2.map((item)=>{return(
            <option value={item.codemat}>{item.codemat}</option>
            )})}
        </select>

        <label>Note :</label><input type="number"value={note} onChange={(e)=>setNote(e.target.value)}/>
        <label>Niveau:</label><select value={niveau} onChange={(e)=>setNiveau(e.target.value)}>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
        </select>
        <input type="submit" value="Modifier"/> 
        <Link to="/Notes" className="">Annuler</Link>
        </form>
       </div>
       <div>{num}{codemat}{note}{niveau}</div>
        </header>
      </div>
    );
  }
  
  export default NoteEdit;
  