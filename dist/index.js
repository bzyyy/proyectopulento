"use strict";

var _koa = _interopRequireDefault(require("koa"));
var _koaBody = _interopRequireDefault(require("koa-body"));
var _index = _interopRequireDefault(require("./routes/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cors = require('@koa/cors');
const app = new _koa.default();
app.use(cors());
app.use((0, _koaBody.default)({
  multipart: true,
  urlencoded: true
}));
app.use(_index.default.routes());

//Servidor
app.listen(3000, function () {
  console.log('Servidor escuchando 3000');
});