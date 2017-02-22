//Rien est public...
var ArrierePlan = function(scene)
{
    var arrierePlan = this; //Est un proxy de closure...

    //variables priv�es seules les m�thodes initialis�es ici y ont acc�s...
    var nombreImagesChargees = 0;
    
    var arrierePlanConteneur = new createjs.Container();
    
    var matriceMontagne = new createjs.Matrix2D();
    var paysageMontagne = new createjs.Shape();
    var imageForetMontagne = new Image();

    //Cet �v�nement ne peut pas �tre d�clench� hors de cette fonction
    var chargementCompletArrierePlan = document.createEvent('Event');
    chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);

    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
      //http://www.crockford.com/javascript/private.html
            
      imageForetMontagne.onload = function()
      {
        paysageMontagne.graphics.beginBitmapFill(imageForetMontagne,"repeat", matriceMontagne).drawRect(0,0,canevas.width,canevas.height).endStroke();
        nombreImagesChargees++;
      }
      imageForetMontagne.src = "paysage-arriere.png";
      
      

      var demarrerAnimation = function (evenement)
      {
        arrierePlanConteneur.addChild(paysageMontagne)
        
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
        matriceMontagne.translate(-ArrierePlan.Configuration.vitesseMontagne,0);
	}

ArrierePlan.Configuration = 
{
  images : {
    imageForetMontagne : "paysage-arriere.png"
  },
  vitesseMontagne : 2
}
}