module.exports.returnJSON = (req, res, err, result, statusCode) => {
  let responseJson
  if (err) {
    res.statusCode = statusCode ? statusCode : 400
    res.send({status: res.statusCode, message: err})
    return
  } else {
    let querystr = require('url').parse(req.url, true).query
    let getError = querystr.testFault
    if (getError !== undefined) {
      res.statusCode = 401
      res.send('None shall pass')
      saveResponse(req, res, {error: 'None shall pass'})
      return
    } else {
      if (result === null) {
        res.statusCode = 201
      } else {
        res.statusCode = 200
        responseJson = result
      }
    }
  }
  res.json(responseJson ? responseJson : '')
}

module.exports.filterInt = function (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value)
  return NaN
}

module.exports.Response = {servico: '', funcao: '', msg: '', id: ''} 
