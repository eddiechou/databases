var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/classes/messages', controller.messages.get);

router.post('/classes/messages', controller.messages.post);

router.get('/classes/users', controller.users.get);

router.post('/classes/users', controller.users.post);

// router.post('', controller.messages.post);

module.exports = router;

