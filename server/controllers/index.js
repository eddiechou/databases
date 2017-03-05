var models = require('../models');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

var collectData = function(request, callback) {
  var data = '';
  // COMMENT IF BLOCK TO MAKE APP RUN PROPERLY
  // if (request.body !== null) {
  //   callback(request.body);
  // } 
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results) {
        res.writeHead(200, exports.headers);
        res.end(JSON.stringify(results));
      });
    }, 
    post: function (req, res) {
      collectData(req, function(message) { 
        models.messages.post(message, function() {
          res.writeHead(201, exports.headers);
          res.end();
        });
      
      });
    }
  },

  users: {
    get: function (req, res) {
      models.users.get(function(results) {
        res.writeHead(200, exports.headers);
        res.end(JSON.stringify(results));
      });
    },
    post: function (req, res) {
      collectData(req, function(message) {
        models.users.post(message, function() {
          res.writeHead(201, exports.headers);
          res.end();
        });
      });
    }
  }
};

