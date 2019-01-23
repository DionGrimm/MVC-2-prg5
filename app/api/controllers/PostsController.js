/**
 * PostsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Posts.find({}).exec((err, posts) => {
        if (err) {
            res.send(500, {error: 'Database Error'})
        }
        res.view('pages/list', {posts:posts})
    })
  }

};

