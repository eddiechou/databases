var models = require('../models');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results) {
        // Get all the data (messages, roomname, username)
        console.log('==========================', results);
        res.writeHead(200);
        res.end(results);
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
        messageObj.username = 'apple';
        messageObj.roomname = 'apple store';
        console.log('BODY: ', body);
        models.messages.post(messageObj, function() {
          console.log('=========================================');
          res.writeHead(201, exports.headers);
          res.end(JSON.stringify());
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // Get all usernames
      models.users.get(function() {

      });
    },
    post: function (req, res) {
      // Insert new user to db
      models.users.post(function() {

      });
    }
  }
};

