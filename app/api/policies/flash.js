module.exports = (req, res, next) => {

    res.locals.flash = {}

    if(!req.session.flash) return next()

    res.locals.flash = _.clone(req.session.flash)

    // Clear flash
    req.session.flash = {}

    next()
}