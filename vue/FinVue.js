FinVue = function()
{
  this.afficher = function(etat, nomJoueur)
  {
    var nouveauHTML = "";
    //{MESSAGE} est seulement une chaine à remplacer par une vraie valeur.
    switch(etat)
    {
      case "perdu":
        nouveauHTML = FinVue.html.replace("{MESSAGE}","Vous avez perdu :(");
      break;        
      case "gagne":
        nouveauHTML = FinVue.html.replace("{MESSAGE}","Vous avez gagné :)");
      break;        
    }
    //{NOM} est seulement une chaine à remplacer par une vraie valeur.
    nouveauHTML = nouveauHTML.replace("{NOM}",nomJoueur);
    document.getElementsByTagName("body")[0].innerHTML = nouveauHTML;
  }
}

FinVue.html = document.getElementById("page-fin").innerHTML;