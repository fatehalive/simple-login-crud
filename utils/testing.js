const testController = (req, res, next) => {
    const tangkap = req.path;
    console.log(tangkap);
    res.send(`Your request is ${req.method} ${tangkap}\n`);
}

module.exports = {
    testController
};