//Rien est public...
var ArrierePlan = function(scene)
{
    var arrierePlan = this; //Est un proxy de closure...

    //variables priv�es seules les m�thodes initialis�es ici y ont acc�s...
    var nombreImagesChargees = 0;
    
    var arrierePlanConteneur = new createjs.Container();
    
    var matriceEtoiles = new createjs.Matrix2D();
    var paysageEtoiles = new createjs.Shape();
    var imageEtoiles = new Image();

    var matriceEspace = new createjs.Matrix2D();
    var paysageEspace = new createjs.Shape();
    var imageEspace = new Image();

    //Cet �v�nement ne peut pas �tre d�clench� hors de cette fonction
    var chargementCompletArrierePlan = document.createEvent('Event');
    chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);

    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
      //http://www.crockford.com/javascript/private.html
            
      imageEtoiles.onload = function()
      {
        paysageEtoiles.graphics.beginBitmapFill(imageEtoiles,"repeat", matriceEtoiles).drawRect(0,0,canevas.width,canevas.height).endStroke();
        nombreImagesChargees++;
      }
      imageEtoiles.src = 'ressource/paysage-arriere2.png';

      imageEspace.onload = function()
      {
        paysageEspace.graphics.beginBitmapFill(imageEspace,"repeat", matriceEspace).drawRect(0,0,canevas.width,canevas.height).endStroke();
        nombreImagesChargees++;
      }
      imageEspace.src = 'ressource/paysage-arriere1.png';
      
      

      var demarrerAnimation = function (evenement)
      {
        
        arrierePlanConteneur.addChild(paysageEspace);
        arrierePlanConteneur.addChild(paysageEtoiles);
        
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
    this.rafraichirAnimation =  function(evenement, vitesse)
    {
        //matriceEtoiles.translate(arrondirAuDecimalVoulu(vitesse/10,2)),arrondirAuDecimalVoulu(Math.pow(vitesse,1/2, 2));
        matriceEtoiles.translate(vitesse/10,1);
        matriceEspace.translate(-arrondirAuDecimalVoulu(Math.sqrt(vitesse),2),arrondirAuDecimalVoulu(Math.pow(vitesse, 1/3,2)));
	  }

ArrierePlan.Configuration = 
{
  images : 
  {
    imageEtoiles : "paysage-arriere2.png",
    imageEspace : "paysage-arriere1.png"
  }
}
}