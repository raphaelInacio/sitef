const cliSitef = require('./sitef/src/cliSitef').cliSitef
const sitef = require('./sitef/src/cliSitef').sitef
const REF = require('ref')

var _comando = REF.alloc(REF.types.int)
var _tipoCampo = REF.alloc(REF.types.int, 0);
var _tamMinimo = REF.alloc(REF.types.int, 0);
var _tamMaximo = REF.alloc(REF.types.int, 0);
var _buffer = REF.allocCString('00000000000');
var _tamBuffer = REF.allocCString('2048');
var resBuffer = '';
var resComando = '';
var resTipoCampo = '';
var obj = new sitefFactory()
var status = configuraIntSiTefInterativo()

if (status !== 0) {
} else {
    fluxoSitef()
}

function sitefFactory() {
    const _comando = REF.alloc(REF.types.int)
    const _tipoCampo = REF.alloc(REF.types.int, 0);
    const _tamMinimo = REF.alloc(REF.types.int, 0);
    const _tamMaximo = REF.alloc(REF.types.int, 0);
    const _buffer = REF.allocCString('00000000000');
    const _tamBuffer = REF.allocCString('204');
    var sitef = {
        setComando: function (value) {
            REF.readInt64LE(_comando, value);
        },

        getComando: function () {
            return REF.readInt64LE(_comando, 0)
        },

        setTipoCampo: function (value) {
            REF.readInt64LE(_tipoCampo, value);
        },

        getTipoCampo: function () {
            return REF.readInt64LE(_tipoCampo, 0)
        },

        setTamanhoMinimo: function (value) {
            REF.readInt64LE(_tamMinimo, value);
        },

        getTamanhoMinimo: function () {
            return REF.readInt64LE(_tamMinimo, 0)
        },

        setTamanhoMaximo: function (value) {
            REF.readInt64LE(_tamMaximo, value);
        },
        getTamanhoMaximo: function () {
            return REF.readInt64LE(_tamMaximo, 0)
        },
        setBuffer: function (value) {
            REF.readInt64LE(_buffer, value);
        },
        getBuffer: function () {
            return REF.readInt64LE(_buffer, 0)
        },
        setTamanhoBuffer: function (value) {
            REF.readInt64LE(_tamBuffer, value);
        },

        getTamanhoBuffer: function () {
            return REF.readInt64LE(_tamBuffer, 0)
        },

        print: function () {
            console.log(
                "\n[Buffer", sitef.getBuffer(), "]",
                "\n[Comando", sitef.getComando(), "]",
                "\n[Tipo Campo", sitef.getTipoCampo(), "]",
                "\n[Tamanho Maximo", sitef.getTamanhoMaximo(), "]",
                "\n[Tamanho Minimo", sitef.getTamanhoMinimo(), "]",
                "\n[Tamanho buffer", sitef.getTamanhoBuffer(), "]"
            )
        }
    }

    return sitef
}

function fluxoSitef() {
    let status = iniciaFuncaoSiTefInterativo()
    if (status === 10000) {
        while (true) {
            status = continuaFuncaoSiTefInterativo()
            if (status !== 10000) {
                break;
            }
        }
    }
}

function selecionarOperadora(buffer, comando, tipoCampo, operadora) {
    console.log(
        "Entrada\nBuffer", REF.readCString(buffer, 0),
        "Comando", REF.readInt64LE(comando, 0),
        "Tipo Campo", REF.readInt64LE(tipoCampo, 0))
    REF.writeCString(buffer, 0, '4')
    REF.writeInt64LE(comando, 0, 29)
    console.log(
        "Saida\nBuffer", REF.readCString(buffer, 0),
        "Comando", REF.readInt64LE(comando, 0),
        "Tipo Campo", REF.readInt64LE(tipoCampo, 0))
}

function inserirNumeroCelular(buffer, comando, tipoCampo, numeroCelular) {
    console.log(
        "Entrada\nBuffer", REF.readCString(buffer, 0),
        "Comando", REF.readInt64LE(comando, 0),
        "Tipo Campo", REF.readInt64LE(tipoCampo, 0))
    REF.writeCString(buffer, 0, '11954950529')
    REF.writeInt64LE(comando, 0, 29)
}

function limparMensagemPinPad() {
    cliSitef.EscreveMensagemPermanentePinPad("")
}

function reberDadosPinPad(buffer, comando) {
    REF.writeCString(buffer, 0, '4')
    REF.writeInt64LE(comando, 0, 23)
}


function escreverMensagemPinPad(msg) {
    let msgPinPad = REF.readCString(msg, 0);
    cliSitef.EscreveMensagemPermanentePinPad(msgPinPad)
}

function confirmacaoOperador(buffer, comando, tipoCampo) {
    console.log(
        "Entrada\nBuffer", REF.readCString(buffer, 0),
        "Comando", REF.readInt64LE(comando, 0),
        "Tipo Campo", REF.readInt64LE(tipoCampo, 0))
    REF.writeCString(buffer, 0, '')
}


function continuaFuncaoSiTefInterativo() {
    const status = cliSitef.ContinuaFuncaoSiTefInterativo(
        _comando,
        _tipoCampo,
        _tamMinimo,
        _tamMaximo,
        _buffer,
        _tamBuffer,
        '0');
    if (resComando === 0) {
        escreverMensagemPinPad(_buffer, _tipoCampo)
    } else {
        executarRotinaSitef(resComando)
    }
    return status
}

function executarRotinaSitef(comando) {
    switch (comando) {
        case 21:
            selecionarOperadora(_buffer, _comando, _tipoCampo)
            break;
        case 30:
            inserirNumeroCelular(_buffer, _comando, _tipoCampo)
            break;
        case 14:
            limparMensagemPinPad()
            break;
        case 22:
            confirmacaoOperador(_buffer, _comando, _tipoCampo)
        default:
            break;
    }
}

function configuraIntSiTefInterativo() {
    const status = cliSitef.ConfiguraIntSiTefInterativo(
        sitef.configfSitefInterativo.ipSiTef,
        sitef.configfSitefInterativo.idLoja,
        sitef.configfSitefInterativo.idTerminal,
        sitef.configfSitefInterativo.reservado)
    return status
}


function iniciaFuncaoSiTefInterativo() {
    const status = cliSitef.IniciaFuncaoSiTefInterativo(
        sitef.iniciafSitefInterativo.modalidade,
        sitef.iniciafSitefInterativo.valor,
        sitef.iniciafSitefInterativo.numeroCuponFiscal,
        sitef.iniciafSitefInterativo.dataFiscal,
        sitef.iniciafSitefInterativo.horario,
        sitef.iniciafSitefInterativo.operaror,
        sitef.iniciafSitefInterativo.restricoes);
    return status
}

function finalizaFuncaoSiTefInterativo() {
    cliSitef.FinalizaFuncaoSiTefInterativo(
        sitef.finalizaFuncaoSiTefInterativo.confirma,
        sitef.finalizaFuncaoSiTefInterativo.numeroCuponFiscal,
        sitef.finalizaFuncaoSiTefInterativo.dataFiscal,
        sitef.finalizaFuncaoSiTefInterativo.horaFiscal,
        sitef.finalizaFuncaoSiTefInterativo.parametrosAdicionais);
}

function destroy() {
    _comando = REF.alloc(REF.types.int)
    _tipoCampo = REF.alloc(REF.types.int, 0);
    _tamMinimo = REF.alloc(REF.types.int, 0);
    _tamMaximo = REF.alloc(REF.types.int, 0);
    _buffer = REF.allocCString('00000000000000');
}