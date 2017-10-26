const express = require('express');
const router = express.Router();
const data = require("../data");
const aboutmeData = data.aboutme;

router.get("/", (req, res) => {
    let data = aboutmeData.getmyself();
    if(typeof(data)=="object")
    {
         if(data!==null)
            res.json(data);
    }
   else
   {
        // Something went wrong with the server!
        res.status(500).send();
       
   }
});

router.post("/", (req, res) => {
    //Not implemented
        res.status(501).send();
});

module.exports=router;