const router = require('express').Router();

router.post('/register', (req, res) => {
    // console.log(io);
    req.io.emit('notification', 'Hi Berhasil Login');
    res.status(200).json({
      status: 'ok',
      message: `Berhasil Register! silahkan cek email 
      untuk verifikasi`,
    })
})

module.exports = router;