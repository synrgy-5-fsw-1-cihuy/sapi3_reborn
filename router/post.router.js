const express = require("express");
const router = express.Router();
const formidableMiddleware = require("formidable");
const authMiddlware = require("../middleware/auth_token.js");
const models = require("../models");
const Post = models.Post;

// router.use(authMiddlware);

/**
 * @swagger
 *  components:
 *   schemas:
 *     Post:
 *      type: object
 *      required:
 *        - id
 *        - title
 *        - description
 *      properties:
 *        id:
 *          type: integer
 *          description: The generated ID's Post model
 *        title:
 *          type: string
 *          description: The title your post
 *        description:
 *          type: string
 *          description: The description your post
 *        createdAt:
 *          type: timestamp
 *          description: The Created data date
 */

/**
 * @swagger
 *   /posts/:
 *      get:
 *        summary: Get all posts
 *        tags: [Posts]
 *        responses:
 *          "200":
 *            description: Retrieve all posts
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 */

// All
router.get("/api/posts", (request, response) => {
  Post.findAll()
    .then((result) => {
      response.status(200).json({ data: result });
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
});

/**
 * @swagger
 *   /posts/{id}:
 *      get:
 *        summary: Get posts by id
 *        tags: [Posts]
 *        parameters:
 *          - in: path
 *            name: id
 *        responses:
 *          "200":
 *            description: Retrieve posts by id
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 */

// Get By ID
router.get("/api/posts/:id", (request, response) => {
  Post.findByPk(request.params.id)
    .then((result) => {
      if (result == null) {
        response.status(404).json({ data: {} });
        return;
      }
      response.status(200).json({ data: result });
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
});

/**
 * @swagger
 *   /posts/{id}:
 *      post:
 *        summary: Create a new post (file)
 *        tags: [Posts]
 *        requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      username:
 *                          type: string
 *        responses:
 *          "201":
 *            description: Created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Post'
 */

// Create
router.post("/api/posts", (request, response) => {
  const form = formidableMiddleware({});

  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    Post.create(fields).then((result) => {
      response.status(201).json({
        message: "Created post successfully",
        payload: fields,
      });
    });
  });
});

// Update
router.put("/api/posts/:id", (request, response) => {
  const form = formidableMiddleware({});

  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    Post.findByPk(request.params.id)
      .then((result) => {
        if (result == null) {
          response.status(404).json({ data: {} });
          return;
        }

        Post.update(fields, { where: { id: request.params.id } })
          .then((result) => {
            response.status(200).json({ data: result });
          })
          .catch((err) => {
            console.error(err);
            throw err;
          });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  });
});

/**
 * @swagger
 *  /posts/{id}:
 *    delete:
 *      summary: Delete Data by Id
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id data
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        204:
 *          description: success delete data
 *        404:
 *          description: data not found
 *        500:
 *          description: server error
 *
 */

// Delete
router.delete("/api/posts/:id", (request, response) => {
  console.log(request.params.id);
  console.log("tes");
  Post.findByPk(request.params.id)
    .then((result) => {
      if (result == null) {
        response.status(404).json({
          message: "data not found",
          data: null,
        });
        return;
      }

      Post.destroy({ where: { id: request.params.id } }).then((result) => {
        response.status(204).json({
          message: "success delete data",
          data: result,
        });
      });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({
        message: "server error",
        data: null,
      });
    });
});

module.exports = router;
