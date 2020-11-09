const router = require('express').Router(),
{createUser} = require('../../controllers/users');

router.post('/', createUser);


module.exports = router;