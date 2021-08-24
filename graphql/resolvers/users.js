const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const{ UserInputError } = require('apollo-server')

const User = require('../../models/User')
const {SECRET_KEY} = require('../../config')
const {validateRegisterInput, validateLoginInput} = require('../../util/validators')

function generateToken(user){
    return jwt.sign(
        {
        id: user.id,
        email: user.email,
        username: user.username
        }, 
        SECRET_KEY, 
        {expiresIn: '1h'}
    ) 
}

module.exports = {

    Query: {
        async getUser(_, {username}){
            try{
                const user = await User.findOne({username})

                if(user) {
                    return user
                }

                else{
                    throw new UserInputError('User not found')
                }
    
            }
            catch(err) {
                throw new Error(err)
            }
        }
    },
    
    Mutation: {

        async login( _, { username, password }){
            const {errors, valid} = validateLoginInput( username, password )

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.findOne({ username })
            if (!user){
                errors.general = 'User not found'
                throw new UserInputError('Wrong credentials', { errors })
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = 'Password doesnt match'
                throw new UserInputError('Wrong credentials', { errors })
            }

            const token = generateToken(user) 
            return{
                ...user._doc,
                id: user._id,
                token
            }
        },


       async register(
           _,
           {
               registerInput: {username, email, password, confirmPassword}
            }
        ){

           //TODO: validate userdata
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', { errors })
            }
           //      make sure user doesnt already exists

            const user = await User.findOne({ username })
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'this username is taken'
                    }
                })
            }


           //      hash the password and create an auth token

           password = await bcrypt.hash(password, 12)

           const newUser = new User({
               email,
               username,
               password,
               createdAt: new Date().toISOString(),
           })

        const res = await newUser.save()

        const token = generateToken(res)
        return{
            ...res._doc,
            id: res._id,
            token
        }
    },

   
}
}