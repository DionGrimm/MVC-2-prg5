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
  searchList: (req, res) => {
    let searchValue = req.body.searchValue
    Posts.find({
      where: {
        or: [
          {author: searchValue},
          {title: searchValue}
        ]
      }
    }).exec((err, posts) => {
        if (err) {
            res.send(500, {error: 'Database Error'})
        }
        res.view('pages/list', {posts:posts})
    })
  },
  filterList: (req, res) => {
    let searchValue = req.body.name
    Posts.find({
      where: 
          {author: searchValue}
    }).exec((err, posts) => {
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
    let _csrf = req.body._csrf
    let author = req.body.author

    Posts.create({title:title, body:body, _csrf:_csrf, author:author}).exec((err) => {
      if (err) {
        let errorMessage = ["Please fill in the fields correctly"]
        req.session.flash = {
            err: errorMessage
        }
        res.redirect("/posts/add")
      }
      res.redirect('/posts/list')
    })
  },
  delete: (req, res) => {
    Posts.destroy({id:req.params.id}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database Error'})
      }
      res.redirect('/posts/list')
    })
    return false
  },
  edit: (req, res) => {
    Posts.findOne({id:req.params.id}).exec((err, post) => {
      if (err) {
        res.send(500, {error: 'Database Error'})
      }
      res.view('pages/edit', {post:post})
    })
  },
  update: (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let _csrf = req.body._csrf

    Posts.update({id: req.params.id}, {title:title, body:body, _csrf:_csrf}).exec((err) => {
      if (err) {
        let errorMessage = ["Please fill in the fields correctly"]
        req.session.flash = {
            err: errorMessage
        }
        res.redirect("/posts/edit/"+req.params.id)
      }
      res.redirect('/posts/list')
    })
    return false
  },
  view: (req, res) => {
    Posts.findOne({id:req.params.id}).exec((err, post) => {
      if (err) {
        res.send(500, {error: 'Database Error'})
      }
      if (post.status) {
        res.view('pages/view', {post:post})
      } else {
        res.redirect('/posts/list')
      }
    })
  },
  toggle: (req, res) => {
    let status = req.body.status
    let _csrf = req.body._csrf

    Posts.update({id: req.params.id}, {status:status, _csrf:_csrf}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database Error'})
      }
      res.redirect('/posts/list')
    })
    return false
  },

};

