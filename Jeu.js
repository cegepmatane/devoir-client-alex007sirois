(function(){
function Jeu()
{
	var jeu = this;
 	var arrierePlan = null;
	var balle = null;
	var terrain = null;
	var joueur1 = null;
	var joueur2 = null;
	var collisions = null;
}

Jeu.Configuration = 
{
  interval : 1000/60,
  FPS : 60,
  /*toucheGauche : 37, 
  toucheDroite : 39,
  toucheHaut : 38,
  toucheBas : 40*/
}

Jeu.Evenement =
{
  clicSourisEnAction : document.createEvent('Event'),
  arrierePlanFinChargement : document.createEvent('Event'),
}

Jeu.Evenement.initialiser = function()
{
  for(key in Jeu.Evenement)
  {
    if(Jeu.Evenement[key] instanceof Event)
    {
      Jeu.Evenement[key].initEvent(key, true, true);
    }
  }
  window['Evenement'] = Jeu.Evenement;
}();

Jeu = new Jeu();
Jeu.lancer();
})();