module.exports = {



    AjouterCommande: (req, res) => {
        let qte = req.body.qte;
        let dateAchat = req.body.dateAchat;
        let idProduit = req.body.idProduit;
        let NomProduit = req.body.NomProduit;
        let PrixProduit = req.body.PrixProduit;
        let PrixCommande = req.body.PrixCommande;
        let idClient = req.body.idClient;
        let sql = null;
        if (idClient == "") { sql = "INSERT INTO `commande`(`quantite`, `dateAchat`, `idProduit`, `NomProduit`, `PrixProduit`, `PrixCommande`, `etat`) VALUES('" + qte + "','" + dateAchat + "','" + idProduit + "','" + NomProduit + "','" + PrixProduit + "','" + PrixCommande + "','en cours')"; } else {
            sql = "INSERT INTO `commande`(`quantite`, `dateAchat`, `idProduit`, `NomProduit`, `PrixProduit`, `PrixCommande`, `idClient`, `etat`) VALUES('" + qte + "','" + dateAchat + "','" + idProduit + "','" + NomProduit + "','" + PrixProduit + "','" + PrixCommande + "','" + idClient + "','en cours')";
        }
        console.log(sql);
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            } else {
                msg = "Commande Ajouté avec Succées";
                req.flash('msg', msg);
                res.redirect('/Produits');
            }
        }); //Fin exécution requete

    },

    /*=============================================
    =            Modofer Commande          =
    =============================================*/
    ModifierCommande: (req, res) => {
        let qte = req.body.qte;

        let idCmd = req.body.idcommande;

        sql = "update `commande` set `quantite`='" + qte + "' where id_Comm ='" + idCmd + "'";

        // console.log(sql);
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur Update';
                return message;
            } else {
                msg = "Commande Modifier avec Succées";
                req.flash('msg', msg);
                res.redirect('/TraiterCommandes');
            }
        }); //Fin exécution requete

    },



    // Afficher Commandes
    AfficherCommandes: (req, res) => {

        let sql = "select * from `commande`";
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('commandes/affiche.ejs', {
                commandes: result

            });
        }); //Fin exécution requete

    },


    //Supprimer Produit
    SupprimerCommande: (req, res) => {
        role = req.session.role;
        let id = req.params.id;
        let query = "delete  from commande where id_Comm='" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            } else if (role == 'client') {
                res.redirect('/clientHome');
            } else {
                res.redirect('/AfficherCommandes');
            }

        });

    },
    //Supprimer Produit
    DeleteCommande: (req, res) => {
        role = req.session.role;
        let id = req.params.id;
        let query = "delete  from commande where id_Comm='" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            } else if (role == 'client') {
                res.redirect('/clientHome');
            } else {
                res.redirect('/TraiterCommandes');
            }

        });

    },

    // Détail 
    DetailCommande: (req, res) => {
        /** Date  */
        let dt = new Date();
        let hr = "";
        if (dt.getHours() < 10) { hr = "0" + dt.getHours(); } else { hr = dt.getHours(); }

        let heure_envois = hr + ":" + dt.getMinutes();
        let mois = "";
        for (i = 0; i < 11; i++) {
            if (dt.getMonth() == 0) { mois = "01"; }
            if (dt.getMonth() == 1) { mois = "02"; }
            if (dt.getMonth() == 2) { mois = "03"; }
            if (dt.getMonth() == 3) { mois = "04"; }
            if (dt.getMonth() == 4) { mois = "05"; }
            if (dt.getMonth() == 5) { mois = "06"; }
            if (dt.getMonth() == 6) { mois = "07"; }
            if (dt.getMonth() == 7) { mois = "08"; }
            if (dt.getMonth() == 8) { mois = "09"; }
            if (dt.getMonth() == 9) { mois = "10"; }
            if (dt.getMonth() == 10) { mois = "11"; }
            if (dt.getMonth() == 11) { mois = "12"; }
        }
        let date_envois = dt.getDate() + "/" + mois + "/" + dt.getFullYear();
        let idProduit = req.params.id;

        // let sql = "select * from  `produit` where id_produit='" + idProduit + "'";

        //Exécution de requete
        db.query("select * from  `produit` where id_produit='" + idProduit + "';select * from  `promotion` where id_produit='" + idProduit + "'", [0, 1], function(err, result) {
            let prixPromo = 0;
            let nbresPromo = result[1].length;
            if (nbresPromo > 0) {
                Object.keys(result[1]).forEach(function(key) {
                    let promo = result[1][key];
                    let prixpromo = promo.prix_promotion;
                    prixPromo = prixpromo;

                });
            } else { prixPromo = 0; }
            console.log('NBBBB ' + nbresPromo);
            res.render('commandes/detail.ejs', {

                role: req.session.role,
                id_Client: req.session.id_Client,
                commande: result[0],
                promotions: result[1],
                prixPromo: prixPromo,
                date: date_envois
                    // commandes: result

            });

        });

    },

    ImprimerCommande: (req, res) => {
        /** Date  */
        let dt = new Date();
        let hr = "";
        if (dt.getHours() < 10) { hr = "0" + dt.getHours(); } else { hr = dt.getHours(); }

        let heure_envois = hr + ":" + dt.getMinutes();
        let mois = "";
        for (i = 0; i < 11; i++) {
            if (dt.getMonth() == 0) { mois = "01"; }
            if (dt.getMonth() == 1) { mois = "02"; }
            if (dt.getMonth() == 2) { mois = "03"; }
            if (dt.getMonth() == 3) { mois = "04"; }
            if (dt.getMonth() == 4) { mois = "05"; }
            if (dt.getMonth() == 5) { mois = "06"; }
            if (dt.getMonth() == 6) { mois = "07"; }
            if (dt.getMonth() == 7) { mois = "08"; }
            if (dt.getMonth() == 8) { mois = "09"; }
            if (dt.getMonth() == 9) { mois = "10"; }
            if (dt.getMonth() == 10) { mois = "11"; }
            if (dt.getMonth() == 11) { mois = "12"; }
        }
        let date_envois = dt.getDate() + "/" + mois + "/" + dt.getFullYear();
        let idCommande = req.params.id;

        let sql = "select * from  `commande` where id_Comm ='" + idCommande + "'";

        //Exécution de requete
        db.query(sql, (err, result) => {
            res.render('commandes/Imprimer.ejs', {
                role: req.session.role,
                id_Client: req.session.id_Client,
                commande: result,
                date: date_envois
                    // commandes: result

            });

        });

    },
    // Afficher Commandes
    TraiterCommandes: (req, res) => {

        let sql = "select * from `commande` where etat='en cours'";
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('commandes/TraiterCommandes.ejs', {
                commandes: result

            });
        }); //Fin exécution requete

    },

    //Supprimer Produit
    TraiterCommande: (req, res) => {

        let id = req.params.id;
        let etat = req.params.etat;
        let query = "update  commande set etat='" + etat + "' where id_Comm = '" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.redirect('/TraiterCommandes');
        });

    },


}