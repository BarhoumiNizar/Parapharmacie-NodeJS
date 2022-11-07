module.exports = {
    //Fonction d'affichage

    //Fonction pour retourner la page de conx
    Home: (req, res) => {


        db.query("select * from produit;select * from  promotion as promo,produit as prd where promo.id_produit=prd.id_produit", [0, 1], function(err, result) {


            res.render('Home.ejs', {

                produits: result[0],
                promotions: result[1],
                role: req.session.role,
                msg: req.flash("msg")


            });
        }); //Fin exécution requete
    },
    Connexion: (req, res) => {

        let email = req.body.email;
        let mdp = req.body.mdp;
        let sql = "select * from `clients` where  email='" + email + "' && password='" + mdp + "'";
        console.log(sql);
        let msg = "";
        // si le connecté est admin:
        if (email == 'admin@gmail.com' && mdp == 'admin123') {
            res.redirect('/adminHome');
            req.session.role = "admin";
        } else

        {
            db.query(sql, (err, result) => {
                var nbres = result.length;
                console.log("Nb Res: " + nbres);
                if (nbres == 0) {
                    msg = "Erreur";
                    req.flash('msg', msg);
                    res.redirect('/');

                } else {
                    Object.keys(result).forEach(function(key) {
                        var clients = result[key];
                        var id_Client = clients.id_Client;
                        var nom = clients.Nom;
                        var prenom = clients.Prenom;
                        var email = clients.email;
                        var telephone = clients.telephone;
                        var password = clients.password;
                        req.session.id_Client = id_Client;
                        req.session.nom = nom;
                        req.session.prenom = prenom;
                        req.session.email = email;
                        req.session.telephone = telephone;
                        req.session.password = password;

                    });
                    req.session.role = "client";

                    res.redirect('/clientHome');



                }




            });
        }
    },
    //Fonction pour deconnecter
    deconnexion: (req, res) => {
        req.session.role = "";

        res.redirect('/');
        msg: req.flash("msg");
        role: req.session.role


    },
    adminHome: (req, res) => {


        res.render('homeAdmin.ejs');
    },

    clientHome: (req, res) => {
        if (!req.session.role) {
            req.flash("Error");
            res.redirect('/');
        }
        nom = req.session.nom;
        prenom = req.session.prenom;
        let sql = "select * from `commande` where idClient ='" + req.session.id_Client + "'";

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('homeClient.ejs', {
                nom: nom,
                prenom: prenom,
                commandes: result
            });


        }); //Fin exécution requete

    },
    // Afficher Produits
    Produits: (req, res) => {

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
        let sql = "select * from `produit`";

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }

            res.render('produits.ejs', {

                produits: result,
                role: req.session.role,
                msg: req.flash("msg"),
                date: date_envois

            });
        }); //Fin exécution requete

    },



}