const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('assets'));
app.use(fileUpload());
var flash = require('connect-flash');
app.use(flash());
app.use(session({ secret: 'keyboard cat' }));
const { Home, Connexion, deconnexion, adminHome, clientHome, Produits } = require('./routes/Default');
const { ModifierClient, UpdateClient, AfficherClients, SupprimerClient, Contact, Contacter } = require('./routes/Clients');
const { AjoutProduit, AjouterProduit, AfficherProduits, SupprimerProduit, ModifierProduit, UpdateProduit, panier } = require('./routes/produits');
const { AjouterCommande, AfficherCommandes, SupprimerCommande, DetailCommande, TraiterCommandes, TraiterCommande, ImprimerCommande, DeleteCommande, ModifierCommande } = require('./routes/commandes');
const { AjoutPromotion, AjouterPromotion, AfficherPromotions, SupprimerPromotion, ModifierPromotion, UpdatePromotion, MiseAjourPromotion } = require('./routes/promotions');
const { AjoutCategorie, AjouterCategorie } = require('./routes/categories');

app.get('/', Home);
app.post('/', Connexion);
app.get('/deconnexion', deconnexion);
app.get('/adminHome', adminHome);
app.get('/clientHome', clientHome);
app.get('/ModifierClient', ModifierClient);
app.get('/SupprimerClient/:id', SupprimerClient);
app.post('/UpdateClient', UpdateClient)
app.get('/AfficherClients', AfficherClients);
// Produits
app.get('/AjoutProduit', AjoutProduit);
app.get('/SupprimerProduit/:id', SupprimerProduit);
app.get('/SupprimerProduit/:id', SupprimerProduit);
app.get('/ModifierProduit/:id', ModifierProduit);
app.post('/UpdateProduit', UpdateProduit)
app.post('/AjouterProduit', AjouterProduit)
app.get('/AfficherProduit', AfficherProduits);
app.get('/Produits', Produits);
app.get('/Catalogue', Produits);
//commandes

app.get('/SupprimerCommande/:id', SupprimerCommande);
app.get('/deleteCommande/:id', DeleteCommande);
app.post('/AjouterCommande', AjouterCommande)
app.post('/ModifierCommande', ModifierCommande)
app.post('/DetailCommande', DetailCommande)
app.get('/AfficherCommandes', AfficherCommandes);
app.get('/TraiterCommandes', TraiterCommandes);
app.get('/DetailCommande/:id', DetailCommande);
app.get('/ImprimerCommande/:id', ImprimerCommande);
app.get('/TraiterCommande/:id/:etat', TraiterCommande);

// Promotion
app.get('/AjoutPromotion', AjoutPromotion);
app.post('/AjouterPromotion', AjouterPromotion)
app.get('/AfficherPromotions', AfficherPromotions);
app.get('/SupprimerPromotion/:id', SupprimerPromotion);
app.get('/ModifierPromotion/:id', ModifierPromotion);
app.post('/UpdatePromotion', UpdatePromotion);
app.post('/MiseAjourPromotion', MiseAjourPromotion);
// Panier
app.get('/panier', panier);
// Categories
app.get('/AjoutCategorie', AjoutCategorie);
app.post('/AjouterCategorie', AjouterCategorie)
    // Contact
app.get('/Contact', Contact);
app.post('/Contacter', Contacter)
const port = 8080;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parapharmacie',
    multipleStatements: true
});
// connect to database
db.connect((err) => {
    if (err) {
        // throw err;
        console.log("Erreur de connexion au Serveur de BD");
    }
    console.log('connexion รงa va avec BD');
});
global.db = db;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // configure template engine
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});