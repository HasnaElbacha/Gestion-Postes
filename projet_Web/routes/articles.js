const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// GET /articles
router.get('/', async (req, res) => {
  const take = parseInt(req.query.take) || 10;
  const skip = parseInt(req.query.skip) || 0;
  try {
    const articles = await prisma.article.findMany({
      take,
      skip,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// GET /articles/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },});
    if (!article) {
      return res.status(404).json({ erreur: 'Article introuvable' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
const { sequelize, Op } = require('sequelize');
// POST /articles
router.post('/', async (req, res) => {
  const { titre, contenu, image, published,auteurId,categories } = req.body;
  try {
    let categoriesCorrespondantes = await prisma.Categorie.findMany({
      where: {
        id: {
          [Op.in]: categories,
        },
      },
    });
    const article = await prisma.article.create({
      data: {
        titre,
        contenu,
        image,
        published,
        auteur:{
      connect:{id:auteurId}
        },
        categories: {
          connect: categoriesCorrespondantes.map((cat) => ({ id: cat.id })),
        },}, });
    res.status(201).json(article);
  } catch (error) {
    console.log(error)
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// PATCH /articles/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { titre, contenu, image, createdAt, updatedAt, published } = req.body;
  try {
    const article = await prisma.article.update({
      where: {
        id: parseInt(id),
      },
      data: {
        titre,
        contenu,
        image,
        createdAt,
        updatedAt,
        published,
      }, });

    res.json(article);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }
});

// DELETE /articles/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.article.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }
});

module.exports = router;
