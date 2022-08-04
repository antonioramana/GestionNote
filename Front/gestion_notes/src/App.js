import './App.css';
import{BrowserRouter as Router,Switch,Route} from "react-router-dom";
import EtudiantTable from './EtudiantComponents/EtudiantTable';
import EtudiantCreate from './EtudiantComponents/EtudiantCreate';
import EtudiantEdit from './EtudiantComponents/EtudiantEdit';
import MatièreTable from './MatièreComponents/MatièreTable';
import MatièreCreate from './MatièreComponents/MatièreCreate';
import MatièretEdit from './MatièreComponents/MatièreEdit';
import NoteTable from './NoteComponents/NoteTable';
import NoteCreate from './NoteComponents/NoteCreate';
import NoteEdit from './NoteComponents/NoteEdit';
import Bulletin from"./BulletinComponents/Bulletin";
import Moyennes from"./MoyenneComponents/Moyennes";
import Accueil from './Accueil';
import EtudiantFind from './EtudiantComponents/EtudiantFind';
import MatièreFind from './MatièreComponents/MatièreFind';
import NoteFind from './NoteComponents/NoteFind';
import BulletinNiveau from './BulletinComponents/BulletinNiveau';
import MoyenneNiveau from './MoyenneComponents/MoyenneNiveau';
function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
      <Route exact path="/"> 
         <Accueil />
      </Route>
    </Switch>
    <Switch>
      <Route exact path="/Etudiants"> 
         <EtudiantTable/>
      </Route>
    </Switch>
    <Switch>
      <Route path="/Etudiants/Create"> 
         <EtudiantCreate/>
      </Route>
    </Switch>
    <Switch>
      <Route path="/Etudiants/Edit/:id"> 
         <EtudiantEdit/>
      </Route>
    </Switch>

    <Switch>
      <Route exact path="/Matieres"> 
         <MatièreTable />
      </Route>
    </Switch>
    <Switch>
      <Route path="/Matieres/Create"> 
         <MatièreCreate/>
      </Route>
    </Switch>
    <Switch>
      <Route path="/Matieres/Edit/:id"> 
         <MatièretEdit/>
      </Route>
    </Switch>
    <Switch>
      <Route exact path="/Notes"> 
         <NoteTable/>
      </Route>
    </Switch>
    <Switch>
      <Route path="/Notes/Create"> 
         <NoteCreate/>
      </Route>
    </Switch>
    <Switch>
      <Route path="/Notes/Edit/:id"> 
         <NoteEdit/>
      </Route>
    </Switch>
    
    <Switch>
      <Route exact path="/Etudiants/Bulletin/:id"> 
         <BulletinNiveau />
      </Route>
    </Switch>
    <Switch>
      <Route path="/Etudiants/Bulletin/:id1/:id2"> 
         <Bulletin/>
      </Route>
    </Switch>

    <Switch>
      <Route path="/Etudiants/Find/:id"> 
         <EtudiantFind />
      </Route>
    </Switch>
    <Switch>
      <Route path="/Matieres/Find/:id"> 
         <MatièreFind />
      </Route>
    </Switch>
    <Switch>
      <Route path="/Notes/Find/:id"> 
         <NoteFind />
      </Route>
    </Switch>
      <Switch>
    <Route exact path="/Moyennes"> 
         <MoyenneNiveau />
      </Route>
      </Switch>
      <Switch>
    <Route path="/Moyennes/:niv"> 
         <Moyennes />
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
