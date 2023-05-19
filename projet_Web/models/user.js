const mysql = require('mysql2');

// Créez une connexion à notre base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_project'
});

// Modèle utilisateur
const user = {
  getAll(callback) {
    connection.query('SELECT * FROM utilisateur', callback);
  },
 //Affichage des utilisateurs
  getById(id, callback) {
    connection.query('SELECT * FROM utilisateur WHERE id = ?', [id], callback);
  },
 //Ajoute d'un nouveau utilisateur
  create(newutilisateur, callback) {
    connection.query('INSERT INTO utilisateur SET ?', newutilisateur, callback);
  },
 //Mis à jour des utilisateurs
  update(id, updatedutilisateur, callback) {
    connection.query('UPDATE utilisateur SET ? WHERE id = ?', [updatedutilisateur, id], callback);
  },
 //Supprission d'un utilisateurs
  delete(id, callback) {
    connection.query('DELETE FROM utilisateur WHERE id = ?', [id], callback);
  }
};

module.exports = user;