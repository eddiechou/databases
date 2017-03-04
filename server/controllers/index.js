var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results) {
        // Get all the data (messages, roomname, username)
        res.writeHead(200);
        res.end(results[0].id.toString());
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });

      req.on('end', function() {
        // insert the message (3 SQL insert statements)
        var messageObj = {};
        body = body.replace('message=', '');
        body = body.replace('+', ' ');
        body = body.replace('&submit=Submit', '');
        messageObj.text = body;
        messageObj.username = 'Fred';
        messageObj.roomname = 'main';
        console.log('BODY: ', body);
        models.messages.post(messageObj, function() {
          res.writeHead(201);
          res.end('');
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // Get all usernames
    },
    post: function (req, res) {
      // Insert new user to db
    }
  }
};

