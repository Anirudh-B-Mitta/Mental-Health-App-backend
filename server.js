const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const ChatHistory = require('./models/chatHistory')
const bodyParser = require('body-parser');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/users', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post("/login", (req,res) => {
    const {username, password} = req.body;
    User.findOne({username: username})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } 
            else {
                res.json("Username or password is incorrect")
            }
        }
        else {
            res.json("Username or password is incorrect")
        }
    })
})

app.post('/api/data', async (req, res) => {
    const receivedData = req.body;
    console.log('Data received successsfully!');

    try {
        const ch = await ChatHistory.create(receivedData)
        res.status(200).ch;
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        return
    }
    res.send('Data received!');
    return
});  

app.post("/chat", async (req,res) => {
    const str = req.body
    console.log(str)
    try {
        const chat = await ChatHistory.find({});
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// app.post("/chat", (req,res) => {
//     const {id} = req.body;
//     ChatHistory.findOne({username: username})
//     .then(chat => {
//         if(chat) {
//             try {
//                 res.status(200).json(chat);
//             } catch (error) {
//                 res.status(500).json({message: error.message})
//             }
//         }
//     })
// })

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://dds72446:Dds123!!mongodb@cluster0.jes5yfo.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})
