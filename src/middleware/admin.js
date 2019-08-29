const chalk = require('chalk');

const admin = (req, res, next) => {
    try {
        const isAdmin = req.user.superuser

        if(!isAdmin) {
            throw new Error()
        }

        // console.log(chalk.black.bgYellow.bold('ADMIN OPERATION'));

        next()

    } catch (e) {
        res.status(401).send({ error: 'Operation is forbidden!' })
    }
}

module.exports = admin