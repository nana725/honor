const express = require("express")
const app = express()

// token
app.set('secret','124u5y0dk5498')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000');
});