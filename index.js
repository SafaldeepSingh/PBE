const express = require('express')
const app = express()

const {Question} = require('./Model/Question')
const {Topic} = require('./Model/Topic')
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://safaldeepsingh:Safalvalue99@pencilebe.7cfoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err) => {
    if(!err){
        console.log("Mongodb connected")
    }else{
        console.log("error in connection",JSON.stringify(err,undefined,2))
    }
})


app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/search', function (req, res) {
    console.log(req.query.q)
    const topicName = req.query.q
    Topic.findOne({ name: topicName }, (err, doc) => {
        // console.log("error", err)
        // console.log(doc)
        if(doc == null){
            res.json({
                message: "No Topic Find with this Name"
            })
            return
        }
        const parents = doc.parents
        // const topics = [...parents, topicName]
        const topics = [topicName, ...parents]
        // console.log(topics)
        Question.find({annotations: {$in: topics}}, (err, docs) => {
            // console.log("error", err)
            // console.log(docs)
            const questionNumbers = []
            docs.forEach((value, index) => {
                questionNumbers.push(value.id)
            })
            console.log(questionNumbers)
            res.json({
                questions: questionNumbers
            })
        })
    })
})
app.listen(3002)