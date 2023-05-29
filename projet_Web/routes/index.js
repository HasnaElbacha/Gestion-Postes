var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const prisma = new PrismaClient();
const { sequelize, Op } = require('sequelize');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//*************  connexion ****************** */
var idutilisateur=122
router.post('/login', async (req, res) => {
  try {
    // if (req.isAuthenticated) {
    //   return res.redirect('/')

    // }

    const { email, password } = req.body;
    // Recherchez l'utilisateur dans la base de données
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) {
      return res.send({ message: 'Cet adresse e-mail n\'existe pas' });
    }

    // Vérifiez si le mot de passe correspond au mot de passe haché stocké
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send({ message: 'Mot de passe incorrect.' });
    }

    // Générez un jeton JWT pour l'utilisateur{message:'Erreur lors de la connexion'}
    const token = jwt.sign({ userId: user.id }, 'votre_secret_key');
    res.cookie('token', token); // Définir le cookie 'token'
    console.log(token);
    // idutilisateur=user.id
    if(user.role=='ADMIN'){
      return res.send({message:'Connexion réussie.admin'})
    }else{
      return res.send({message:'Connexion réussie.autre'})
    }
    
  } catch (error) {
    console.log(error)
  }
});

//******************** Inscription ************************** */
router.post('/signup', async (req, res) => {
    const { nom,email, password } = req.body;
    const user = await prisma.utilisateur.findUnique({ where: { email }});
    // idutilisateur=user.id
    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.utilisateur.create({
              data: {
                nom,
                email,
                password:hashedPassword,
              },
            });
      return res.send({ message: 'Opération est réussi!' });
    }
    else{
      return res.send({ message: 'Cet adresse déja existe ' });
    }
});
//************** Ajouter nouveau article */
router.post('/Ajouterarticle', async (req, res) => {
  const { titre, contenu, image,categories } = req.body;
  // try {
    let categoriesCorrespondantes = await prisma.categorie.findMany({
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
        auteur:{
      connect:{id:idutilisateur}
        },
        categories: {
          connect: categoriesCorrespondantes.map((cat) => ({ id: cat.id })),
        },}, });
        console.log('id utilisateur'+idutilisateur)
    // res.status(201).json(article);
    return res.send({ message: 'Opération est réussi!' });
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({ erreur: 'Erreur interne du serveur' });
  // }
});
//******************** Supprimer article *********************** */
router.delete('/supprimerarticle', async (req, res) => {
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

router.get('cat/:id', async (req, res) => {
  const articleId = parseInt(req.params.id);

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        categories: true,
      },
    });
    if (!article) {
      return res.send({ message: 'L\'article spécifié n\'existe pas.' });
    }

    const categories = article.categories.map((category) => category.id);
    console.log("lllll")
    console.log(categories);
    res.send(categories);
  } catch (error) {
    console.error(error);
    res.send({ message: 'Une erreur s\'est produite lors de la récupération des catégories.' });
  }
});


// async function getArticlesByCategorie(categoryId) {
//   try {
//     // Récupérer les articles correspondant à la catégorie spécifiée en utilisant Prisma
//     const articles = await prisma.article.findMany({
//       where: {
//         categories: {
//           some: {
//             id: categoryId
//           }
//         }
//       },
//       include: {
//         auteur: true,
//         categories: true
//       }
//     });

//     return articles;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des articles :", error);
//     throw error;
//   }
// }
       


// ---------------------------------------------------------------------
module.exports = router;

