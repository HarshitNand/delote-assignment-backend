const mongoose = require('mongoose');



const DB =process.env.DATABASE;

// mongoose.set('strictQuery', false);
//connect with data base
mongoose.connect( DB
).then(() => {
  console.log(`connection successfully `);
}).catch((err) => console.log(`no connection`));


// mongodb+srv://harshit:12341234@cluster0.rmgfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0