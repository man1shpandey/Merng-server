const gql = require('graphql-tag')

module.exports = gql`

    type Post{
        id: ID!
        title: String!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        saves:[Save]!
        likeCount: Int!
        commentCount: Int!
    }

    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String! 
    }

    type Like{
        id: ID!
        username: String!
        createdAt: String! 
    }

    type Save{
        id: ID!
        username: String!
        createdAt: String! 
    }

    type Follow {
        id: ID!
        username: String!
        createdAt: String!
    }


    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        token: String!
        followers: [Follow]!
        savedPosts: [Post]!
        followCount: Int!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUser(username: String!): User
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(title:String!, body:String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body:String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        followUser(userId: ID!): User!
        savePost(postId: ID!): Post!
    }

`