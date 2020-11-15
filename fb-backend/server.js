import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';

import mongoPosts from './models/postModel.js';

Grid.mongo = mongoose.mongo;


//app config 
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(cors());


// db config
const mongoUrl ="<mongourl>"


const connection = mongoose.createConnection(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let gfs;

connection.once('open', () => {
    console.log('DB Connected')

    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('images');
})

const storage = new GridFsStorage({
    url: mongoUrl,
    file: (req,file) => {
        return new Promise((resolve,reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
        
            const fileInfo = {
                filename:filename,
                bucketName: 'images'
            };

        resolve(fileInfo);
        })
    }
})

const upload = multer({storage})

mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
})

//api routes
app.get('/',(req,res) => {
    res.status(200);
    res.send('It is working');
})

app.post('/upload/image', upload.single('file'), (req,res) => {
    res.status(201);
    res.send(req.file);
})

app.post('/upload/post',(req,res) => {
    const dbPost = req.body;

    mongoPosts.create(dbPost, (err,data) => {
        if(err) {
            res.status(500);
            res.send(err)
        } else {
            res.status(201)
            res.send(data)
        }
        
    })
})

app.get('/retrieve/posts',(req,res) => {
    mongoPosts.find((err, data) => {
        if(err) {
            res.status(500),
            res.send(err);
        } else {
            data.sort((b,a) => {
                return a.timestamp -b.timestamp
            })

            res.status(200);
            res.send(data);
        }
    })
})

app.get('/retrieve/images/single',(req,res) => {
    gfs.files.findOne({filename : req.query.name},(err,file) => {
        if(err) {
            res.status(500);
            res.send(err);
        } else {
            if(!file || file.length === 0) {
                res.status(404).json({err: 'file not found'})
            } else {
                const readstream = gfs.createReadStream(file.filename)
                readstream.pipe(res)
            }
        }
    })
})


//listen
app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})