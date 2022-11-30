const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");

/**
 * @swagger
 *  components:
 *   schemas:
 *     User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: integer
 *          description: The generated ID's Post model
 *        email:
 *          type: string
 *          description: The email your post
 *        password:
 *          type: string
 *          description: The password your post
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: The Created data date
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: The Created data date
 */

/**
 * @swagger
 *   /api/auth/register:
 *      post:
 *        summary: Create a new user
 *        tags: [Users]
 *        parameters:
 *         - in: body
 *           name: user
 *           description: The user to create.
 *           schema:
 *            type: object
 *            required:
 *             - email
 *             - password
 *            properties:
 *             email:
 *              type: string
 *             password:
 *              type: string
 *        responses:
 *          "201":
 *            description: Retrieve all posts
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */

router.post("/api/auth/register", userController.registerUser);

/**
 * @swagger
 *   /api/auth/login:
 *      post:
 *        summary: Login a user
 *        tags: [Users]
 *        parameters:
 *        - in: body
 *          name: user
 *          description: The user to login.
 *          schema:
 *           type: object
 *           required:
 *            - email
 *            - password
 *           properties:
 *            email:
 *             type: string
 *            password:
 *             type: string
 *        responses:
 *          "200":
 *            description: Retrieve all posts
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
router.post("/api/auth/login", userController.loginHandler);

module.exports = router;
