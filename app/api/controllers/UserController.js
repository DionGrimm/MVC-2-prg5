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
            res.view("pages/leaderboard", {users:users})
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

};

