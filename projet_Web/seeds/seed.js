const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const prisma = new PrismaClient();
async function seed() {
    try {
      // Création de 10 utilisateurs AUTHOR
      for (let i = 0; i < 10; i++) {
        await prisma.utilisateur.create({
          data: {
            nom: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: "AUTHOR",
          },
        });
      }
      // Création d'un utilisateur ADMIN
      await prisma.utilisateur.create({
        data: {
          nom: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: "ADMIN",
        },
      });
      // Création de 10 catégories
      for (let i = 0; i < 10; i++) {
        await prisma.categorie.create({
          data: {
            nom: faker.lorem.word(),
          },
        });
      }
      // Création de 100 articles
      for (let i = 0; i < 100; i++) {
        const randCategories = faker.random.number({ min: 1, max: 4 });
        const randUser = faker.random.number({ min: 1, max: 10 });
        const article = await prisma.article.create({
          data: {
            titre: faker.lorem.sentence(),
            contenu: faker.lorem.paragraphs(),
            image: faker.image.imageUrl(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            published: true,
            auteurId: randUser,
            categories: {
              connect: Array.from({ length: randCategories }).map(() => ({
                id: faker.random.number({ min: 1, max: 10 }),
              })),
            },
          },
        });
        // Création de 0 à 20 commentaires pour chaque article
        const randomComments = faker.random.number({ min: 0, max: 20 });
        for (let j = 0; j < randomComments; j++) {
          await prisma.commentaire.create({
            data: {
              email: faker.internet.email(),
              contenu: faker.lorem.sentences(),
              articleId: article.id,
            },
          });
        }
      }
      console.log("Données de test créées avec succès !");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création des données de test :", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  // Appel de la fonction de création des données de test
  seed();
  
