FinVue = function()
{
  	this.afficher = function(nomJoueur, nomAdversaire, etat, vitesse)
  	{
		var nouveauHTML = "";
	//{MESSAGE} est seulement une chaine à remplacer par une vraie valeur.
		if(etat=="gagne")
			nouveauHTML = FinVue.html.replace("{MESSAGE}","Vous avez battu " + nomAdversaire);
		else
			nouveauHTML = FinVue.html.replace("{MESSAGE}","Vous avez perdu contre " + nomAdversaire);
		//{NOM} est seulement une chaine à remplacer par une vraie valeur.
		nouveauHTML = nouveauHTML.replace("{NOM}",nomJoueur);
		nouveauHTML = nouveauHTML.replace("{RECORD}",'Vous avez atteint une vitesse de ' + vitesse + ' années lumieres!');
		document.getElementsByTagName("body")[0].innerHTML = nouveauHTML;
	}
}

FinVue.html = document.getElementById("page-fin").innerHTML;