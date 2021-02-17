const {Router} = require('express')
const router = Router()

router.get('/', (req,res) => res.send('HOLA MUNDO'));


module.exports = router;