const express = require("express")
const router = express.Router()
const Post = require("../Models/Post")

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit; // ✅ Fix: define skip

  try {
    const posts = await Post.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();
    const hasMore = skip + posts.length < total;

    res.json({ posts, hasMore });
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});



router.post('/', async (req, res) => {
  const { text, username, image } = req.body;

  try {
    const newPost = new Post({ text, username, image });
    const savedPost = await newPost.save();
    res.status(201).json({success:true,savedPost});
  } catch (err) {
    res.status(500).json({success:false, error: 'Failed to create post' });
  }
});


router.put('/:id/like', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
});

module.exports = router;