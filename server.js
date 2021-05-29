require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const rutasClientes = require('./routes/rutasClientes');
const port = process.env.PORT || 3000;
const path = require('path');


app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
app.use(rutasClientes);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));


mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mikcu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority` , 
{useNewUrlParser: true,
 useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => console.log(err));
mongoose.connection.once('open', () => console.log('Database Connect!'));

app.use(require('./routes/rutasClientes'));

app.listen(port, () => console.log('Server Started!'))  ;