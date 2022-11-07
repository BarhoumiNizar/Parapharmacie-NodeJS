module.exports = {


    //Fonction pour retourner la page Ajout Client
    AjoutCategorie: (req, res) => {
        res.render('categories/Ajout.ejs');
    },
    AjouterCategorie: (req, res) => {
        let type = req.body.type;
        let description = req.body.description;

        sql = "INSERT INTO `categorie`(`type`, `description`) VALUES('" + type + "','" + description + "')";


        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            } else {
                msg = "Categorie Ajouté avec Succées";
                req.flash('msg', msg);
                res.redirect('/AjoutCategorie');
            }
        }); //Fin exécution requete

    },




}