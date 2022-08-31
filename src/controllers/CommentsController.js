const connection = require('../database/connection')

module.exports = {
  async create(request, response) {
    const { user } = request.loggedUser
    const { post_id, description } = request.body
    const comment_at = new Date().toLocaleString()
    const updated_at = new Date().toLocaleString()

    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    if(!post_id || !description) return response.status(400).json({ error: 'Bad request'})

    const post = await connection('posts').where('id', post_id).select('*').first()
    if (!post) return response.status(400).json({ error: 'No post with this id'})

    await connection('comments').insert({ comment_at, updated_at, description, post_id, user_id: user.id })
    return response.status(201).json({ message: "Comment has been created" })
  },

  async update(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { description } = request.body
    if(!description) return response.status(400).json({ error: 'No description to update comment'})

    const { id } = request.params
    const comment = await connection('comments')
      .select('*')
      .where({ id })
      .first()
    if(!comment) return response.status(400).json({ error: 'No comment with this id'})

    if(comment.user_id !== user.id) return response.status(403).json({ error: 'This comment is not from this user'})

    const updated_at = new Date().toLocaleString()
    await connection('comments').where('id', comment.id).update({ ...comment, description, updated_at })
    return response.status(200).json({ message: 'Comment has been updated' })
  },

  async delete(request, response) {
    const { user } = request.loggedUser
    if(!user && !user.id) return response.status(401).json({ error: 'Not authorized' })

    const { id } = request.params
    const comment = await connection('comments')
      .select('*')
      .where({ id })
      .first()
    if(!comment) return response.status(400).json({ error: 'No comment with this id'})

    if(comment.user_id !== user.id) return response.status(403).json({ error: 'This comment is not from this user'})

    await connection('comments').where('id', comment.id).delete()
    return response.status(200).json({ message: 'Comment has been deleted' })
  },
}