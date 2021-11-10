let express = require('express');

const router = express.Router();

//Start Routing Requests
router.route('/').get((req, res, next)=>{
    res.send("Login");
});

module.exports = router;