//server.js 
const express = require ('express'); 
const favicon = require ('express-favicon'); 
const path = require ('path'); 
const port = process.env.PORT || 8080; 
const app = express (); 
app.use (favicon (__ dirname + '/build/favicon.ico')); 
// le __dirname est le répertoire courant à partir duquel le script exécute 
app.use (express.static (__ dirname)); 
app.use (express.static (path.join (__ dirname, 'build'))); 
app.get ('/ ping', fonction (req, res) { 
return res.send ('pong'); 
}); 
app.get ('/ *', fonction (req, res) { 
  res.sendFile (path.join (__ dirname, 'build', 'index.html')); 
}); 
app.listen (port);