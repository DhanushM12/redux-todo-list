const express = require('express');
const jwt = require('jsonwebtoken');
const port = 8000;
const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome Everyone!'
    })
})


// generate a token
app.post('/api/sign', (req, res) => {
    const user = {
        id: 1,
        username: 'julybatch',
        email: 'july@cn.com'
    }

    jwt.sign({user}, 'secret', (err, token)=> {
        if(!err){
            res.json({
                token
            })
        }
        else{
            res.json({
                error: err
            })
        }
    })
})


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Server running on port: ${port}`)
})