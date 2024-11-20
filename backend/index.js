const express = require('express');
const productRoutes = require('./routes/Products.js');
const path = require('path');
const dotenv =require('dotenv').config();
const cors = require('cors');
const mongoose= require('mongoose');
const cookieParser= require('cookie-parser')
const wishlistRoutes = require('./routes/wishlistRoute');
const cartRoutes = require('./routes/cartRoute');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname,  'public', 'images')));
app.use('/products', productRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('mongo db connected'))
.catch((err)=> console.log(err))


app.use(cors({
    origin: 'http://localhost:5173',  // Allow this origin only
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    credentials: true,  // Allow credentials (cookies, headers, etc.)
  }));
app.use('/', require('./routes/authRoute'))

app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);

const PORT = 8000;
app.listen(PORT,()=>{
    console.log("server is runing");
})


