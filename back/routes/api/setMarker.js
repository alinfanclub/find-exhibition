// const express = require("express");
// const mongodb = require("mongodb");
// const multer = require("multer");
// const checkAuth = require("../../middleware/checkAuth");

// const router = express.Router();
// const Posts = require("../../model/post");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./../front/src/assets/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   //reject a file
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

// // // get post
// // router.get("/", async (req, res) => {
// //   const post = await loadPostCollection();
// //   res.send(await post.find({}).toArray());
// // });

// // // add post
// // router.post("/", upload.single("postImage"), async (req, res, next) => {
// //   const post = await loadPostCollection();
// //   console.log(req.file);
// //   await post.insertOne({
// //     place_name: req.body.place_name,
// //     lat: req.body.lat,
// //     lng: req.body.lng,
// //     contents: req.body.contents,
// //     createAt: new Date().toLocaleString(),
// //     link: req.file,
// //     postImage: req.file.originalname,
// //   });
// //   res.status(201).send();
// // });

// // // delete post
// // router.delete("/delete/:id", async (req, res) => {
// //   try {
// //     const post = await loadPostCollection();
// //     await post.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
// //     res.status(200).send();
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });

// // // edit post

// // router.post(
// //   "/edit/:id",
// //   upload.single("postImage"),

// //   async (req, res) => {
// //     try {
// //       const post = await loadPostCollection();
// //       console.log(req.file);
// //       console.log(req.body);
// //       await post.updateOne(
// //         { _id: new mongodb.ObjectId(req.body.id) },
// //         {
// //           $set: {
// //             place_name: req.body.place_name,
// //             contents: req.body.contents,
// //             date: req.body.date,
// //             createAt: new Date().toLocaleString(),
// //             postImage: req.file.originalname,
// //             fix: true,
// //           },
// //         }
// //       );
// //       res.status(201).send();
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// // );

// // async function loadPostCollection() {
// //   const client = await mongodb.MongoClient.connect(
// //     "mongodb+srv://e759ksh:tkgl5012qq21@cluster0.bgjpc.mongodb.net/?retryWrites=true&w=majority",
// //     {
// //       useNewUrlParser: true,
// //     }
// //   );

// //   return client.db("Map").collection("spaceData");
// // }

// router.post("/", async (req, res) => {
//   try {
//     const doc = await PostModel.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });
//     res.status(201).json({ data: doc });
//   } catch (error) {
//     console.log(error);
//     if (error.code === 11000) {
//       return res.status(400).send({ message: "Duplicated Data", error });
//     }
//     res.status(400).send({ message: "sth wrong", error });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const docs = await PostModel.find({
//       createdBy: req.user._id,
//     })
//       .lean()
//       .exec();

//     res.status(200).json({
//       posts: docs,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "sth wrong", error });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const doc = await PostModel.findOne({
//       createdBy: req.user._id,
//       _id: req.params.id,
//     })
//       .lean()
//       .exec();

//     if (!doc) {
//       return res.status(400).json({ message: "The data is not found" });
//     }

//     res.status(200).json({ ...doc });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "sth wrong", error });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedDoc = await PostModel.findOneAndUpdate(
//       {
//         createdBy: req.user._id,
//         _id: req.params.id,
//       },
//       req.body,
//       { new: true }
//     )
//       .lean()
//       .exec();

//     if (!updatedDoc) {
//       return res.status(400).json({ message: "cannot update the data" });
//     }

//     res.status(200).json({ ...updatedDoc });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "sth wrong", error });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const removed = await PostModel.findOneAndRemove({
//       createdBy: req.user._id,
//       _id: req.params.id,
//     })
//       .lean()
//       .exec();

//     if (!removed) {
//       return res.status(400).json({ message: "cannot remove the data" });
//     }

//     return res.status(200).json({ ...removed });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "sth wrong", error });
//   }
// });

// module.exports = router;

// libs
const { Router } = require("express");
// modules
const { Posts } = require("../../model/post");

// router init
const router = Router();

router.post("/", async (req, res) => {
  try {
    const doc = await Posts.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({ message: "Duplicated Data", error });
    }
    res.status(400).send({ message: "sth wrong", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const docs = await Posts.find({
      createdBy: req.user._id,
    })
      .lean()
      .exec();

    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doc = await Posts.findOne({
      createdBy: req.user._id,
      _id: req.params.id,
    })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).json({ message: "The data is not found" });
    }

    res.status(200).json({ ...doc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedDoc = await Posts.findOneAndUpdate(
      {
        createdBy: req.user._id,
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).json({ message: "cannot update the data" });
    }

    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Posts.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    })
      .lean()
      .exec();

    if (!removed) {
      return res.status(400).json({ message: "cannot remove the data" });
    }

    return res.status(200).json({ ...removed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "sth wrong", error });
  }
});

module.exports = router;
