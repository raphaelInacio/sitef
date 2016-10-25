//readelf -Ws /usr/lib/libexample.so lista as funções da biblioteca
const FFI = require('ffi')
const REF = require('ref')

const sitef_5_x = './libs/5.x/Linux64/libclisitef'
const sitef_6_x = './libs/6.x/Linux64/libclisitef'

const cliSitef = new FFI.Library(sitef_5_x, {
    //int VerificaPresencaPinPad (void)
    'VerificaPresencaPinPad': [ 'int', [] ],
    //int LeCartaoSeguro (string)
    'LeCartaoSeguro': [ 'int', [ 'string' ] ],
    //int LeSimNaoPinPad (Mensagem)
    'LeSimNaoPinPad': [ 'int', [ 'string' ] ],
    //int EscreveMensagemPermanentePinPad (string)
    'EscreveMensagemPermanentePinPad': [ 'int', [ 'string' ] ],
    //int ObtemInformacoesPinPad (char)
    'ObtemInformacoesPinPad': [ 'int', [ "char" ] ],
    //int KeepAlivePinPad (void)
    'KeepAlivePinPad': [ 'int', [] ],
    //int ConfiguraIntSiTefInterativo (IPSiTef, IdLoja, IdTerminal, Reservado)
    'ConfiguraIntSiTefInterativo': ['int', ["string", "string", "string", 'int']],
    //int ConfiguraIntSiTefInterativoEx (IPSiTef, IdLoja, IdTerminal, Reservado,ParametrosAdicionais)
    'ConfiguraIntSiTefInterativoEx': ['int', ["string", "string", "string", "int", "string"]],
    //int IniciaFuncaoSiTefInterativo (Funcao, Valor, CupomFiscal, DataFiscal,HoraFiscal, Operador, ParamAdic)
    'IniciaFuncaoSiTefInterativo': ['int', ["int", "string", "string", "string", "string", "string", "string"]],
    //int ContinuaFuncaoSiTefInterativo (Comando, TipoCampo, TamMinimo, TamMaximo,Buffer, TamBuffer, Continua)
    'ContinuaFuncaoSiTefInterativo': ['int', ["string", "string", "string", "string", "string", "string", "string"]],
    //void FinalizaFuncaoSiTefInterativo (Confirma, CupomFiscal, DataFiscal,HoraFiscal, ParamAdic);
    'FinalizaFuncaoSiTefInterativo': ['int', ["int", "string", "string", "string", "string"]]
});




const sitef = {
    configfSitefInterativo: {
        ipSiTef: "10.16.39.80",
        idLoja: "00000000",
        idTerminal: "IP000001",
        reservado: 0,
        parametrosAdicionais: "[MultiplosCupons=1;TipoComunicacaoExterna=GSURF.SSL]"
    },
    contfSitefInterativo: {
        comando: '0',
        tipoCampo: '589',
        tamMinimo: '1',
        tamMaximo: '2800000',
        buffer: '',
        tamBuffer: '2800000',
        continua: '1',
    },
    iniciafSitefInterativo: {
        modalidade: 300,
        valor: '300',
        cupomFiscal: '123456',
        dataFiscal: '20161019',
        horaFiscal: '120000',
        operador: 'Operador1',
        restricoes: ""
    },
    finalizaFuncaoSiTefInterativo: {
        confirma: 1,
        numeroCuponFiscal: "123456",
        dataFiscal: "20040514",
        horario: "120000",
        parametrosAdicionais: ""
    }
}

module.exports = {
    cliSitef: cliSitef,
    sitef: sitef
}

