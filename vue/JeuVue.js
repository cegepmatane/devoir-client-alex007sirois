JeuVue = function()
{
  this.afficher = function()
  {
    document.getElementsByTagName("body")[0].innerHTML = JeuVue.html;
  }
}

JeuVue.html = document.getElementById("page-jeu").innerHTML;