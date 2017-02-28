FinVue = function()
{
  var recordVitesse=0;
  var nomGagnant="";

  this.afficher = function(nomJoueur,vitesse)
  {
    var nouveauHTML = "";

    if (!(nomJoueur != null && nomJoueur != ""))
      nomJoueur = '???';  

    if(recordVitesse<vitesse)
    {
      recordVitesse=vitesse;
      nomGagnant=nomJoueur;
      etat="gagne";
    }
    else
      etat="perdu";

    //{MESSAGE} est seulement une chaine à remplacer par une vraie valeur.
    switch(etat)
    {
      case "perdu":
        nouveauHTML = FinVue.html.replace("{MESSAGE}","Veuillez réessayer!");
      break;        
      case "gagne":
        nouveauHTML = FinVue.html.replace("{MESSAGE}","Vous avez battu le record!");
      break;        
    }
    //{NOM} est seulement une chaine à remplacer par une vraie valeur.
    nouveauHTML = nouveauHTML.replace("{NOM}",nomJoueur);
    nouveauHTML = nouveauHTML.replace("{RECORD}",'record à battre: ' + recordVitesse + ' par '+ nomGagnant);
    document.getElementsByTagName("body")[0].innerHTML = nouveauHTML;
  }
}

FinVue.html = document.getElementById("page-fin").innerHTML;