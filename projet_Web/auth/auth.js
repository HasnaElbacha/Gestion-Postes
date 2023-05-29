// const bcrypt = require('bcrypt');//pour le hachage des mots de passe
// const jwt = require('jsonwebtoken');//pour la génération des tokens JWT 
// const { PrismaClient } = require('@prisma/client');//pour interagir avec la base de données via Prisma.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Créer un nouvel utilisateur
async function createUser(nom,email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await prisma.utilisateur.create({
      data: {
        nom,
        email,
        password: hashedPassword,
      },
    });
    console.log(data)
    return user;
  }
  
  // Vérifier les informations de connexion et générer un token JWT
  async function login(email, password) {
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Mot de passe incorrect');
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
    return token;
  }
 
  module.exports = {
    createUser,
    login,
  };
  