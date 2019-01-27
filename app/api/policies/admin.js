module.exports = (req,res,ok) => {
    if(req.session.User && req.session.User.admin) {
        return ok()
    } else {
        res.redirect("/session/login");
        return
    }
} 