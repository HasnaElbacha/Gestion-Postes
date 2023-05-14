const express = require('express');
const router = express.Router();
const Commentaire = require('../models/commentaire');

// Récupérer tous les commentaires
router.get('/', async (req, res) => {
  const take = parseInt(req.query.take) || 10;
  const skip = parseInt(req.query.skip) || 0;

  try {
    const commentaires = await Commentaire.find().limit(take).skip(skip);
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer un commentaire par son id
router.get('/:id', getCommentaire, (req, res) => {
  res.json(res.commentaire);
});

// Ajouter un commentaire
router.post('/', async (req, res) => {
  const commentaire = new Commentaire({
    email: req.body.email,
    contenu: req.body.contenu
  });

  try {
    const newCommentaire = await commentaire.save();
    res.status(201).json(newCommentaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un commentaire
router.patch('/:id', getCommentaire, async (req, res) => {
  if (req.body.email != null) {
    res.commentaire.email = req.body.email;
  }
  if (req.body.contenu != null) {
    res.commentaire.contenu = req.body.contenu;
  }

  try {
    const updatedCommentaire = await res.commentaire.save();
    res.json(updatedCommentaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un commentaire
router.delete('/:id', getCommentaire, async (req, res) => {
  try {
    await res.commentaire.remove();
    res.json({ message: 'Commentaire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un commentaire en fonction de son id
async function getCommentaire(req, res, next) {
  let commentaire;
  try {
    commentaire = await Commentaire.findById(req.params.id);
    if (commentaire == null) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.commentaire = commentaire;
  next();
}

module.exports = router;

