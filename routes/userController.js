const SHA256 = require("crypto-js/sha256");
const mongoose = require('mongoose');
const {user}  = require('./schemas');
const jwt = require('jsonwebtoken');
const {isEmail }  = require('validator');
const {mongooseErrors } = require('./errorhandlers');

const register = async (req,res)=>{

    try{
        
        const name = req.body.name;
        const username= req.body.username;
        const email= req.body.email;
        const password = req.body.password;

        if(!isEmail(email))
            throw "Please enter valid Mail ID";
        if(password.length < 6)
            throw "Password shoud be atleast 6 characters long";
            
        const person = new user({
            name,
            username,
            email,
            password : SHA256( process.env.SALT + password)
            });
            
        
        await person.save(function(err){
            if (err) {

                const message = mongooseErrors(err);
                res.status(400).json({
                    message
                })
            }
            else
            {
                res.json({
                    message : `${username} registered successfully! `
                });
            }
            
        });
        
    }catch(err){
        res.status(422).json({
            message:err
        })
    }
}

const login = async (req,res)=>{ 
    try{  
        const username= req.body.username;
        const password = req.body.password;
        
        const person = await user.findOne({
            username,
            password : String(SHA256(process.env.SALT + password))
        }) 
        if(!person)
            throw " Ivalid username or password";
        const token = jwt.sign({person},process.env.SECRET);        
        res.json({
            message:"user logged in successfully!",
            token 
        })
    }catch(err){
        
        res.json({
            message: err
        })
    }
}

module.exports = {
    login,
    register
}