const express = require('express');
const router = express.Router();

const Admin = require('../models/adminSchema');

//Admin Regestration 
module.exports = router.post('/signupadmin', async (req, res) =>{
    const {adminName, phone, email, adminPassword, cPassword} = req.body;
        console.log('req.body',req.body )
    if(!adminName || !phone || !email || !adminPassword || !cPassword){
        return res.status(422).json({ error: "Please filled the form properly"})
    }

    try {
            const userExist = await Admin.findOne({ email: email});
            
            if(userExist){
                return res.status(422).json({error: "Admin already exist"})
            }
            else if(adminPassword != cPassword){
                return res.status(422).json({error: "Passwords are not matching"})
            }
            else{
                const admin = new Admin ({adminName, phone, email, adminPassword, cPassword});
    
                await admin.save();

                res.status(201).json({ message: "admin registered successfully"});
            }
    
        } catch (error) {
            console.log(error);
    }
});
