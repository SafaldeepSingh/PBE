const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose')

const {Question} = require('./Model/Question')
const {Topic} = require('./Model/Topic')
mongoose.connect("mongodb+srv://safaldeepsingh:Safalvalue99@pencilebe.7cfoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err) => {
    if(!err){
        console.log("Mongodb connected")
    }else{
        console.log("error in connection",JSON.stringify(err,undefined,2))
    }
})
//Questions & Annotations
// fs.createReadStream('data.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//         // console.log(row);
//         const newQuestion = new question
//         newQuestion.id = row['Question number']
//         for(let i=1;i<=5;i++){
//             const annotation = row['Annotation '+i]
//             if(annotation!="")
//                 newQuestion.annotations.push(annotation)
//         }
//         newQuestion.save().then(value => {
//             console.log(value)
//         })
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//     });

//Topics
const topicAdded = []
fs.createReadStream('data-topics.csv')
    .pipe(csv())
    .on('data', (row) => {
        // console.log(row);
        //check of topic exist
        const topic1 = row["Topic Level 1"]
        const topic2 = row["Topic Level 2"]
        const topic3 = row["Topic Level 3"]
        addTopic(topic1,["Physics"])
        addTopic(topic2,["Physics", topic1])
        addTopic(topic3,["Physics", topic1, topic2])
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
function addTopic(newTopicName, parents){
    if(newTopicName === "" || topicAdded.indexOf(newTopicName) !== -1)
        return
    topicAdded.push(newTopicName)
    const newTopic = new Topic
    newTopic.name = newTopicName
    newTopic.parents = parents
    newTopic.save().then(value => {
        console.log("Topic Added- "+ newTopicName)
    })
}