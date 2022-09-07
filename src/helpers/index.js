const fetch = require('node-fetch')

module.exports = {
  async putCommentsInPosts (data) {
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
  },

  async validateEmail (email) {
    const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_VALIDATION_KEY}&email=${email}`);
    const body = await res.json();
    const { is_valid_format } = body
  
    return is_valid_format.value
  }
}
