const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/user', upload.none(), (req, res) => {
    console.log(req.body);
    return res.send({ msg: 'Holistico'});
});

module.exports = router;