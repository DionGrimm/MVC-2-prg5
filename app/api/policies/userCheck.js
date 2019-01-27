module.exports = (req,res,ok) => {

    let sessionUserMatchesId = req.session.User.id == req.param("id")

    if(!(sessionUserMatchesId)) {
        res.redirect("/session/login");
        return
    }
    ok()
} 