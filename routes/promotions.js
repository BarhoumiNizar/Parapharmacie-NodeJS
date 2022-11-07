module.exports = {



    AjoutPromotion: (req, res) => {
        res.render('promotions/Ajout.ejs');
    },

    AjouterPromotion: (req, res) => {
        let id_produit = req.body.id_produit;
        let prix_produit = req.body.prix_produit;
        let prix_promotion = req.body.prix_promotion;
        let date_promotion = req.body.date_promotion;
        let images = req.files.image;
        let image = images.name;

        let sql = "INSERT INTO `promotion`(`id_produit`,  `prix_produit`,`image_promotion`, `prix_promotion`, `date_promotion`) VALUES('" + id_produit + "','" + prix_produit + "','" + image + "','" + prix_promotion + "','" + date_promotion + "')";
        console.log(sql);
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            } else {
                images.mv(__dirname + `/../assets/imagesPromotions/${image}`);

                res.redirect('/AjoutPromotion');
            }
        }); //Fin exécution requete
        // Modifier Promotion

    },
    // Afficher Produits
    AfficherPromotions: (req, res) => {

        let sql = "select * from `promotion`";
        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur selection';
                return message;
            }
            res.render('promotions/affiche.ejs', {
                promotions: result

            });
        }); //Fin exécution requete

    },
    //Supprimer Promotion
    SupprimerPromotion: (req, res) => {

        let id = req.params.id;
        let query = "delete  from promotion where id_promotion='" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.redirect('/AfficherPromotions');
        });

    },
    ModifierPromotion: (req, res) => {

        let id = req.params.id;
        let query = "select * from promotion where id_promotion ='" + id + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('promotions/Modifier.ejs', {
                promotion: result

            });
        });

    },

    // Modifier Promotion
    UpdatePromotion: (req, res) => {
        let id = req.body.id;
        let id_produit = req.body.id_produit;
        let prix_produit = req.body.prix_produit;
        let prix_promotion = req.body.prix_promotion;
        let date_promotion = req.body.date_promotion;
        let images = req.files.image;
        let image = images.name;
        let sql = "UPDATE `promotion` SET `id_produit`='" + id_produit + "',`image`='" + image + "',`prix_produit`='" + prix_produit + "',`prix_promotion`='" + prix_promotion + "',`date_promotion`='" + date_promotion + "' WHERE id_promotion='" + id + "'";

        //Exécution de requete
        db.query(sql, (err, result) => {
            if (err) {
                message = 'Erreur ajout';
                return message;
            } else {
                images.mv(__dirname + `/../assets/imagesPromotions/${image}`);

                res.redirect('/AfficherPromotions');
            }
        }); //Fin exécution requete

    },

    // Modifier Promo with animationDirection: 
    // Modifier Promotion
    MiseAjourPromotion: (req, res) => {
        let id = req.body.idpromotion;

        let prix_promotion = req.body.prix_promotion;
        let date_promotion = req.body.date_promotion;

        let sql = "UPDATE `promotion` SET `prix_promotion`='" + prix_promotion + "',`date_promotion`='" + date_promotion + "' WHERE id_promotion='" + id + "'";
        console.log(sql);
        //Exécution de requete
        db.query(sql, (err, result) => {


            res.redirect('/AfficherPromotions');

        }); //Fin exécution requete

    },
}