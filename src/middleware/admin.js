const chalk = require('chalk');

const admin = (req, res, next) => {
    try {
        const isAdmin = req.user.admin

        if(!isAdmin) {
            throw new Error()
        }

        console.log(chalk.blue.bgRed.bold('Admin Access'));

        next()

    } catch (e) {
        res.status(401).send({ error: 'Operation is forbidden!' })
    }
}

module.exports = admin