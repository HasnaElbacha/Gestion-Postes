// const { PrismaClient } = require("@prisma/client");
// const faker = require("faker");
// const prisma = new PrismaClient();
// async function seed() {
//     try {
//       // Création de 10 utilisateurs AUTHOR
//       for (let i = 0; i < 10; i++) {
//        var authorUsers= await prisma.utilisateur.create({
//           data: {
//             nom: faker.name.findName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//             role: "AUTHOR",
//           },
//         });
//       }
//       // Création d'un utilisateur ADMIN
//       await prisma.utilisateur.create({
//         data: {
//           nom: faker.name.findName(),
//           email: faker.internet.email(),
//           password: faker.internet.password(),
//           role: "ADMIN",
//         },
//       });
//       // Création de 10 catégories
//       for (let i = 0; i < 10; i++) {
//         await prisma.categorie.create({
//           data: {
//             nom: faker.lorem.word(),
//           },
//         });
//       }
//       // Création de 100 articlesfaker.random.number({ min: 1, max: 10 });
//       for (let i = 0; i < 100; i++) {
//         const randCategories = faker.random.number({ min: 1, max: 4 });
//         const randUser = faker.random.number({ min: 1, max: 10 });
//         const article = await prisma.article.create({
//           data: {
//             titre: faker.lorem.sentence(),
//             contenu: faker.lorem.paragraphs(),
//             image: faker.image.imageUrl(),
//             createdAt: faker.date.past(),
//             updatedAt: faker.date.recent(),
//             published: true,
//             // auteurId: randUser,
//             auteur:{
//                             connect: { id: randUser},
//                           },
//             categories: {
//               connect: Array.from({ length: randCategories }).map(() => ({
//                 id: faker.random.number({ min: 1, max: 10 }),
//               })),
//             },
//           },
//         });
//         // Création de 0 à 20 commentaires pour chaque article
//         const randomComments = faker.random.number({ min: 0, max: 20 });
//         for (let j = 0; j < randomComments; j++) {
//           await prisma.commentaire.create({
//             data: {
//               email: faker.internet.email(),
//               contenu: faker.lorem.sentences(),
//               articleId: article.id,
//             },
//           });
//         }
//       }
const express = require('express');
const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Créer 10 utilisateurs ayant le rôle "AUTHOR"
    const authorUsers = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        return prisma.utilisateur.create({
          data: {
            nom: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'AUTHOR',
          },
        });
      })
    );

    // Créer 1 utilisateur ayant le rôle "ADMIN"
    const adminUser = await prisma.utilisateur.create({
      data: {
        nom: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'ADMIN',
      },
    });

    const categoryDomains = [
      'Technologie',
      'Mode',
      'Voyage',
      'Cuisine',
      'Sport',
      'Musique',
      'Art',
      'Science',
      'Santé',
      'Actualités',
    ];
    // Créer 10 catégories
    let i = 0;
    const categories = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const randomCategory = categoryDomains[i];
        i++;
    
        return prisma.categorie.create({
          data: {
            nom: randomCategory,
          },
        });
      })
    );

    // Créer 100 articles
    const articles = await Promise.all(
      Array.from({ length: 100 }).map(async () => {
        const randomAuthor = authorUsers[Math.floor(Math.random() * authorUsers.length)];
        const randomCategories = categories.slice(0, Math.floor(Math.random() * 4) + 1);


        return prisma.article.create({
          data: {
            titre: faker.lorem.sentence(),
            contenu: faker.lorem.paragraphs(),
            image: faker.image.url(800, 400, 'loremflickr.com'),
            published: faker.datatype.boolean(),
            auteur: {
              connect: { id: randomAuthor.id },
            },
            categories: {
              connect: randomCategories.map((category) => ({ id: category.id })),
            },
          },
        });
      })
    );

    // Créer de 0 à 20 commentaires pour chaque article
    await Promise.all(
      articles.map(async (article) => {
        const numComments = faker.number.int({ min: 0, max: 20 });
        if (numComments > 0) {
          const comments = await Promise.all(
            Array.from({ length: numComments }).map(async () => {
              const randomAuthor = authorUsers[Math.floor(Math.random() * authorUsers.length)];

              return prisma.commentaire.create({
                data: {
                  contenu: faker.lorem.sentence(),
                  email: randomAuthor.email,
                  article: {
                    connect: { id: article.id },
                  },
                },
              });
            })
          );
          return comments;
        }
      })
    );
      console.log("Données de test créées avec succès !");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création des données de test :", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  // Appel de la fonction de création des données de test
  seed();
  
