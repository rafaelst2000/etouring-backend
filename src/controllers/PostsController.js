const connection = require('../database/connection')
const md5 = require('md5');

const putCommentsInPosts = async (data) => {
  const setPosts = new Set();
  data = data.map(post => {
    const filteredPosts = data.filter(p => (p.id === post.id) && post.comment_id)
    const comments = filteredPosts.map(p => { 
      return { description: p.comment_description, id: p.comment_id, user_id: p.comment_user_id }
    })
    return {
      id: post.id,
      description: post.description,
      user_id: post.user_id,
      comments
    }
  })
  const filteredPosts = data.filter((post) => {
    const duplicatedPost = setPosts.has(post.id);
    setPosts.add(post.id);
    return !duplicatedPost;
  });
  return filteredPosts
}

module.exports = {

  async index(request, response) {
    const { page } = request.query
    const [count] = await connection('posts').count()
    
    let posts = []
    if(!page || page == 0) {
      posts = await connection('posts')
      .leftJoin('comments', 'comments.post_id', "=", "posts.id")
      .select(['posts.*', "comments.description as comment_description", "comments.id as comment_id", "comments.user_id as comment_user_id"])
      .then(data => putCommentsInPosts(data))
    } 
    else {
      posts = await connection('posts')
        .leftJoin('comments', 'comments.post_id', "=", "posts.id")
        .limit(5).offset((page - 1) * 5)
        .select(['posts.*', "comments.description as comment_description", "comments.id as comment_id", "comments.user_id as comment_user_id"])
        .then(data => putCommentsInPosts(data))
    }

    response.header('X-Total-Count', count['count(*)'])
    return response.status(200).json(posts)
  },

  async create(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { description } = request.body
    if(!description) return response.status(400).json({ error: 'No description to create post'})

    await connection('posts').insert({ user_id: user.id, description })
  
    return response.status(201).json({ message: "Post has been created" })
  },

  async delete(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { id } = request.params
    const post = await connection('posts')
      .select('*')
      .where({ id })
      .first()
    if(!post) return response.status(400).json({ error: 'No post with this id'})

    if(post.user_id !== user.id) return response.status(403).json({ error: 'This post is not from this user'})

    await connection('posts').where('id', post.id).delete()
    return response.status(200).json({ message: 'Post has been deleted' })
  },

  async update(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { description } = request.body
    if(!description) return response.status(400).json({ error: 'No description to update post'})

    const { id } = request.params
    const post = await connection('posts')
      .select('*')
      .where({ id })
      .first()
    if(!post) return response.status(400).json({ error: 'No post with this id'})

    if(post.user_id !== user.id) return response.status(403).json({ error: 'This post is not from this user'})

    await connection('posts').where('id', post.id).update({ ...post, description })
    return response.status(200).json({ message: 'Post has been updated' })
  },
  
}