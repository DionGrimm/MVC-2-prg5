module.exports = (req, res, ok) => {

    if(req.session.authenticated) {
        return ok()
    } else {
        res.redirect("/session/login");
        return
    }
}