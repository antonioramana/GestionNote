const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const mysql=require("mysql2");
const cors=require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const db=mysql.createPool(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"gestionnote"
    }
)

//get etudiant

app.get("/Etudiants/get",(req,res)=>{
    const sqlGet="SELECT * FROM etudiant";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
});
//delete etudiant
app.delete("/Etudiants/remove/:id",(req,res)=>{
    const{id}= req.params;
    const sqlDelete="DELETE FROM Etudiant WHERE num=?";
    const sqlDelete2="DELETE FROM note WHERE num=?";
    db.query(sqlDelete,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
    db.query(sqlDelete2,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});
//create etudiant

app.post("/Etudiants/create",(req,res)=>{
    const{num,nom,adresse,sexe,niveau,annee}=req.body;
    const sqlCreate="INSERT INTO etudiant (num,nom,adresse,sexe,niveau,annee) VALUES (?,?,?,?,?,?)";
    db.query(sqlCreate,[num,nom,adresse,sexe,niveau,annee],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
            res.send(error.sqlMessage);
        }else{
            res.send(result); 
        }

    });
});
//etudiant edit

app.put("/Etudiants/Edit/:id",(req,res)=>{
    const{id}=req.params;
    const{nom,adresse,sexe,niveau,annee}=req.body;
    const sqlCreate="UPDATE etudiant SET nom=?,adresse=?,sexe=?,niveau=?,annee=? Where num=?";
    db.query(sqlCreate,[nom,adresse,sexe,niveau,annee,id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//one etudiant get 

app.get("/Etudiants/get/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT * FROM etudiant  Where num=? OR nom LIKE '%"+id+"%' ";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

//get Mati??re

app.get("/Matieres/get",(req,res)=>{
    const sqlGet="SELECT * FROM mati??re";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
});
//delete Mati??re
app.delete("/Matieres/remove/:id",(req,res)=>{
    const{id}= req.params;
    const sqlDelete="DELETE FROM mati??re WHERE codemat=?";
    const sqlDelete2="DELETE FROM note WHERE codemat=?";
    db.query(sqlDelete,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
    db.query(sqlDelete2,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});
//create Mati??re

app.post("/Matieres/create",(req,res)=>{
    const{codemat,libell??,coef}=req.body;
    const sqlCreate="INSERT INTO mati??re (codemat,libell??,coef) VALUE (?,?,?)";
    db.query(sqlCreate,[codemat,libell??,coef],(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});
//Mati??re edit

app.put("/Matieres/Edit/:id",(req,res)=>{
    const{id}=req.params;
    const{libell??,coef}=req.body;
    const sqlGet="UPDATE mati??re SET libell??=? ,coef=? Where codemat=? ";
    db.query(sqlGet,[libell??,coef,id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//one mati??re get 

app.get("/Matieres/get/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT * FROM mati??re  Where codemat=? OR libell?? LIKE '%"+id+"%'";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//get Note

app.get("/Notes/get",(req,res)=>{
    const sqlGet="SELECT * FROM note";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
});
//delete Note
app.delete("/Notes/remove/:id",(req,res)=>{
    const{id}= req.params;
    const sqlDelete="DELETE FROM note WHERE id=?";
    db.query(sqlDelete,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});
//create Note

app.post("/Notes/create",(req,res)=>{
    const{num,codemat,note,niveau,annee}=req.body;
    const sqlCreate="INSERT INTO note (num,codemat,note,niveau,annee) VALUE (?,?,?,?,?)";
    db.query(sqlCreate,[num,codemat,note,niveau,annee],(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});
//Note edit

app.put("/Notes/Edit/:id",(req,res)=>{
    const{id}=req.params;
    const{num,codemat,note,niveau}=req.body;
    const sqlCreate="UPDATE note SET num=?,codemat=?,note=?,niveau=? Where id=?";
    db.query(sqlCreate,[num,codemat,note,niveau,id],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//one note get 


app.get("/Notes/get/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT * FROM note  Where id=? ";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//Notes d'un ??tudiant
app.get("/Notes/get/Etudiant/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT * FROM note  Where num=? ";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//Niveau D'un ??tudiant dans note
app.get("/Niveau/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT DISTINCT note.niveau FROM note,etudiant WHERE etudiant.num=note.num AND etudiant.num =? ORDER BY note.niveau ASC";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

//BULLETInN DES NOTES D'un ??tudiant
app.get("/Bulletin/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT etudiant.num,note.niveau,etudiant.nom, note.annee, mati??re.codemat,note.note,mati??re.coef,mati??re.libell?? FROM etudiant, mati??re,note WHERE etudiant.num=note.num AND mati??re.codemat=note.codemat AND etudiant.num =?  ORDER BY mati??re.codemat ASC";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

//BULLETInN DES NOTES D'un ??tudiant
app.get("/Bulletins/:id/:niv",(req,res)=>{
   const {id,niv}=req.params;
    const sqlCreate="SELECT etudiant.nom, note.annee, mati??re.codemat,note.note,mati??re.coef,mati??re.libell?? FROM etudiant, mati??re,note WHERE etudiant.num=note.num AND mati??re.codemat=note.codemat AND etudiant.num =? AND note.niveau=? ORDER BY mati??re.codemat ASC";
    db.query(sqlCreate,[id,niv],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});
//moyenne par classe
app.get("/Moyennes/:id",(req,res)=>{
    const{id}=req.params;
    const sqlCreate="SELECT etudiant.num,etudiant.nom, SUM(note.note*mati??re.coef)/SUM(mati??re.coef) AS moyenne FROM etudiant,note,mati??re WHERE etudiant.num=note.num AND mati??re.codemat=note.codemat AND note.niveau ='"+id+"' GROUP BY(etudiant.num) ORDER BY moyenne DESC";
    db.query(sqlCreate,id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

app.listen(5000,()=>{console.log("server is running on the port 5000")});