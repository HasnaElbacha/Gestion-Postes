const mysql = require('mysql2');

// Créez une connexion à notre base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_project'
});

// Modèle Article
const Article = {
  getAll(callback) {
    connection.query('SELECT * FROM article', callback);
  },
 //Affichage des articles
  getById(id, callback) {
    connection.query('SELECT * FROM article WHERE id = ?', [id], callback);
  },
 //Ajoute d'un nouveau article
  create(newArticle, callback) {
    connection.query('INSERT INTO article SET ?', newArticle, callback);
  },
 //Mis à jour des articles
  update(id, updatedArticle, callback) {
    connection.query('UPDATE article SET ? WHERE id = ?', [updatedArticle, id], callback);
  },
 //Supprission d'un articles
  delete(id, callback) {
    connection.query('DELETE FROM article WHERE id = ?', [id], callback);
  }
};

module.exports = Article;