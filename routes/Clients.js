module.exports = {
    //Fonction d'affichage

    //Fonction pour retourner la page Ajout Client
    ModifierClient: (req, res) => {

        res.render('clients/Modifier.ejs', {
            nom: req.session.nom,
            prenom: req.session.prenom,
            email: req.session.email,
            telephone: req.session.telephone,
            password: req.session.password,
            id_Client: req.session.id_Client

        });
    },
    // Contact
    //Fonction pour retourner la page Ajout Client
    Contact: (req, res) => {

        res.render('clients/contact.ejs', {
            nom: req.session.nom,
            prenom: req.session.prenom,
            email: req.session.email,
            telephone: req.session.telephone,
            password: req.session.password,
            id_Client: req.session.id_Client

        });
    },
    // Contacter
    // Add Client
    Contacter: (req, res) => {
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
        let date_contact = dt.getDate() + "/" + mois + "/" + dt.getFullYear();
        let idClient = req.body.idclient;
        let sujet = req.body.sujet;
        let message = req.body.message;

        let sql = "INSERT INTO `messages`(`id_client`, `sujet`, `message`, `date_msg`) values('" + idClient + "','" + sujet + "','" + message + "','" + date_contact + "') ";

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur Contact';
                return message;
            }

            res.redirect('/Contact');
        }); //Fin exécution requete

    },
    // Add Client
    UpdateClient: (req, res) => {
        let idClient = req.body.idclient;
        let nom = req.body.nom;
        let password = req.body.password;
        let prenom = req.body.prenom;
        let email = req.body.email;
        let tel = req.body.tel;
        let sql = "update `clients` set `Nom`='" + nom + "',`Prenom` = '" + prenom + "',`email` = '" + email + "', `telephone`= '" + tel + "', `password`= '" + password + "' where id_Client ='" + idClient + "'";

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur Update';
                return message;
            }

            res.redirect('/ModifierClient');
        }); //Fin exécution requete

    },
    // Afficher Clients
    AfficherClients: (req, res) => {

        let sql = "select * from `clients`";
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('clients/affiche.ejs', {
                clients: result

            });
        }); //Fin exécution requete

    },

    SupprimerClient: (req, res) => {
        let id = req.params.id;
        let sql = "delete  from clients where id_Client ='" + id + "'";
        console.log(sql);
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            }

            res.redirect('/deconnexion');
        }); //Fin exécution requete

    },
}