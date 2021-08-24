const { UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const User = require('../../models/User')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation: {
        async savePost(_, {postId}, context){
            const { username } = checkAuth(context)
            
            const post = await Post.findById(postId)

            if(post){
                if(post.saves.find(save => save.username === username)){
                    //already saved unsave it

                    post.saves = post.saves.filter(save => save.username !== username)
                    await post.save()

                }else{


                    // save it for the first time

                    
                    post.saves.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save()
                return post
            }
            
            else {
                throw new UserInputError('post not found')
            }
        }
    }
}