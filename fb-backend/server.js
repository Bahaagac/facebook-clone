import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';

Grid.mongo = mongoose.mongo;


//app config 
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(cors());

//api routes
app.get('/',(req,res) => {
    res.status(200);
    res.send('It is working');
})

//listen
app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})