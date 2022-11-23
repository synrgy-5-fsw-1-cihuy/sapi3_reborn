const formidableMiddleware = require('formidable');
const bcrypt = require('bcrypt');
const models = require('../models');
const User = models.User;
const saltRounds = 10;


const registerUser = async (request, response) => {
    const form = formidableMiddleware({ });

    form.parse(request, async (err, fields, files) => {
        if (err) {
            next(err);
            
            return;
        };

        try {
            // Process hashing plain password
            const hashedPassword = await bcrypt.hash(fields.password, saltRounds);

            const user = await User.create({
                email: fields.email,
                password: hashedPassword
            });

            response.status(201).json({
                message: "Registered successfully", 
                data: {
                    id: user.id,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt

                }
            });
            return;
        } catch(err) {
            response.status(422).json({error: "Error created user"});

            throw err;
        }

    });
};

module.exports = { registerUser };
