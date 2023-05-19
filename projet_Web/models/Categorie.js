const mysql = require('mysql2');

// Créez une connexion à notre base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_project'
});

// Modèle Categorie
const Categorie = {
  getAll(callback) {
    connection.query('SELECT * FROM categorie', callback);
  },
 //Affichage des Categories
  getById(id, callback) {
    connection.query('SELECT * FROM categorie WHERE id = ?', [id], callback);
  },
 //Ajoute d'un nouveau Categorie
  create(newCategorie, callback) {
    connection.query('INSERT INTO categorie SET ?', newCategorie, callback);
  },
 //Mis à jour des Categories
  update(id, updatedCategorie, callback) {
    connection.query('UPDATE categorie SET ? WHERE id = ?', [updatedCategorie, id], callback);
  },
 //Supprission d'un Categories
  delete(id, callback) {
    connection.query('DELETE FROM categorie WHERE id = ?', [id], callback);
  }
};

module.exports = Categorie;