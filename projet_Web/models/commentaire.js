const mysql = require('mysql2');

// Créez une connexion à notre base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_project'
});

// Modèle Commentaire
const commentaire = {
  getAll(callback) {
    connection.query('SELECT * FROM commentaire', callback);
  },
 //Affichage des Commentaires
  getById(id, callback) {
    connection.query('SELECT * FROM commentaire WHERE id = ?', [id], callback);
  },
 //Ajoute d'un nouveau Commentaire
  create(newCommentaire, callback) {
    connection.query('INSERT INTO commentaire SET ?', newCommentaire, callback);
  },
 //Mis à jour des Commentaires
  update(id, updatedCommentaire, callback) {
    connection.query('UPDATE commentaire SET ? WHERE id = ?', [updatedCommentaire, id], callback);
  },
 //Supprission d'un Commentaires
  delete(id, callback) {
    connection.query('DELETE FROM commentaire WHERE id = ?', [id], callback);
  }
};

module.exports = commentaire;