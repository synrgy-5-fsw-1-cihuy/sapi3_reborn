const express = require('express');
const router = express.Router();
const formidableMiddleware = require('formidable');
const model = require('../models/index.js');
const Post = model.post;

// Create
router.post('/api/posts', (request, response) => {
    const form = formidableMiddleware({ });

    form.parse(request, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        Post.create(fields).then(result => {
            response.status(201).json({
                message: "Created post successfully",
                payload: fields
            });
        })

    })
});

module.exports = router;