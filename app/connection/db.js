const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin:admin@cluster0.fzdi6.mongodb.net/battery-status?retryWrites=true&w=majority", {
    useNewUrlParser: false,
    useUnifiedTopology: false
}, err => err ? console.log(err) : console.log('Connected to database'));