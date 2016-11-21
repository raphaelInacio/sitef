
'use strict'
const logger = require('log4js').getLogger()
const Sitef = require('../model/sitef').Sitef
const CliSitef = require('../model/sitef').CliSitef
const MessagesUtil = require('../utils/messagesUtil')
const filterInt = require('../utils/util').filterInt

const SitefServices = {
    inicia: (req, cb) => {
        logger.info(`${new Date().toJSON().slice(0, 23)} inicio iniciaFuncaoSitefinterativo `)
        try {
            let inicia =
                Sitef.iniciafSitefInterativo(req.modalidade, req.cupomFiscal)
            let status = CliSitef.IniciaFuncaoSiTefInterativo(
                inicia.modalidade,
                inicia.valor,
                inicia.numeroCuponFiscal,
                inicia.dataFiscal,
                inicia.horario,
                inicia.operaror,
                inicia.restricoes)
            if (status === 10000) {
                global.sitefIterativo = require('../utils/factory/sitefFactory').create
            }
            cb(null, MessagesUtil.getMessagesUtil('msgIniciaFuncaoSiTefInterativo', status))
        } catch (ex) {
            cb(ex)
        } finally {
            logger.info(`${new Date().toJSON().slice(0, 23)} fim iniciaFuncaoSitefinterativo `)
        }
    },
    configura: (req, cb) => {
        logger.info(`${new Date().toJSON().slice(0, 23)} inicio configuraFuncaoSitefInterativo `)
        try {
            let status =
                CliSitef.ConfiguraIntSiTefInterativo(
                    Sitef.configfSitefInterativo.ipSiTef,
                    Sitef.configfSitefInterativo.idLoja,
                    Sitef.configfSitefInterativo.idTerminal,
                    Sitef.configfSitefInterativo.reservado
                )
            if (status === 0) {
                logger.info(`${new Date().toJSON().slice(0, 23)} Serviço inicializado com sucesso`)
            }
            cb(null, MessagesUtil.getMessagesUtil('msgConfiguraFuncaoSitefInterativo', status))
        } catch (ex) {
            logger.info(`${new Date().toJSON().slice(0, 23)} Erro ao configura a lib sitef `)
            cb(ex)
        } finally {
            logger.info(`${new Date().toJSON().slice(0, 23)} fim configuraFuncaoSitefInterativo `)
        }
    },
    continua: (req, cb) => {
        logger.info(`${new Date().toJSON().slice(0, 23)} inicio continuaFuncaoSitefIterativo `)
        try {
            if (req.params.id_comando) {
                let comando = filterInt(req.params.comando)
                executarFluxoSitefInterrativo(null, comando, cb)
            } if (req.body.buffer) {
                let buffer = req.body.buffer
                let comando = filterInt(req.body.comando)
                executarFluxoSitefInterrativo(buffer, comando, cb)
            }
        } catch (error) {
            logger.info(`${new Date().toJSON().slice(0, 23)} 
            erro ao executar continuaFuncaoSitefIterativo ${error} `)
            cb(error)
        }

    }
}

const finalizaFuncaoSiTefInterativo = () => {
    logger.info(`${new Date().toJSON().slice(0, 23)} inicio finalizaFuncaoSiTefInterativo `)
    try {
        const status = CliSitef.FinalizaFuncaoSiTefInterativo(
            Sitef.finalizaFuncaoSiTefInterativo.confirma,
            Sitef.finalizaFuncaoSiTefInterativo.numeroCuponFiscal,
            Sitef.finalizaFuncaoSiTefInterativo.dataFiscal,
            Sitef.finalizaFuncaoSiTefInterativo.horaFiscal,
            Sitef.finalizaFuncaoSiTefInterativo.parametrosAdicionais)
        return status
    } catch (error) {
        logger.info(`${new Date().toJSON().slice(0, 23)} 
    erro ao finalizar finalizaFuncaoSiTefInterativo `)
    }
}

function executarFluxoSitefInterrativo(buffer, comando, cb) {
    let status = 10000
    let continua = true
    try {
        while (continua) {
            if (buffer) {
                continua = executarRotinaSitef(buffer, comando)
                buffer = ''
            }

            status = CliSitef.ContinuaFuncaoSiTefInterativo(
                global.sitefIterativo.getComando(),
                global.sitefIterativo.getTipoCampo(),
                global.sitefIterativo.getTamanhoMinimo(),
                global.sitefIterativo.getTamanhoMaximo(),
                global.sitefIterativo.getBuffer(),
                global.sitefIterativo.getTamanhoBuffer(),
                0)

            logger.info(`${new Date().toJSON().slice(0, 23)} 
        Saida função sitef iterativo `, global.sitefIterativo.getJSON())

            if (status === 10000) {
                //-comando que indica que o fluxo deve ser finalizado
                if (comando === -10000) {
                    executarFluxoFinalizacaoSitef()
                } else
                    if (comando === global.sitefIterativo.readComando()) {
                        continua = executarRotinaSitef(buffer, comando)
                    }
            } else if (status === 0) {
                if (verificarImpressaoCupomSitef()) {
                    finalizaFuncaoSiTefInterativo()
                    break
                }
            } else {
                finalizaFuncaoSiTefInterativo()
                break
            }
        }
        if (comando === -10000) {
            cb(null, finalizacaoSitef)
        } else {
            cb(null, global.sitefIterativo.getJSON())
        }
    } catch (error) {
        cb(error)
    }
}

const executarFluxoFinalizacaoSitef = () => {
    let tipoCampo = global.sitefIterativo.readTipoCampo()
    let buffer = global.sitefIterativo.readBuffer()
    let obj = {
        'tipoCampo': tipoCampo,
        'buffer': buffer
    }

    finalizacaoSitef.push(obj)

    switch (tipoCampo) {
        case 121:
            registrarImpressaoCupomSitef()
            break
        case 122:
            registrarImpressaoCupomSitef()
            break
        default:
            break
    }
}

const verificarImpressaoCupomSitef = () => {
    return cupomSitefFoiImpresso
}

const registrarImpressaoCupomSitef = () => {
    logger.info(`${new Date().toJSON().slice(0, 23)} 
    Impressão 2 via comprovante `, global.sitefIterativo.readBuffer())
    cupomSitefFoiImpresso = true
}

const executarRotinaSitef = (buffer, comando) => {
    let continua = true
    switch (comando) {
        case 0:
            continua = false
            break
        case 1:
            continua = false
            break
        case 2:
            continua = false
            break
        case 3:
            continua = false
            break
        case 21:
            continua = false
            if (buffer) {
                inserirDadosSitef(buffer, comando)
            }
            break
        case 23:
            continua = coletaDadosPinPad()
            break
        case 30:
            continua = false
            if (buffer) {
                inserirDadosSitef(buffer, comando)
                CliSitef.LeSimNaoPinPad('Confirme para continuar')
            }
            break
        default:
            break
    }
    return continua
}

const inserirDadosSitef = (buffer, comando) => {
    global.sitefIterativo.setBuffer(buffer)
    global.sitefIterativo.setComando(comando)
}

module.exports = SitefServices