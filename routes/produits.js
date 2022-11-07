module.exports = {



    AjoutProduit: (req, res) => {
        res.render('produits/Ajout.ejs');
    },

    AjouterProduit: (req, res) => {
        let nom = req.body.nom;
        let prix = req.body.prix;
        let description = req.body.description;
        let type = req.body.type;
        let images = req.files.image;
        let image = images.name;

        let sql = "INSERT INTO `produit`(`Nom_produit`, `prix`, `image`, `Description`, `type`) VALUES('" + nom + "','" + prix + "','" + image + "','" + description + "','" + type + "')";
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            } else {
                images.mv(__dirname + `/../assets/imagesProduits/${image}`);

                res.redirect('/AfficherProduit');
            }
        }); //Fin exécution requete

    },
    // Afficher Produits
    AfficherProduits: (req, res) => {

        let sql = "select * from `produit`";
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('produits/affiche.ejs', {
                produits: result

            });
        }); //Fin exécution requete

    },


    //Supprimer Produit
    SupprimerProduit: (req, res) => {

        let id = req.params.id;
        let query = "delete  from produit where id_produit='" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.redirect('/AfficherProduit');
        });

    },
    // Detail Produit
    //Supprimer Produit
    ModifierProduit: (req, res) => {

        let id = req.params.id;
        let query = "select * from produit where id_produit='" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('produits/Modifier.ejs', {
                produits: result

            });
        });

    },

    //Update 
    UpdateProduit: (req, res) => {
        let nom = req.body.nom;
        let prix = req.body.prix;
        let description = req.body.description;
        let type = req.body.type;
        let images = req.files.image;
        let image = images.name;
        let id = req.body.id;
        let sql = "update  `produit` set `Nom_produit`='" + nom + "',prix='" + prix + "',Description='" + description + "',type='" + type + "',image='" + image + "' where id_produit='" + id + "'";

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            } else {
                images.mv(__dirname + `/../assets/imagesProduits/${image}`);

                res.redirect('/AfficherProduit');
            }
        }); //Fin exécution requete

    },
    // Panier
    // Afficher Produits
    panier: (req, res) => {
        if (!req.session.role) {
            req.flash("Error");
            res.redirect('/');
        }
        let clientId = req.session.id_Client;
        console.log('Id de Client ' + clientId);
        let sql = "select * from `commande` as cmd , produit as prd where cmd.idClient ='" + clientId + "' && cmd.idProduit =prd.id_produit";
        console.log(sql);

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('panier.ejs', {
                nbCmd: result.length,
                panier: result,
                msg: req.flash("msg"),
                role: req.session.role

            });
        }); //Fin exécution requete

    },
}