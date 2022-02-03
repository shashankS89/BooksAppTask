const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js")

router.get("/", (req,res) => {
  
    User
      .find()
      .sort("-date")
      .then((users)=>{
          res.status(200).json({ users , message: "success" })
    })
      .catch((err) => {
        console.log(err);
        res.status(422).json({ message: "error" });
    })
});

router.get("/api/:id",(req,res)=>{
    User.findById(req.params.id)
        .then((result)=>{
            const Rid = result.RefferedUser.toString();
            User.updateOne({_id:Rid},{
                $inc:{
                    "TotalEarnings": 10,
                }
            },function(err,res){
                if(err)
                    console.log(err);
                else
                {   User.updateOne({_id:req.params.id},{
                        $set:{
                            "isPaymentMade": true,
                        }
                        },function(err,res1){
                        if(err){
                            res.status(203).json({message:"not updated"});
                        }
                        else{
                            console.log("updated");
                        }
                    })
                }
            })
            res.status(200).json({ message: "Updated" });
        })
        .catch((err)=>{
            res.status(422).json({message:"not updated"});
            console.log(err);
        });
});


module.exports = router;