var db = require('../db/index');

module.exports = {
  messages: {
    get: function (callback) {
      db.dbConnection.query('SELECT m.text, r.roomname, u.username, m.id from Users u inner join Messages m on (u.id = m.user_id) inner join Rooms r on (m.room_id = r.id) ORDER BY m.id DESC;', function(err, results) {
        if (err) {
          throw err;
        } else {
          callback(results);
        }
      });
    }, 
    post: function (messageObj, callback) {
      db.dbConnection.query(`INSERT INTO Users (username) values ("${messageObj.username}");`, function(err, results) {
        db.dbConnection.query(`INSERT INTO Rooms (roomname) values ("${messageObj.roomname}");`, function(err, results) {
          db.dbConnection.query(`INSERT INTO Messages (text, room_id, user_id) SELECT "${messageObj.text}", r.id, (SELECT u.id FROM Users u WHERE u.username = "${messageObj.username}") FROM Rooms r WHERE r.roomname = "${messageObj.roomname}";`, function(err, results) {
            callback(results);
          });
        });
      });
    }
  },

  users: {
    get: function (callback) {
      db.dbConnection.query('SELECT username from Users;', function(err, results) {
        if (err) {
          throw err;
        } else {
          callback(results);
        }
      });
    },
    post: function (messageObj, callback) {
      db.dbConnection.query(`INSERT IGNORE INTO Users (username) values ("${messageObj.username}");`, function(err, results) {
        callback(results);
      });
    }
  }
};

