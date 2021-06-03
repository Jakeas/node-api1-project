// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()
server.use(express.json())

//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                      

server.post('/api/users', (req, res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({message: "please provide name and bio for the user"})
    }else{
        Users.insert(newUser)
            .then(createdUser => res.status(201).json(
                {message: createdUser}
            ))
            .catch(err => res.status(500).json({message: "There was an error while saving the use to the database"}
            ))
    }
})

//| GET    | /api/users     | Returns an array users.                   

server.get('/api/users', (req, res) =>{
    Users.find()
        .then(userArr => res.status(200).json({message: userArr}))
        .catch(err => res.status(500).json({message: "The users information could not be retrieved"}))
})

//| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                  
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    Users.findById(id)
        .then(foundUser => {
            if(foundUser){
                res.status(200).json({message: foundUser})
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
        })
        .catch(err=>{
            res.status(500).json({message:"The user information could not be retrieved"})
        })
})

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                         

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    Users.remove(id)
    .then(deletedUser => {
        if(deletedUser){
            res.status(200).json({message:deletedUser})
        } else {
            res.status(404).json({message:"The user with the specified ID does not exist"})
        }
    })
    .catch(err => res.status(500).json({message: "The user could not be removed"}
    ))
})




// PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user

server.put("/api/users/:id",(req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(400).json({message:"Please provide name and bio for the user"})
            Users.update(id, changes)
        }else{
            res.status(200).json({message:changes})
        }
    }catch(err){
        res.status(500).json({message: "The user information could not be modified"})
    }
})
                
        

module.exports = server; // EXPORT YOUR SERVER instead of {}
