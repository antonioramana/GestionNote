import './App.css';
import {Link} from "react-router-dom";

function Accueil() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
        <ul>
            <li><Link to="/" className="active">Accueil</Link> </li>
            <li><Link to="/Etudiants" className="">Etudiants</Link></li>
            <li><Link to="/Matieres" className="">Matières</Link></li>
            <li><Link to="/Notes" className="">Notes</Link></li>
            <li><Link to="/Moyennes" className="">Moyennes</Link></li>

        </ul>
    </nav>
        </header>
        <h3>Bienvenu sur notre projet sur la gestion du commande</h3>
        Cette application nous permet de gerer les clients, les produits ,les commandes et les factures des clients dans un point de vente...

      </div>
    );
  }
  
  export default Accueil;
  