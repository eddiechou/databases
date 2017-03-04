var db = require('../db/index');

module.exports = {
  messages: {
    get: function (callback) {
      // TODO: Grab username and roomname instead of their keys
      db.dbConnection.query('SELECT m.text, r.roomname, u.username, m.id from Users u inner join Messages m on (u.id = m.user_id) inner join Rooms r on (m.room_id = r.id) ORDER BY m.id DESC;', function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log(">>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<", results);
          // console.log(callback);
          callback(results);

        }
      });
    }, // a function which produces all the messages
    post: function (messageObj, callback) {
      console.log("hello Fred!!!!          =     ================", messageObj);
      db.dbConnection.query(`INSERT INTO Users (username) values ("${messageObj.username}");`, function(err, results) {
        db.dbConnection.query(`INSERT INTO Rooms (roomname) values ("${messageObj.roomname}");`, function(err, results) {
          db.dbConnection.query(`INSERT INTO Messages (text, room_id, user_id) SELECT "${messageObj.text}", r.id, (SELECT u.id FROM Users u WHERE u.username = "${messageObj.username}") FROM Rooms r WHERE r.roomname = "${messageObj.roomname}";`, function(err, results) {
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
      db.dbConnection.query('SELECT username from Users;', function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log(">>>>>>>> index.js models users get <<<<<<<<<<<<<", results);
          // console.log(callback);
          callback(results);
        }
      });
    },
    post: function (messageObj, callback) {
      db.dbConnection.query(`INSERT IGNORE INTO Users (username) values ("${messageObj.username}");`, function(err, results) {
        console.log(">>>>>>>> index.js models users get <<<<<<<<<<<<<", results);
        callback(results);
      });
    }
  }
};

