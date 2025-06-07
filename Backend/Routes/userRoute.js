const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  res.json({
    username: "demoUser",
    avatar: "https://i.pravatar.cc/150?u=demoUser"
  });
});



module.exports = router;
