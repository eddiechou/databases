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
      db.dbConnection.query(`INSERT IGNORE INTO Users (username) values (${messageObj.username})`, function(err, results) {

      });
      db.dbConnection.query(`INSERT IGNORE INTO Rooms (roomname) values (${messageObj.roomname})`, function(err, results) {

      });
      db.dbConnection.query(`INSERT INTO Messages (text, user_id, room_id) SELECT "${messageObj.text}", r.id, (SELECT u.id FROM Users u WHERE u.username = "Eddie") FROM Rooms r WHERE r.roomname = "main";`, function(err, results) {

      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

