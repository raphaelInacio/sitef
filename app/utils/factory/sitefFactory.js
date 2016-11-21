'use strict'



function SitefInterativoFactory() {
  let REF = require('ref')
  let _comando = REF.alloc(REF.types.int)
  let _tipoCampo = REF.alloc(REF.types.int, 0)
  let _tamMinimo = REF.alloc(REF.types.int, 0)
  let _tamMaximo = REF.alloc(REF.types.int, 0)
  let _buffer = REF.allocCString('000000000000000000')
  let _tamBuffer = REF.allocCString('20480')
  let _inicia = false

  var sitef = {
    setInicia: (value) => {
      _inicia = value
    },
    getInicia: () => {
      return _inicia
    },
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
                '\n[Buffer', sitef.readBuffer(), ']',
                '\n[Comando', sitef.readComando(), ']',
                '\n[Tipo Campo', sitef.readTipoCampo(), ']',
                '\n[Tamanho Maximo', sitef.readTamanhoMaximo(), ']',
                '\n[Tamanho Minimo', sitef.readTamanhoMinimo(), ']',
                '\n[Tamanho buffer', sitef.readTamanhoBuffer(), ']'
            )
    },
    getJSON:() => {
      return {
        'buffer' : sitef.readBuffer(),
        'comando' :sitef.readComando(),
        'tipoCampo' : sitef.readTipoCampo(),
        'tamanhoMaximo' : sitef.readTamanhoMaximo(),
        'tamanhoMinimo' : sitef.readTamanhoMinimo(),
        'tamanhoBuffer' : sitef.readTamanhoBuffer(), 
      }
    }
  }

  return sitef
}

const sitefIterativo = new SitefInterativoFactory()

module.exports = {
  create : sitefIterativo
} 