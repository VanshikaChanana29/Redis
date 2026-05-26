import express from 'express'
import Redis from 'ioredis'


import mongoose from 'mongoose'
const app = express();

const redis = new Redis("redis://localhost:6379") //comes from docker


app.get("/redis" , async (req , res)=>{
    const reply = await redis.ping()
    res.json({message : "redis replied"})
})

app.get("/mongo" , async (req , res)=>{
    const url = ("mongoose://localhost:27017/test")
    // const reply = await redis.ping()
    // res.json({message : "redis replied"})
    if(mongoose.connection.readyState === 0){
        await mongoose.connect(url)
    }
    res.json({mongo : "connected" , database : mongoose.connection.name})
})


app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})


// how to run : npm run dev
