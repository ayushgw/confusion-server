const express = require('express');
const router = new express.Router();

router.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the promos to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT method not supported on /promos');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the promos!');
    });

router.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of the promo: ' + req.params.promoId);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promos/ ' + req.params.promoId);
    })
    .put((req, res, next) => {
        res.write('Updating the promo: ' + req.params.promoId);
        res.end('Will update the promo: ' + req.body.name + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting promo: ' + req.params.promoId);
    });


module.exports = router;