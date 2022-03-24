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


app.post('/api/verify', takeToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, data) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'User access granted',
                data
            })
        }
    })
}) 

//middleware to get the token from request headers
// Authorization: Bearer token
function takeToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}





app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Server running on port: ${port}`)
})