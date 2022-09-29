const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const mongoose = require('mongoose');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './../front/src/assets/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
} 

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const router = express.Router();

// get post
router.get('/', async(req, res)=> {
    const post = await loadPostCollection();
    res.send(await post.find({}).toArray());
});

// add post
router.post('/', upload.single('postImage'), async (req, res, next) => {
    const post = await loadPostCollection();
    console.log(req.file);
    await post.insertOne({
        place_name: req.body.place_name,
        lat : req.body.lat,
        lng : req.body.lng,
        contents : req.body.contents,
        createAt: new Date().toLocaleString(),
        link: req.file,
        postImage: req.file.originalname
    });
    res.status(201).send();
})

// delete post
router.delete('/delete/:id', async (req, res) => {
   try {
    const post = await loadPostCollection();
    await post.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
   } catch (error) {
        console.log(error);
   }
})

// edit post

router.post('/edit/:id', upload.single('postImage'),async (req, res) => {
   try {
    const post = await loadPostCollection();
    console.log(req.file);
    console.log(req.body);
    await post.updateOne(
        { _id: new mongodb.ObjectId(req.body.id)},
        {
          $set: {
            place_name: req.body.place_name,
            contents: req.body.contents,
            date: req.body.date,
            createAt: new Date().toLocaleString(),
            postImage: req.file.originalname,
            fix: true,
          }
        }
    );
    res.status(201).send();
   } catch (error) {
    console.log(error);
   }
})

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://e759ksh:tkgl5012qq21@cluster0.bgjpc.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    });

    return client.db('Map').collection('spaceData')
}

module.exports = router;