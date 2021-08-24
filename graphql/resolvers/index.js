const postsResolvers = require('./posts')
const userResolvers = require('./users')
const commentsResolvers = require('./comments')
const followResolvers = require('./following')
const saveResolvers = require('./saved')

module.exports = {

    Post: {
        likeCount(parent){
            return parent.likes.length;
        },

        commentCount(parent){
            return parent.comments.length;
        },
    },

    User: {
        followCount(parent){
            return parent.followers.length;
        }
    },

    Query: {
        ...postsResolvers.Query,
        ...userResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...followResolvers.Mutation,
        ...saveResolvers.Mutation
    }
}