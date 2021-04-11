const getError = (req, res, next) => {
    console.log(`Oops request ${req.method} ${req.hostname}:3000${req.path} tidak ada\n`);
    res.status(404).render('404');
};

module.exports = getError;