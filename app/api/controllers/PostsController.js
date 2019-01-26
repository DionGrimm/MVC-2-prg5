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
  },
  add: (req, res) => {
    res.view('pages/add')
  },
  create: (req, res) => {
    let title = req.body.title
    let body = req.body.body

    Posts.create({title:title, body:body}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Datebase Error'})
      }
      res.redirect('/posts/list')
    })
  },
  delete: (req, res) => {
    Posts.destroy({id:req.params.id}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Datebase Error'})
      }
      res.redirect('/posts/list')
    })
    return false
  },
  edit: (req, res) => {
    Posts.findOne({id:req.params.id}).exec((err, post) => {
      if (err) {
        res.send(500, {error: 'Datebase Error'})
      }
      res.view('pages/edit', {post:post})
    })
  },
  update: (req, res) => {
    let title = req.body.title
    let body = req.body.body

    Posts.update({id: req.params.id}, {title:title, body:body}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Datebase Error'})
      }
      res.redirect('/posts/list')
    })
    return false
  }

};

