const { UserInputError } = require('apollo-server')
const checkAuth = require('../../util/check-auth')
const User = require('../../models/User')

module.exports = {

    Mutation: {

        async followUser(_, { userId }, context){
            const {username} = checkAuth(context)
            
            const user = await User.findById(userId)

            if(user){

                if(user.followers.find(follow => follow.username === username)){

                    //already liked unlike it
                    //this filter updates likes to everybody except the one username 

                    user.followers = user.followers.filter(follow => follow.username !== username)
                    await user.save()
                    
                }

                else {
                    //like it for the first time

                    user.followers.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
            await user.save()
            return user

        }else {
            throw new UserInputError('user not found')
        }

        }

    }
}