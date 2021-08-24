const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    followers: [
        {
            username: String,
            createdAt: String,
        }
    ],

    savedPosts: [
        {
            body: String,
            username: String,
            createdAt: String,
            comments: [
                {
                    body: String,
                    username: String,
                    createdAt: String,
                }
            ],
            likes: [
                {
                    username: String,
                    createdAt: String,
                }
            ]
        }
    ]
})

module.exports = model('User', userSchema)
