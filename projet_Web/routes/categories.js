const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// GET /categories
router.get('/', async (req, res) => {
  const take = parseInt(req.query.take) || 10;
  const skip = parseInt(req.query.skip) || 0;
  try {
    const categories = await prisma.categorie.findMany({
      take,
      skip,
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// GET /categories/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categorie = await prisma.categorie.findUnique({
      where: {
        id: parseInt(id),
      },});
    if (!categorie) {
      return res.status(404).json({ erreur: 'Catégorie introuvable' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// POST /categories
router.post('/', async (req, res) => {
  const { nom } = req.body;
  try {
    const categorie = await prisma.categorie.create({
      data: {
        nom,
        
      }, });
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// PATCH /categories/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const categorie = await prisma.categorie.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom,
      },});
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
// DELETE /categories/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categorie.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }});
module.exports = router;
