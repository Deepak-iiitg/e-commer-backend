const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/auth').router;
const cookiesParser = require('cookie-parser');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders').router;
const app  = express();
app.use(cors({
    origin:true
}))
app.use(cookiesParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(router);
app.use(cartRouter.router);
app.use(orderRouter);
app.listen(8080,()=>{
    console.log('server start on port 8080');
})