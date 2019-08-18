const admin = (req, res, next) => {
    try {
        const isAdmin = req.user.admin

        if(!isAdmin) {
            throw new Error()
        }

        console.log('Admin Access');

        next()

    } catch (e) {
        res.status(401).send({ error: 'Operation is forbidden!' })
    }
}

module.exports = admin