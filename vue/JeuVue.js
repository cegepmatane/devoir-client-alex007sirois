JeuVue = function()
{
	this.afficher = function()
  	{
		document.getElementsByTagName("body")[0].innerHTML = JeuVue.html;
  	}

  	this.modifierVitesse = function(vitesse)
  	{
		document.getElementById('vitesse').innerHTML = vitesse;
  	}
}

JeuVue.html = document.getElementById("page-jeu").innerHTML;