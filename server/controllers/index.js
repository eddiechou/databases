var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // make a connection with the db
      models.messages.get(function(results) {
        // Get all the data (messages, roomname, username)
        res.writeHead(200);
        res.end(results[0].id.toString());
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // make a connection with the db

      // insert the message (3 SQL insert statements)

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

