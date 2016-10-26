const cliSitef = require('./sitef/src/cliSitef').cliSitef
const sitef = require('./sitef/src/cliSitef').sitef

var sitefIterativo = new SitefInterativoFactory()

var status = configuraIntSiTefInterativo()

if (status !== 0) {
} else {
    let status = iniciaFuncaoSiTefInterativo()
    if (status === 10000) {
        status = fluxoSitef()
        if (status === 10000) {
            sitefIterativo.print()
            executarRotinaSitef(sitefIterativo.readComando())
        }
    }
}

function SitefInterativoFactory() {
    let REF = require('ref')
    let _comando = REF.alloc(REF.types.int)
    let _tipoCampo = REF.alloc(REF.types.int, 0)
    let _tamMinimo = REF.alloc(REF.types.int, 0)
    let _tamMaximo = REF.alloc(REF.types.int, 0)
    let _buffer = REF.allocCString('000000000000000000')
    let _tamBuffer = REF.allocCString('2048')

    var sitef = {
        setComando: (value) => {
            REF.readInt64LE(_comando, 0, value)
        },

        getComando: () => {
            return _comando
        },

        readComando: () => {
            return REF.readInt64LE(_comando, 0)
        },

        setTipoCampo: (value) => {
            REF.readInt64LE(_tipoCampo, 0, value)
        },

        getTipoCampo: () => {
            return _tipoCampo
        },

        readTipoCampo: () => {
            return REF.readInt64LE(_tipoCampo, 0)
        },

        setTamanhoMinimo: (value) => {
            REF.readInt64LE(_tamMinimo, 0, value)
        },

        getTamanhoMinimo: () => {
            return _tamMinimo
        },

        readTamanhoMinimo: () => {
            return REF.readInt64LE(_tamMinimo, 0)
        },

        setTamanhoMaximo: (value) => {
            REF.readInt64LE(_tamMaximo, 0, value)
        },

        getTamanhoMaximo: () => {
            return _tamMaximo
        },

        readTamanhoMaximo: () => {
            return REF.readInt64LE(_tamMaximo, 0)
        },
        setBuffer: (value) => {
            REF.writeCString(_buffer, 0, value)
        },

        getBuffer: () => {
            return _buffer
        },

        readBuffer: () => {
            return REF.readCString(_buffer, 0)
        },

        setTamanhoBuffer: (value) => {
            REF.writeCString(_tamBuffer, 0, value)
        },

        readTamanhoBuffer: () => {
            return REF.readCString(_tamBuffer, 0)
        },

        getTamanhoBuffer: () => {
            return _tamBuffer
        },

        print: () => {
            console.log(
                "\n[Buffer", sitef.readBuffer(), "]",
                "\n[Comando", sitef.readComando(), "]",
                "\n[Tipo Campo", sitef.readTipoCampo(), "]",
                "\n[Tamanho Maximo", sitef.readTamanhoMaximo(), "]",
                "\n[Tamanho Minimo", sitef.readTamanhoMinimo(), "]",
                "\n[Tamanho buffer", sitef.readTamanhoBuffer(), "]"
            )
        }
    }

    return sitef
}

function fluxoSitef() {
    let status
    while (true) {
        status = continuaFuncaoSiTefInterativo()
        sitefIterativo.print()
        if (status === 10000) {
            break
        } else {
            finalizaFuncaoSiTefInterativo()
            break
        }
    }
    return status
}

function selecionarOpcaoMenu(opcao) {
    escreverMensagemPinPad(sitefIterativo.readBuffer())
    if (opcao) {
        sitefIterativo.setBuffer(opcao)
        sitefIterativo.setComando(29)
    } else {
        console.log('Opção de seleção não informada, insira corretamente as informações')
    }
}

function inserirNumeroCelular(numeroCelular) {
    if (numeroCelular) {
        sitefIterativo.setBuffer(numeroCelular)
        sitefIterativo.setComando(29)
    }
}

function limparMensagemPinPad() {
    cliSitef.EscreveMensagemPermanentePinPad("")
}

function escreverMensagemPinPad(msg) {
    cliSitef.EscreveMensagemPermanentePinPad(msg)
}

function continuaFuncaoSiTefInterativo() {

    let status = cliSitef.ContinuaFuncaoSiTefInterativo(
        sitefIterativo.getComando(),
        sitefIterativo.getTipoCampo(),
        sitefIterativo.getTamanhoMinimo(),
        sitefIterativo.getTamanhoMaximo(),
        sitefIterativo.getBuffer(),
        sitefIterativo.getTamanhoBuffer(),
        '0')

    return status
}

function executarRotinaSitef(comando) {
    switch (comando) {
        case 0:
            escreverMensagemPinPad()
        case 21:
            selecionarOpcaoMenu()
            break
        case 30:
            inserirNumeroCelular()
            break
        case 14:
            limparMensagemPinPad()
            break
        default:
            break
    }
}

function configuraIntSiTefInterativo() {
    try {
        const status = cliSitef.ConfiguraIntSiTefInterativo(
            sitef.configfSitefInterativo.ipSiTef,
            sitef.configfSitefInterativo.idLoja,
            sitef.configfSitefInterativo.idTerminal,
            sitef.configfSitefInterativo.reservado)
        return status

    } catch (error) {
        console.log(erro)
    }
}

function iniciaFuncaoSiTefInterativo() {
    try {
        const status = cliSitef.IniciaFuncaoSiTefInterativo(
            sitef.iniciafSitefInterativo.modalidade,
            sitef.iniciafSitefInterativo.valor,
            sitef.iniciafSitefInterativo.numeroCuponFiscal,
            sitef.iniciafSitefInterativo.dataFiscal,
            sitef.iniciafSitefInterativo.horario,
            sitef.iniciafSitefInterativo.operaror,
            sitef.iniciafSitefInterativo.restricoes)
        return status
    } catch (error) {
        console.log(error)
    }
}

function finalizaFuncaoSiTefInterativo() {
    try {
        const status = cliSitef.FinalizaFuncaoSiTefInterativo(
            sitef.finalizaFuncaoSiTefInterativo.confirma,
            sitef.finalizaFuncaoSiTefInterativo.numeroCuponFiscal,
            sitef.finalizaFuncaoSiTefInterativo.dataFiscal,
            sitef.finalizaFuncaoSiTefInterativo.horaFiscal,
            sitef.finalizaFuncaoSiTefInterativo.parametrosAdicionais)
        return status
    } catch (error) {
        console.log(error)
    }
}

function confirmarOperacaoPinPad(msg){
    cliSitef.LeSimNaoPinPad(msg)
}

function destroy() {
}