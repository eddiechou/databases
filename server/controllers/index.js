var models = require('../models');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

var collectData = function(request, callback) {
  console.log("getting in?????????");
  var data = '';
  request.on('data', function(chunk) {
    console.log("collectiong chunk!!!", chunk);
    data += chunk;
  });
  request.on('end', function() {
    console.log("oh no it's data!!!!>_< : ", data);
    callback(JSON.parse(data));
  });
};


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results) {
        // Get all the data (messages, roomname, username)
        console.log('--------->>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<', results);
        res.writeHead(200, exports.headers);
        res.end(JSON.stringify(results));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      collectData(req, function(message) {
        console.log("message!!!!", message);
        // 
        models.messages.post(message, function() {
          res.writeHead(201, exports.headers);
          res.end();
        });
      
      });
      //});
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // Get all usernames
      models.users.get(function(results) {
      // Get all the data (messages, roomname, username)
        console.log('index controller >> users >> get >>>>>>>>>>>', results);
        res.writeHead(200, exports.headers);
        res.end(JSON.stringify(results));
      });
    },
    post: function (req, res) {
      // Insert new user to db
      console.log('get into /classes/users POST');
      collectData(req, function(message) {
        console.log('index controller >> users >> post >>>>>>>>>>>', message);
        models.users.post(message, function() {
          res.writeHead(201, exports.headers);
          res.end();
        });
      });
    }
  }
};

