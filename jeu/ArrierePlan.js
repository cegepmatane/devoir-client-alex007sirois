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

    var vitesseEspaceHorizontal=0;
    var vitesseEspaceVertical=0;
    var vitesseEtoilesHorizontal=0;
    var vitesseEtoilesVertical=0;

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
      imageEtoiles.src = ArrierePlan.Configuration.images.imageEtoiles;

      imageEspace.onload = function()
      {
        paysageEspace.graphics.beginBitmapFill(imageEspace,"repeat", matriceEspace).drawRect(0,0,canevas.width,canevas.height).endStroke();
        nombreImagesChargees++;
      }
      imageEspace.src = ArrierePlan.Configuration.images.imageEspace;
      
      

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

    this.changementVitesse = function(vitesse)
    {
      vitesseEspaceHorizontal = -arrondirAuDecimalVoulu(Math.pow(vitesse, 1 / ArrierePlan.Configuration.ralentissementEspaceHorizontal), 2);
      vitesseEspaceVertical = arrondirAuDecimalVoulu(Math.pow(vitesse, 1 / ArrierePlan.Configuration.ralentissementEspaceVertical),2);

      vitesseEtoilesHorizontal = arrondirAuDecimalVoulu(Math.pow(vitesse, 1 / ArrierePlan.Configuration.ralentissementEtoileHorizontal), 2);
      vitesseEtoilesertical = -arrondirAuDecimalVoulu(Math.pow(vitesse, 1 / ArrierePlan.Configuration.ralentissementEtoileVertical), 2);
    }
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement)
    {
        //matriceEtoiles.translate(arrondirAuDecimalVoulu(vitesse/10,2)),arrondirAuDecimalVoulu(Math.pow(vitesse,1/2, 2));
        matriceEtoiles.translate(vitesseEtoilesHorizontal,vitesseEtoilesVertical);
        matriceEspace.translate(vitesseEspaceHorizontal,vitesseEspaceVertical);
	  }


}

ArrierePlan.Configuration = 
{
  images : 
  {
    imageEtoiles : "ressource/paysage-arriere2.png",
    imageEspace : "ressource/paysage-arriere1.png"
  },
  ralentissementEspaceHorizontal: 2,
  ralentissementEspaceVertical: 3,
  ralentissementEtoileHorizontal: 1.5,
  ralentissementEtoileVertical: 2,
}