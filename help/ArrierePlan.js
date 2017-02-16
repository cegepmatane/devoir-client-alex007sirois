//Rien est public...
var ArrierePlan = function(scene)
{
    var arrierePlan = this; //Est un proxy de closure...

    //variables privées seules les méthodes initialisées ici y ont accès...
    var nombreImagesChargees = 0;
    
    var arrierePlanConteneur = new createjs.Container();
    
    var matriceMontagne = new createjs.Matrix2D();
    var paysageMontagne = new createjs.Shape();
    var imageForetMontagne = new Image();
    
    var matriceBuisson = new createjs.Matrix2D();
    var paysageBuisson = new createjs.Shape();
    var imageBuisson = new Image();
    
    var matriceNuage = new createjs.Matrix2D();
    var paysageNuage = new createjs.Shape();
    var imageNuage = new Image();

    //Cet événement ne peut pas être déclenché hors de cette fonction
    var chargementCompletArrierePlan = document.createEvent('Event');
    chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);

    var arrierePlanEnPause = false;
    
    //Constructeur parce qu'il est appelé inline à la fin...
    var initialiser = function()
    {
      //http://www.crockford.com/javascript/private.html
            
      imageForetMontagne.onload = function()
      {
        paysageMontagne.graphics.beginBitmapFill(imageForetMontagne,"repeat", matriceMontagne).drawRect(0,0,800,500).endStroke();
        nombreImagesChargees++;
      }
      imageForetMontagne.src = ArrierePlan.Configuration.images.imageForetMontagne;
      
      imageBuisson.onload = function()
      {
        paysageBuisson.graphics.beginBitmapFill(imageBuisson,"repeat", matriceBuisson).drawRect(0,0,800,500).endStroke();
        nombreImagesChargees++;
        
      }
      imageBuisson.src = ArrierePlan.Configuration.images.imageBuisson;
      
      imageNuage.onload = function()
      {
        paysageNuage.graphics.beginBitmapFill(imageNuage,"repeat", matriceNuage).drawRect(0,0,800,500).endStroke();
        nombreImagesChargees++;
        
      }
      imageNuage.src = ArrierePlan.Configuration.images.imageNuage;
      
      

      var demarrerAnimation = function (evenement)
      {
        arrierePlanConteneur.addChild(paysageMontagne)
        arrierePlanConteneur.addChild(paysageBuisson)
        arrierePlanConteneur.addChild(paysageNuage)
        
        scene.addChild(arrierePlanConteneur);
      }
      
      var validerChargementImages = function(evenement)
      { 
        if(nombreImagesChargees == Object.keys(ArrierePlan.Configuration.images).length)
        {
          window.dispatchEvent(chargementCompletArrierePlan); 
          createjs.Ticker.removeEventListener("tick", validerChargementImages);
          window.dispatchEvent(window.Evenement.arrierePlanFinChargement);
        }
      }
      
      window.addEventListener('chargementCompletArrierePlan', demarrerAnimation, false);
      createjs.Ticker.addEventListener("tick", validerChargementImages);
    }
    
    //constructeur
    initialiser();
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement)
    {
      
      if(!arrierePlanEnPause)
      {
        matriceNuage.translate(-ArrierePlan.Configuration.vitesseNuage,0);
        matriceMontagne.translate(-ArrierePlan.Configuration.vitesseMontagne,0);
        matriceBuisson.translate(-ArrierePlan.Configuration.vitesseBuisson,0);
      }
    }
    
    this.pauser = function(enPause)
    {
      arrierePlanEnPause = enPause;
      console.log("arrierePlanEnPause: "+arrierePlanEnPause);
    }
    
    this.estEnPause = function()
    {
      return arrierePlanEnPause;
    }
    
}

ArrierePlan.Configuration = 
{
  images : {
    imageBuisson : "paysage-cylindrique-avant.png",
    imageForetMontagne : "paysage-arriere.png",
    imageNuage : "paysage-nuage.png"
  },
  vitesseNuage : 3,
  vitesseMontagne : 1,
  vitesseBuisson : 9
}
