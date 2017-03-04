var db = require('../db/index');

module.exports = {
  messages: {
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM Messages', function(err, results) {
        if (err) {
          throw err;
        } else {
          // console.log(results);
          // console.log(callback);
          callback(results);

        }
      });
    }, // a function which produces all the messages
    post: function (messageObj, callback) {
      console.log(messageObj);
      db.dbConnection.query(`INSERT INTO Users (username) values ("${messageObj.username}");`, function(err, results) {
        db.dbConnection.query(`INSERT INTO Rooms (roomname) values ("${messageObj.roomname}");`, function(err, results) {
          db.dbConnection.query(`INSERT INTO Messages (text, user_id, room_id) SELECT "${messageObj.text}", r.id, (SELECT u.id FROM Users u WHERE u.username = "${messageObj.username}") FROM Rooms r WHERE r.roomname = "${messageObj.roomname}";`, function(err, results) {
            callback(results);
          });
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      //
    },
    post: function (callback) {
      
    }
  }
};

