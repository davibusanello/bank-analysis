"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = (0, _express.default)();
api.get('/', function (request, response) {
  response.send('Hellow World!');
});
api.listen(3005, function () {
  console.log('Listening on port 3005');
});