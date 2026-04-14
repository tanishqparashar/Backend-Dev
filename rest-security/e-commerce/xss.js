import express from 'express';
import mongoose from 'mongoose';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const app = express();
app.use(express.json());

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  comment:   { type: String, required: true, maxlength: 1000 },
  author:    { type: String, required: true, maxlength: 50 },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

app.post('/reviews', async (req, res) => {
  try {
    let { productId, comment, author } = req.body;

    if (!productId || !comment || !author) {
      return res.status(400).json({ error: 'All fields required' });
    }

    author = validator.escape(author.substring(0, 50));

    comment = DOMPurify.sanitize(comment, {
      ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href', 'target']
    });

    const review = await Review.create({ productId, comment, author });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });


    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; object-src 'none';"
    );

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default app;