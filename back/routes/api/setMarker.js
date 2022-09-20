const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get post
router.get('/', async(req, res)=> {
    const post = await loadPostCollection();
    res.send(await post.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
    const post = await loadPostCollection();
    await post.insertOne({
        place_name: req.body.place_name,
        lat : req.body.lat,
        lng : req.body.lng,
        contents : req.body.contents,
        createAt: new Date().toLocaleString(),
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

router.post('/edit/:id', async (req, res) => {
   try {
    const post = await loadPostCollection();
    await post.updateOne(
        { _id: new mongodb.ObjectId(req.params.id)},
        {
          $set: {
            text: req.body.text,
            content: req.body.content,
            date: req.body.date,
            createAt: new Date().toLocaleString(),
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
        useNewUrlParser: true
    });

    return client.db('Map').collection('spaceData')
}

module.exports = router;