/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    signup: (req, res) => {
        res.view("pages/signup")
    },
    list: (req, res) => {
        User.find({}).exec((err, users) => {
            if(err){
                res.send(500, {error: 'Database Error'})
            }
            users.forEach((user) => {
                Posts.find({author: user.name}).exec((err, posts) => {
                    if(err){
                        res.send(500, {error: 'Database Error'})
                    }
                    user.posts = posts.length
                    sails.log(user.posts)
                })
                sails.log(user.posts)
            })
            res.view("pages/users", {users:users})
        })
    },
    delete: (req, res) => {
        User.destroy({id:req.params.id}).exec((err) => {
            if(err){
                res.send(500, {error: 'Database Error'})
            }
            res.redirect("/user/list")
        });

        return false;
    },
    profile: (req,res) => {
        User.findOne({id:req.params.id}).exec((err, user) => {
            if(err){
                res.send(500, {error: 'Database Error'})
            }

            res.view("pages/profile", {user:user})
        });
    },
    create: (req,res) => {
        let name = req.body.username
        let password = req.body.password
        let _csrf = req.body._csrf

        User.create({name:name, password:password, _csrf:_csrf}).exec((err) => {
            if(err){
                let errorMessage = ["Please fill in the fields correctly"]
                req.session.flash = {
                    err: errorMessage
                }
                return res.redirect("/user/signup")
            }
            res.redirect("/")
        });
    },
    update: (req, res) => {
        let _csrf = req.body._csrf
        
        User.update({id: req.params.id}, {admin:true, _csrf:_csrf}).exec((err) => {
          if (err) {
            res.send(500, {error: 'Database Error'})
          }
          res.redirect('/session/destroy')
        })
        return false
      },

};

