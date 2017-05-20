var http = require('http');
var serveur = http.createServer();
serveur.listen(2628);
var websocket = require('websocket');
var serveurChat = new websocket.server
({
	httpServer: serveur
});

var nombreClients = 0;
var listeClients = {};

console.log("serveur initialisé");

serveurChat.on('request', function(requete)
{
	console.log('requete');
	
	var connection = requete.accept('variable', requete.origin);
	
	connection.id = nombreClients+1;
	listeClients[nombreClients++] = connection;
	
	connection.on('message', function(message)
	{
		console.log('message');
		
		for(id in listeClients)
		{
			client = listeClients[id];
			client.sendUTF(message.utf8Data);
		}
	});

});