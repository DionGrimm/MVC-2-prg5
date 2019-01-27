/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: (req, res) => {
        res.view("pages/login")
    },
    create: (req, res, next) => {
        // If fields were empty
        if (!req.body.username || !req.body.password) {
            let errorMessage = ["Please fill in the fields correctly"]
            req.session.flash = {
                err: errorMessage
            }
            res.redirect("/session/login");
            return
        }

        // Find user
        User.findOne({name:req.body.username}).exec((err, user) => {
            if(err) return next(err)

            if(!user) {
                let errorMessage = ["Please check your username"]
                req.session.flash = {
                    err: errorMessage
                }
                res.redirect("/session/login");
                return
            }
            
            if(user.password == req.body.password) {

                req.session.authenticated = true
                req.session.User = user
                req.session.admin = user.admin

                res.redirect("/user/profile/"+user.id)


            } else {
                let errorMessage = ["User was found but password was incorrect"]
                req.session.flash = {
                    err: errorMessage
                }
                res.redirect("/session/login");
                return
            }
        }
    )},
    destroy: (req, res) => {
        req.session.destroy(res.redirect("/session/login"))
    },
};

