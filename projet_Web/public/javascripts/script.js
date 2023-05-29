
//   // Fonctions pour la route articles
function getArticles() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/articles',
        method: 'GET',
        // data: { take, skip },
        success: function(data) {
          resolve(data); 
        },
        error: function(error) {
          reject(error); 
        }});});}
//     //fonction getArticlescategories(id) 
    function getArticlescategories(id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `http://localhost:4000/cat/:${id}`,
          method: 'GET',
          // data: { take, skip },
          success: function(data) {
            resolve(data); 
          },
          error: function(error) {
            reject(error); }});});} 
          
//   // Fonctions pour la route categories
  function getCategories() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/categories',
        method: 'GET',
        success: function(data) {
          resolve(data); 
          console.log("daata")
        },
        error: function(error) {
          reject(error); 
        }}); });}
//    // Fonctions pour la route users
   function getUsers() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/users',
        method: 'GET',
        success: function(data) {
          resolve(data); 
        },
        error: function(error) {
          reject(error); 
        } });});}
//    // Fonctions pour la route commentaires   
  function getUserComments() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/commentaires`,
        method: 'GET',
        success: function(data) {
          resolve(data); 
        },
        error: function(error) {
          reject(error); 
        }});});}
//   //Test sur la fonction getArticles()
  getArticles().then(data => {
    console.log(data); 
  }).catch(error => {
    console.log(error)
    console.error(error); 
  });
//   //Test sur la fonction getCategories()
  getCategories().then(data => {
    console.log(data); 
  }).catch(error => {
    console.error(error); 
  });
//   //Test sur la fonction getUsers()
  getUsers().then(data => {
    console.log(data); 
  }).catch(error => {
    console.error(error); 
  });
//   //Test sur la fonction getUserCommentaires()
  getUserComments().then(data => {
    console.log(data); 
  }).catch(error => {
    console.error(error); 
  });
//   // Dans la fonction qui charge la page "index.html" ou lorsqu'elle est prête
// // document.addEventListener('DOMContentLoaded', function() {
    
//     // // Récupérer les articles
//     // getArticles().then(articles => {
//     //   // Mettre à jour les éléments HTML avec les articles
//     //   const articlesContainer = document.getElementById('articles-container');
//     //   articles.forEach(article => {
//     //     const articleElement = document.createElement('div');
//     //     articleElement.classList.add('article');
//     //     articleElement.textContent = article.titre;
//     //     articlesContainer.appendChild(articleElement);
//     //   });
//     // }).catch(error => {
//     //   console.error(error);
//     // });
//   //    var count=0;
//   //   // Récupérer les catégories
//   //   getCategories().then(categories => {
//   //     // Mettre à jour les éléments HTML avec les catégories
//   //     const categoriesContainer = document.getElementById('categories-container');
//   //     categories.forEach(category => {
//   //       const categoryElement = document.createElement('div');
//   //       categoryElement.classList.add('category');
//   //       const iconElement = document.createElement('i');
//   //       iconElement.classList.add('category-icon');
//   //       iconElement.classList.add('bi', category.icon);
//   //       categoryElement.appendChild(iconElement);
        
//   //       const nameElement = document.createElement('span');
//   //       nameElement.classList.add('category-name');
//   //       nameElement.textContent = category.nom;
//   //       categoryElement.appendChild(nameElement);
//   //       //******************************************* */

  
//   //       //******************************************* */
//   //       const countElement = document.createElement('span');
//   //       countElement.classList.add('category-count');
//   //       category.articles.forEach(e=>{
//   //          if(e==categories.id)
//   //              count++
//   //       })
//   //       countElement.textContent = `(${count})`;
//   //       categoryElement.appendChild(countElement);
//   //       categoriesContainer.appendChild(categoryElement);
//   //     });
//   //   }).catch(error => {
//   //     console.error(error);
//   //   });
//   // });
// // // Écouteur d'événement pour un lien de navigation
// // const linkElement = document.getElementById('nav-link');
// // linkElement.addEventListener('click', function(event) {
// //   event.preventDefault(); // Empêche le comportement de navigation par défaut
  
// //   // Charger les nouvelles données à partir du backend
// //   // Utilisez les fonctions et la logique appropriées pour récupérer les données
  
// //   // Mettre à jour le contenu de la page avec les nouvelles données
// //   const contentElement = document.getElementById('content');
// //   contentElement.innerHTML = '<h1>Nouvelle page</h1><p>Contenu mis à jour</p>';
// // });


// //************************************************      les div        ******************************************** */

// // ***********************************************      Pagination     **********************************************
function afficherDivs(idcategory) {
  var articlesContainer = document.getElementById("divContainer");
  var arti=document.createElement("div");
  articlesContainer.style.width="100%"
  articlesContainer.innerHTML = "";
  var i=1;
  var g=1;console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
  getArticles(idcategory).then(articles => {
      var g=1;console.log("pppp")
      console.log(idcategory)
      articles.forEach(article => {
        console.log("article idiiiiiiiiiiiii")
      if(idcategory){     
        arti.setAttribute('id','lien'+idcategory)
        arti.style.display = "flex";
        arti.style.flexWrap = "wrap";
        arti.style.overflow= "auto";
        arti.style.paddingRight="5%";
        arti.style.marginRigh="5%";
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.classList.add('col-sm-6');
        articleElement.style.width="28%"
        articleElement.style.marginBottom="10px"
        const articleEl = document.createElement('div');
        articleEl.classList.add('card');
        const El = document.createElement('div');
        El.classList.add('divprofile');
        const Article = document.createElement('div');
        Article.classList.add('card-body');
        const NomImage=document.createElement('div');
        NomImage.classList.add('profile')
        const imgP=document.createElement('img');
        imgP.src="https://picsum.photos/80/60"+(++g)
        imgP.classList.add('imgprofile');
        const Nom=document.createElement('h5');
        Nom.classList.add("auteur")
        var nnom
        getUsers().then(users=>{
          users.forEach(user=>{
            if(user.id==article.auteurId)
                  nnom=user.nom;
                  Nom.textContent=nnom;
                  console.log("hiiiiii")
                  console.log(nnom)
          })
        })
        const h5=document.createElement('h6');
        h5.classList.add('card-title');
        h5.textContent =article.titre;
        const image=document.createElement('img');
        image.classList.add('post');
        image.src =article.image;
        image.style.width="100%";
        const divpara=document.createElement('div')
        divpara.classList.add('dvpara')
        const paragraphe=document.createElement('p');
        paragraphe.classList.add('card-text');
        paragraphe.textContent=article.contenu;
        //******************************************/
        var gestion =document.createElement('div')
        gestion.classList.add("classgestion")
        const accordionElement = document.createElement("div");
        accordionElement.classList.add("commentaire")
        accordionElement.className = "accordion";
        accordionElement.textContent = "Commentaire";  
        getUserComments().then(comments=>{
         var text="";          
         const panelElement = document.createElement("div");
        var panelEl = document.createElement("div");
        panelElement.className = "panel";
          comments.forEach(comment=>{
            if(comment.articleId==article.id){
              text=`<h5>${comment.email}</h5><p>${comment.contenu}</p>`
               panelEl.innerHTML+=text;
               console.log(i)
            }     
         });     
        // Ajout de l'événement de clic pour l'accordéon
        accordionElement.addEventListener("click", function() {
          accordionElement.classList.toggle("active");
          if (panelElement.style.display === "block") {
            panelElement.style.display = "none";
          } else {
            panelElement.style.display = "block";
          }
        })  

        var pjaime=document.createElement('p')
        pjaime.classList.add("likesCount") 
        pjaime.classList.add('id'+i)   
        var buttonjaime=document.createElement('button')
        buttonjaime.classList.add("likeButton")
        var imagejaime=document.createElement('img')
        imagejaime.classList.add('likesimage')
        imagejaime.classList.add('idd'+i)
        pjaime.textContent="0"
        imagejaime.src="../images/coeurvide.png"
  
        //***************************************** */
        articleElement.appendChild(articleEl);
        articleEl.appendChild(El);
        El.appendChild(NomImage)
        NomImage.appendChild(imgP)
        El.appendChild(Nom);
        articleEl.appendChild(Article);
        Article.appendChild(image);
        Article.appendChild(h5);
        Article.appendChild(divpara);
        divpara.appendChild( paragraphe)
        Article.appendChild(gestion);
        gestion.appendChild(accordionElement); 
        gestion.appendChild(buttonjaime);
        buttonjaime.appendChild(imagejaime);
        gestion.appendChild(pjaime)
        panelElement.appendChild(panelEl);
        Article.appendChild(panelElement);
        arti.appendChild(articleElement);
        articlesContainer.appendChild(arti);
        console.log("test");
      
        })  
      }console.log("article idiiii")
   }); 
 
      i++;
    
  }).catch(error => {
      console.error(error);
    }); 
} 
       
//  *************** Categories 

function afficherCategorie() {
  console.log("hasnaaaaa");
  var ii = 1;var getnomcategory = document.getElementById("components");
  getCategories().then(categories => {
    console.log("categories aaaa");
    categories.forEach(category => {
      var licreate = document.createElement("li");
      var acreate = document.createElement("a");
      acreate.textContent = category.nom;
      console.log(category.nom);
      acreate.setAttribute("href", "#lien" + category.id);
      acreate.setAttribute("data-toggle", "collapse");
      acreate.setAttribute("aria-expanded", "false");
      acreate.classList.add("dropdown-toggle");
      licreate.classList.add("activee");
      licreate.addEventListener('click',()=>{
      var categoryId = acreate.getAttribute('href').replace('#lien', '');console.log("ggggg"+categoryId)
      // afficherArticlesParCategorie(categoryId);
      afficherDivs(categoryId)
    })  
      licreate.appendChild(acreate);
      getnomcategory.appendChild(licreate);
    });
  });  
}
afficherCategorie();
