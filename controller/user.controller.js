const formidableMiddleware = require('formidable');
const bcrypt = require('bcrypt');
const jwtTokenUtil = require('../util/jwt_util.js');
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


const loginHandler = async (request, response) => {
    const form = formidableMiddleware({ });

    form.parse(request, async (err, fields, files) => {
        if (err) {
            next(err);
            
            return;
        };

        try {
            const email = fields.email;

            const userByEmail = await User.findOne(
                { where: {email: email} }
            ); 

            if (userByEmail == null) {
                response.status(401).json({
                    error: "User account not found. Please register first"
                });
                return;
            };

            const checkAccountPassword = await bcrypt.compare(fields.password, userByEmail.password);

            if (checkAccountPassword == false) {
                response.status(401).json({error: "Email or password incorrect. Please check your spelling"});
                return;
            };

            const tokenGenerated = jwtTokenUtil.encodeTokenJwt({
                id: userByEmail.id,
                email: userByEmail.email
            });

            response.status(200).json({
                message: "Logged successfully",
                token: tokenGenerated
            });

            return;
        } catch(err) {
            response.status(422).json({error: "Error logged user"});
            throw err;
        };

    });
}; 

module.exports = { registerUser, loginHandler };
