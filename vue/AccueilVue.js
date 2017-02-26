AccueilVue = function()
{
  var boutonJouer = null;
  var champNom = null;
  var nomJoueur = null;
  var formAcceuil = null;
  
  //La vue est une abstraction pour simplifier le code.
  //Elle ne connait pas le modèle. 
  //Elle ne connait pas le contrôleur.
  //Elle émet des événements et rend disponibles ses données, c'est tout.
  var enregistrerNomJoueur = function(evenement)
  {
    nomJoueur = champNom.value;
    //Elle émet des événements
    window.dispatchEvent(window.Evenement.accueilVueEnregistrerNomJoueurEnAction);
  }
  
  this.afficher = function()
  {
    document.getElementsByTagName("body")[0].innerHTML = AccueilVue.html;
    boutonJouer = document.getElementById("bouton-jouer");
    formAcceuil = document.getElementById("form-acceuil");
    
    //Seulement pour ne pas faire le submit du formulaire quand on fait enter...
    formAcceuil.addEventListener("submit", function(evenement){evenement.preventDefault(); return false;});
    
    champNom = document.getElementById("nom");
    boutonJouer.addEventListener("click", enregistrerNomJoueur);
  }
  
  //Elle rend disponibles ses données, c'est tout.
  this.getNomJoueur = function()
  {
    return nomJoueur;
  }
}
//Une capture du HTML avant que la première vue affichée écrase toutes les autres.
AccueilVue.html = document.getElementById("page-accueil").innerHTML;