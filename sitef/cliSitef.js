//readelf -Ws /usr/lib/libexample.so lista as funções da biblioteca
const FFI = require('ffi')
const settings  = require('./../settings')

//Mapeie aqui as funções que você irá utilizar da bilioteca da sitef
const cliSitef = new FFI.Library(settings.PROJETO_DIR + '/sitef/libs/Linux64/libclisitef', {
// const cliSitef = new FFI.Library('/../../sitef/libs/Linux64/libclisitef', {
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
    'ConfiguraIntSiTefInterativo': [ 'int', [ "string", "string", "string", "string" ] ],
    //int ConfiguraIntSiTefInterativoEx (IPSiTef, IdLoja, IdTerminal, Reservado,ParametrosAdicionais)
    'ConfiguraIntSiTefInterativoEx': [ 'int', [ "string", "string", "string", "int", "string" ] ],
    //int IniciaFuncaoSiTefInterativo (Funcao, Valor, CupomFiscal, DataFiscal,HoraFiscal, Operador, ParamAdic)
    'IniciaFuncaoSiTefInterativo': [ 'int', [ "int", "string", "string", "string", "string", "string", "string" ] ],
    //int ContinuaFuncaoSiTefInterativo (Comando, TipoCampo, TamMinimo, TamMaximo,Buffer, TamBuffer, Continua)
    'ContinuaFuncaoSiTefInterativo': [ 'int', [ "string", "string", "string", "string", "string", "string", "string" ] ],
    //void FinalizaFuncaoSiTefInterativo (Confirma, CupomFiscal, DataFiscal,HoraFiscal, ParamAdic);
    'FinalizaFuncaoSiTefInterativo': [ 'int', [ "int", "string", "string", "string", "string" ] ]
})

module.exports = {
    cliSitef: cliSitef,
}

