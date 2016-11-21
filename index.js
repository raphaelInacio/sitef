const cliSitef = require('./sitef/src/cliSitef').cliSitef
const sitef = require('./sitef/src/cliSitef').sitef
var sitefIterativo = require('./sitef/src/sitefFactory').create

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

function fluxoSitef() {
    let status = 10000
    while (true) {
        if (status === 10000) {
            executarRotinaSitef(sitefIterativo.readComando())
        } else {
            finalizaFuncaoSiTefInterativo()
            break
        }
        status = continuaFuncaoSiTefInterativo()
        sitefIterativo.print()
    }
    console.log(status)
    return status
}


function confirmaOperacaoSitef() {
    continuaFuncaoSiTefInterativo(10000)
}

function selecionarOpcaoMenu(opcao) {
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
    try {
        if (msg) {
            cliSitef.EscreveMensagemPermanentePinPad(msg)
        }
    } catch (error) {
        console.log(error)
    }
}

function continuaFuncaoSiTefInterativo(continua) {
    let continuaFuncao = 0
    if(continua){
        continuaFuncao = continua
    }
    let status = cliSitef.ContinuaFuncaoSiTefInterativo(
        sitefIterativo.getComando(),
        sitefIterativo.getTipoCampo(),
        sitefIterativo.getTamanhoMinimo(),
        sitefIterativo.getTamanhoMaximo(),
        sitefIterativo.getBuffer(),
        sitefIterativo.getTamanhoBuffer(),
        continuaFuncao)

    return status
}

function executarRotinaSitef(comando) {
    switch (comando) {
        case 0:
            escreverMensagemPinPad(sitefIterativo.readBuffer())
            break
        case 1:
            escreverMensagemPinPad(sitefIterativo.readBuffer())
            break
        case 2:
            escreverMensagemPinPad(sitefIterativo.readBuffer())
            break
        case 3:
            escreverMensagemPinPad(sitefIterativo.readBuffer())
            break
        case 21:
            selecionarOpcaoMenu()
            break
         case 23:
           // confirmaOperacaoSitef()
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
        console.log(error)
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

function confirmarOperacaoPinPad(msg) {
    let confirmacaoCliente = cliSitef.LeSimNaoPinPad('selecione o verde para confirmar a operação')
    console.log(confirmacaoCliente)
    sitefIterativo.setBuffer('0')
}

function destroy() {
}