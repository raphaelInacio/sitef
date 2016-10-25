const cliSitef = require('./sitef/src/cliSitef').cliSitef
const sitef = require('./sitef/src/cliSitef').sitef
const REF = require('ref')

console.log("Configurando comunicação com o sitef ConfiguraIntSiTefInterativo...\n");

var status = cliSitef.ConfiguraIntSiTefInterativo(
    sitef.configfSitefInterativo.ipSiTef,
    sitef.configfSitefInterativo.idLoja,
    sitef.configfSitefInterativo.idTerminal,
    sitef.configfSitefInterativo.reservado
);

if (status !== 0) {
    console.log("\nErro na ConfiguraIntSiTefInterativo, codigo retorno: " + status);
} else {
    console.log("\nConfiguraIntSiTefInterativo realizada com sucesso, codigo retorno: " + status);
    console.log("\nIniciano função IniciaFuncaoSiTefInterativo...");
    console.log("\nVerificando presença do pinpad, codigo retorno: " + cliSitef.VerificaPresencaPinPad());

    status = cliSitef.IniciaFuncaoSiTefInterativo(
        sitef.iniciafSitefInterativo.modalidade,
        sitef.iniciafSitefInterativo.valor,
        sitef.iniciafSitefInterativo.numeroCuponFiscal,
        sitef.iniciafSitefInterativo.dataFiscal,
        sitef.iniciafSitefInterativo.horario,
        sitef.iniciafSitefInterativo.operaror,
        sitef.iniciafSitefInterativo.restricoes);

    var _comando = REF.alloc(REF.types.int)
    var _tipoCampo = REF.alloc(REF.types.int, 0);
    var _tamMinimo = REF.alloc(REF.types.int, 0);
    var _tamMaximo = REF.alloc(REF.types.int, 0);
    var _buffer = REF.allocCString('0000000000000000000000000000000000000000000000000');
    sitef.contfSitefInterativo.tamBuffer = _buffer.lenght

    var resBuffer = '';
    var resComando = '';
    var tipoCampo = '';

    if (status === 10000) {
        console.log("\nIniciaFuncaoSiTefInterativo realizada com sucesso, codigo retorno: " + status);
        while (status === 10000) {

            console.log("\nExecutando função ContinuaFuncaoSiTefInterativo... " + status);

            status = cliSitef.ContinuaFuncaoSiTefInterativo(
                _comando,
                _tipoCampo,
                _tamMinimo,
                _tamMaximo,
                _buffer,
                sitef.contfSitefInterativo.tamBuffer,
                sitef.contfSitefInterativo.continua);

            resBuffer = REF.readCString(_buffer, 0);
            resComando = REF.readInt64LE(_comando, 0);

            console.log('Valor de comando saida', resComando)
            console.log('Valor de buffer saida', resBuffer)

            // switch (resComando) {
            //     case 21:
            //         enviarOperadora(_buffer, _comando)
            //         break;
            //     case 30:
            //         inserirNumeroCelular(_buffer, _comando)
            //         break;
            //     default:
            //         break;
            // }

            if (resComando === 21) {
                enviarOperadora(_buffer, _comando)
                console.log('Selecione uma das operadoras', resBuffer)
                REF.writeCString(_buffer, 0, '4')
                REF.writeInt64LE(_comando, 0, 29)
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
            } else if (resComando === 30) {
                REF.writeCString(_buffer, 0, '11954950529')
                REF.writeInt64LE(_comando, 0, 29)
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            } else if (resComando == 22) {
                REF.writeCString(_buffer, 0, '0')
                REF.writeInt64LE(_comando, 0, 20)
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            }
            else if (resComando == 589) {
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            } else if (resComando == 590) {
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            } else if (resComando == 592) {
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            } else if (resComando === 0) {
                REF.writeCString(_buffer, 0, '')
                resBuffer = REF.readCString(_buffer, 0);
            }
             else if (resComando == 22) {
                REF.writeCString(_buffer, 0, '0')
                REF.writeInt64LE(_comando, 0, 20)
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            }
            else if (resComando == 20) {
                REF.writeCString(_buffer, 0, '0')
                REF.writeInt64LE(_comando, 0, 20)
                resBuffer = REF.readCString(_buffer, 0);
                resComando = REF.readInt64LE(_comando, 0);
                console.log('Valor de comando saida', resComando)
                console.log('Valor de buffer saida', resBuffer)
            }
        }


        if (status !== 1000) {

            console.log("\nRetorno função ContinuaFuncaoSiTefInterativo,codigo retorno: " + status);

            cliSitef.FinalizaFuncaoSiTefInterativo(
                sitef.finalizaFuncaoSiTefInterativo.confirma,
                sitef.finalizaFuncaoSiTefInterativo.numeroCuponFiscal,
                sitef.finalizaFuncaoSiTefInterativo.dataFiscal,
                sitef.finalizaFuncaoSiTefInterativo.horaFiscal,
                sitef.finalizaFuncaoSiTefInterativo.parametrosAdicionais);
        }
    } else {
        console.log("\nFunção sitef não iniciado, codigo retorno: " + status);
    }

}

function enviarOperadora(buffer, comando) {
    cliSitef.EscreveMensagemPermanentePinPad('Selecione uma das operadoras')
    REF.writeCString(_buffer, 0, '4')
    REF.writeInt64LE(_comando, 0, 29)
}

function inserirNumeroCelular(buffer, comando) {
    cliSitef.EscreveMensagemPermanentePinPad(resBuffer)
    REF.writeInt64LE(_comando, 0, 4)
  //  reberDadosPinPad(buffer, comando)
}

function reberDadosPinPad(buffer, comando) {
    REF.writeCString(_buffer, 0, '0')
    REF.writeInt64LE(_comando, 0, 23)
}


function continuaFuncaoSiTefInterativo() {

}


function iniciaFuncaoSiTefInterativo() {

}