const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const prisma = new PrismaClient();
// GET /commentaires
router.get('/', async (req, res) => {
  const take = parseInt(req.query.take) || 10;
  const skip = parseInt(req.query.skip) || 0;
  try {
    const commentaires = await prisma.commentaire.findMany({
      take,
      skip,
    });
    res.json(commentaires);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// GET /commentaires/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const commentaire = await prisma.commentaire.findUnique({
      where: {
        id: parseInt(id),
      },});
    if (!commentaire) {
      return res.status(404).json({ erreur: 'Commentaire introuvable' });
    }
    res.json(commentaire);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// POST /commentaires
router.post('/', async (req, res) => {
  try {
    const { email, contenu ,articleId} = req.body;
    const commentaire = await prisma.commentaire.create({
      data: {
        email,
        contenu,
        article:{
          connect:{id:+articleId}
            },
      },});
   res.status(201).json(commentaire);
  } catch (error) {
    console.log(error)
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// PATCH /commentaires/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, contenu } = req.body;
  try {
    const commentaire = await prisma.commentaire.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        contenu,
      },});
  res.json(commentaire);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// DELETE /commentaires/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.commentaire.delete({
      where: {
        id: parseInt(id),
      },});
    res.json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
  /********************************/

// Route protégée nécessitant une authentification
router.get('/commentaires', isAuthenticated, (req, res) => {

  res.json({ commentaires });
});

// Route protégée nécessitant une authentification
router.post('/commentaires', isAuthenticated, (req, res) => {
  res.json({ message: 'Commentaire créé avec succès' });
});

  /*******************************/
module.exports = router;