var express = require('express');
var router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
/*****************************************/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST /users
router.post('/', async (req, res) => {
  const { nom, email, password, role } = req.body;
  try {
    const newUser = await prisma.utilisateur.create({
      data: {
        nom,
        email,
        password,
        role,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// PATCH /users/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, password} = req.body;
  try {
    const updatedUser = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        email,
        password,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }});
// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.utilisateur.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/*************************************** */
// Route protégée nécessitant une authentification
router.get('/users', isAuthenticated, (req, res) => {
  res.json({ users });
});
// Route protégée nécessitant une authentification et un rôle d'administrateur
router.delete('/users/:id', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: 'Utilisateur supprimé avec succès' });
});
/*****************************************/
module.exports = router;



