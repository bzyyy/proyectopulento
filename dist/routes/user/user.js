"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsersRouter = getAllUsersRouter;
var _user = require("../../actions/user/user");
async function getAllUsersRouter(ctx) {
  let users = await (0, _user.getAllUsers)();
  ctx.body = users;
  return ctx;
}