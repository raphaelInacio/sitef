const cliSitef = require('./sitef/src/cliSitef').cliSitef
const sitef = require('./sitef/src/cliSitef').sitef
const REF = require('ref')

var _comando = REF.alloc(REF.types.int)
var _tipoCampo = REF.alloc(REF.types.int, 0);
var _tamMinimo = REF.alloc(REF.types.int, 0);
var _tamMaximo = REF.alloc(REF.types.int, 0);
var _buffer = REF.allocCString('00000000000000');
sitef.contfSitefInterativo.tamBuffer = _buffer.lenght
var resBuffer = '';
var resComando = '';
var resTipoCampo = '';
var status = configuraIntSiTefInterativo()

if (status !== 0) {
} else {
    recargaCeluar()
}


function sitefFactory() {
    var sitef = {
        _comando: REF.alloc(REF.types.int),
        _tipoCampo: REF.alloc(REF.types.int, 0),
        _tamMinimo: REF.alloc(REF.types.int, 0),
        _tamMaximo: REF.alloc(REF.types.int, 0),
        _buffer: REF.allocCString('00000000'),
    }

    return this.sitef
}

function recargaCeluar() {
    let status = iniciaFuncaoSiTefInterativo()
    if (status === 10000) {
        while (status === 10000) {
            status = continuaFuncaoSiTefInterativo()
        }
        if (status !== 1000) {
            finalizaFuncaoSiTefInterativo()
        }
    }
}

function selecionarOperadora(buffer, comando, operadora) {
    escreverMensagemPinPad(buffer)
    REF.writeCString(buffer, 0, '4')
    REF.writeInt64LE(comando, 0, 29)
}

function inserirNumeroCelular(buffer, comando, numeroCelular) {
    escreverMensagemPinPad(buffer)
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
}


function continuaFuncaoSiTefInterativo() {

    resTipoCampo = REF.readInt64LE(_tipoCampo, 0);
    resBuffer = REF.readCString(_buffer, 0);
    resComando = REF.readInt64LE(_comando, 0);

    console.log('Entrada | Comando:', resComando, 'Buffer: ', resBuffer, 'Tipo Campo: ', resTipoCampo)

    const status = cliSitef.ContinuaFuncaoSiTefInterativo(
        _comando,
        _tipoCampo,
        _tamMinimo,
        _tamMaximo,
        _buffer,
        _buffer.lenght,
        '0');

    resTipoCampo = REF.readInt64LE(_tipoCampo, 0);
    resBuffer = REF.readCString(_buffer, 0);
    resComando = REF.readInt64LE(_comando, 0);

    console.log('Saida | Comando', resComando, 'Buffer: ', resBuffer, 'Tipo Campo: ', resTipoCampo)

    switch (resComando) {
        case 21:
            selecionarOperadora(_buffer, _comando)
            break;
        case 30:
            inserirNumeroCelular(_buffer, _comando)
            break;
        case 14:
            limparMensagemPinPad()
            break;
        case 0:
            escreverMensagemPinPad(_buffer)
        case 22:
            confirmacaoOperador(_buffer, _comando, _tipoCampo)
        default:
            break;
    }
    return status
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