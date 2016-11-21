const dataFiscal = require('../utils/dateUtil.js').getDataFiscal()
const horaFiscal = require('../utils/dateUtil.js').getHoraFiscal()
const FFI = require('ffi')
const REF = require('ref')

const sitef_5_x = './libs/5.x/Linux64/libclisitef'
const sitef_6_x = './libs/6.x/Linux64/libclisitef'

module.exports.CliSitef = new FFI.Library(sitef_5_x, {
  //int VerificaPresencaPinPad (void)
  'VerificaPresencaPinPad': ['int', []],
  //int LeCartaoSeguro (string)
  'LeCartaoSeguro': ['int', ['string']],
  //int LeSimNaoPinPad (Mensagem)
  'LeSimNaoPinPad': ['int', ['string']],
  //int EscreveMensagemPermanentePinPad (string)
  'EscreveMensagemPermanentePinPad': ['int', ['string']],
  //int ObtemInformacoesPinPad (char)
  'ObtemInformacoesPinPad': ['int', ["char"]],
  //int KeepAlivePinPad (void)
  'KeepAlivePinPad': ['int', []],
  //int ConfiguraIntSiTefInterativo (IPSiTef, IdLoja, IdTerminal, Reservado)
  'ConfiguraIntSiTefInterativo': ['int', ["string", "string", "string", 'int']],
  //int ConfiguraIntSiTefInterativoEx (IPSiTef, IdLoja, IdTerminal, Reservado,ParametrosAdicionais)
  'ConfiguraIntSiTefInterativoEx': ['int', ["string", "string", "string", "int", "string"]],
  //int IniciaFuncaoSiTefInterativo (Funcao, Valor, CupomFiscal, DataFiscal,HoraFiscal, Operador, ParamAdic)
  'IniciaFuncaoSiTefInterativo': ['int', ["int", "string", "string", "string", "string", "string", "string"]],
  //int ContinuaFuncaoSiTefInterativo (Comando, TipoCampo, TamMinimo, TamMaximo,Buffer, TamBuffer, Continua)
  'ContinuaFuncaoSiTefInterativo': ['int', ["string", "string", "string", "string", "string", "string", "int"]],
  //void FinalizaFuncaoSiTefInterativo (Confirma, CupomFiscal, DataFiscal,HoraFiscal, ParamAdic);
  'FinalizaFuncaoSiTefInterativo': ['int', ["int", "string", "string", "string", "string"]]
});


module.exports.Sitef = {
  configfSitefInterativo: {
    ipSiTef: '10.16.39.80',
    idLoja: '00000000',
    idTerminal: 'IP000001',
    reservado: 0,
    parametrosAdicionais: ''
  },
  iniciafSitefInterativo: function (modalidade, cupomFiscal) {
    if (modalidade && cupomFiscal) {
      const res = {
        modalidade: modalidade, //300, 301
        valor: '',
        cupomFiscal: cupomFiscal,
        dataFiscal: dataFiscal,
        horaFiscal: horaFiscal,
        operador: 'Operador1',
        restricoes: ''
      }
      return res
    }
    return {
      modalidade: 301,//300
      valor: '300',
      cupomFiscal: '123456',
      dataFiscal: '20161019',
      horaFiscal: '120000',
      operador: 'Operador1',
      restricoes: ""
    }
  },
  finalizaFuncaoSiTefInterativo: {
    confirma: 1,
    numeroCuponFiscal: '123456',
    dataFiscal: '20040514',
    horario: '120000',
    parametrosAdicionais: ''
  }
}
