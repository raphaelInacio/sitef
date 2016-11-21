'use strict'

const utils = require('./../utils/util')
const router = require('express').Router()
const logger = require('log4js').getLogger()
const SitefServices = require('./../services/sitefServices')

router.get('/', (req, res) => {
  logger.info(`${new Date().toJSON().slice(0, 23)} start request ${req.originalUrl}`)
  SitefServices.index((err, data) => {
    try {
        if (err) throw err
        utils.returnJSON(req, res, null, data)
      } catch (ex) {
          logger.error(ex)
          utils.returnJSON(req, res, ex)
        }
  })
  logger.info(`${new Date().toJSON().slice(0, 23)} end request ${req.originalUrl}`)
})

router.post('/inicia', (req, res) => {
  logger.info(`${new Date().toJSON().slice(0, 23)} start request ${req.originalUrl}`)
  SitefServices.inicia(req, (err, data) => {
    try {
        if (err) throw err
        utils.returnJSON(req, res, null, data)
      } catch (ex) {
          logger.error(ex)
          utils.returnJSON(req, res, ex)
        }
  })
  logger.info(`${new Date().toJSON().slice(0, 23)} end request ${req.originalUrl}`)
})

router.get('/configura', (req, res) => {
  logger.info(`${new Date().toJSON().slice(0, 23)} start request ${req.originalUrl}`)
  SitefServices.configura(req, (err, data) => {
    try {
        if (err) throw err
        utils.returnJSON(req, res, null, data)
      } catch (ex) {
          logger.error(ex)
          utils.returnJSON(req, res, ex)
        }
  })
  logger.info(`${new Date().toJSON().slice(0, 23)} end request ${req.originalUrl}`)
})

router.get('/continua/:id_comando', (req, res) => {
  logger.info(`${new Date().toJSON().slice(0, 23)} start request ${req.originalUrl}`)
  SitefServices.continua(req, (err, data) => {
    try {
        if (err) throw err
        utils.returnJSON(req, res, null, data)
      } catch (ex) {
          logger.error(ex)
          utils.returnJSON(req, res, ex)
        }
  })
  logger.info(`${new Date().toJSON().slice(0, 23)} end request ${req.originalUrl}`)
})

router.post('/continua/', (req, res) => {
  logger.info(`${new Date().toJSON().slice(0, 23)} start request ${req.originalUrl}`)
  SitefServices.continua(req, (err, data) => {
    try {
        if (err) throw err
        utils.returnJSON(req, res, null, data)
      } catch (ex) {
          logger.error(ex)
          utils.returnJSON(req, res, ex)
        }
  })
  logger.info(`${new Date().toJSON().slice(0, 23)} end request ${req.originalUrl}`)
})

module.exports = router