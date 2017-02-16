(function(){
function JeuSuperHot(){

  var jeuSuperHot = this;
  var arrierePlan = null;
  var oiseau = null;
  var ratioSceneLargeur = 1;
  var ratioSceneHauteur = 1;
  var ratioScene = {largeur :1, hauteur : 1};
  
  var initialiserCanevas = function()
  {
    //On redimensionne le canvas en respectant l'aspect ratio
    //On vise à remplir l'écran en largeur sans déborder en hauteur
    //On centre le résultat au milieu de l'écran pour renforcir l'aspect focal du jeu.
    ratioLargeur = window.innerWidth / dessin.width;
    ratioHauteur = window.innerHeight / dessin.height;
    if(ratioLargeur * dessin.height <= window.innerHeight)
    {
      dessin.style.width = "100%";
      dessin.style.marginLeft = "-"+ (dessin.width * ratioHauteur)/2+"px";
      dessin.style.left = (dessin.width * ratioHauteur)/2+"px";
      computedStyle = window.getComputedStyle(dessin);
      dessinNouvelleHeight = parseInt(computedStyle.getPropertyValue('height').replace("px",""));
      dessin.style.marginTop = (window.innerHeight - dessinNouvelleHeight) / 2 + "px";
    }
    else
    {
      dessin.style.width = (dessin.width * ratioHauteur) + "px" ;
      dessin.style.marginLeft = "-"+ (dessin.width * ratioHauteur)/2+"px";
    }
    var body = document.getElementsByTagName("body")[0];
    body.style.maxHeight = window.innerHeight + "px";
    body.style.overflow = "hidden";
    
    computedStyle = window.getComputedStyle(dessin);
    dessinNouvelleHeight = parseInt(computedStyle.getPropertyValue('height').replace("px",""));
    dessinNouvelleWidth = parseInt(computedStyle.getPropertyValue('width').replace("px",""));
    ratioScene.largeur = dessinNouvelleWidth / dessin.width;
    ratioScene.hauteur = dessinNouvelleHeight / dessin.height;
    
  }
  
  var interpreterEvenementsClavier = function(evenement)
  {
    switch(evenement.keyCode)
    {
        case JeuSuperHot.Configuration.toucheGauche:
          window.dispatchEvent(window.Evenement.toucheGaucheEnAction);
        break;
        case JeuSuperHot.Configuration.toucheDroite:
          window.dispatchEvent(window.Evenement.toucheDroiteEnAction);  
        break;
        case JeuSuperHot.Configuration.toucheHaut:
          window.dispatchEvent(window.Evenement.toucheHautEnAction);  
        break;
        case JeuSuperHot.Configuration.toucheBas:
          window.dispatchEvent(window.Evenement.toucheBasEnAction);  
        break;                
    }
  }

  var interpreterEvenementsSouris = function(evenement)
  {
    window.dispatchEvent(window.Evenement.clicSourisEnAction);
  }
  
  var interpreterEvenementsApplicatifs = function(evenement)
  {
    switch(evenement.type)
    {
        case window.Evenement.clicSourisEnAction.type:
          arrierePlan.pauser(!arrierePlan.estEnPause());
          oiseau.pauser(!oiseau.estEnPause());
        break;
        case window.Evenement.arrierePlanFinChargement.type:
          arrierePlan.pauser(false);
        break;
        case window.Evenement.oiseauFinChargement.type:
          oiseau.pauser(false);
        break;
    }    
  }
  
  var rafraichirAnimation = function(evenement)
  {
    arrierePlan.rafraichirAnimation(evenement);
    oiseau.rafraichirAnimation(evenement);
    
    scene.update(evenement);
  }
      
  this.lancer = function()
  {
    //Enregistrer l'écoute des événements
    window.addEventListener("keydown", interpreterEvenementsClavier);
    window.addEventListener("click", interpreterEvenementsSouris);
    
    window.addEventListener(window.Evenement.toucheGaucheEnAction.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.toucheDroiteEnAction.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.toucheHautEnAction.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.toucheBasEnAction.type, interpreterEvenementsApplicatifs, false);

    window.addEventListener(window.Evenement.clicSourisEnAction.type, interpreterEvenementsApplicatifs, false);
    
    window.addEventListener(window.Evenement.arrierePlanFinChargement.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.oiseauFinChargement.type, interpreterEvenementsApplicatifs, false);
    
    dessin = document.getElementById("dessin");
    initialiserCanevas();
    scene = new createjs.Stage(dessin);
    
    createjs.Ticker.setInterval(JeuSuperHot.Configuration.interval);
    createjs.Ticker.setFPS(JeuSuperHot.Configuration.FPS);
    
    arrierePlan = new ArrierePlan(scene);
    arrierePlan.pauser(true);
    
    oiseau = new Oiseau(scene, ratioScene);
    oiseau.pauser(true);
    
    createjs.Ticker.addEventListener("tick", rafraichirAnimation);    
    
  }  
}

JeuSuperHot.Configuration = 
{
  interval : 1000/60,
  FPS : 60,
  toucheGauche : 37, 
  toucheDroite : 39,
  toucheHaut : 38,
  toucheBas : 40
}

JeuSuperHot.Evenement =
{
  toucheGaucheEnAction : document.createEvent('Event'),
  toucheDroiteEnAction : document.createEvent('Event'),
  toucheHautEnAction : document.createEvent('Event'),
  toucheBasEnAction : document.createEvent('Event'),
  clicSourisEnAction : document.createEvent('Event'),
  arrierePlanFinChargement : document.createEvent('Event'),
  oiseauFinChargement : document.createEvent('Event')
}

JeuSuperHot.Evenement.initialiser = function()
{
  for(key in JeuSuperHot.Evenement)
  {
    if(JeuSuperHot.Evenement[key] instanceof Event)
    {
      JeuSuperHot.Evenement[key].initEvent(key, true, true);
    }
  }
  window['Evenement'] = JeuSuperHot.Evenement;
}();

jeuSuperHot = new JeuSuperHot();
jeuSuperHot.lancer();
})();
