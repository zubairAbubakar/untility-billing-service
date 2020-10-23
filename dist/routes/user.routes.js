"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.Router();
//REST API routes
router.get('/users/:id', user_controller_1.getUser);
router.get('/users', user_controller_1.getUsers);
router.post('/users', user_controller_1.createUser);
router.put('/users/:id', user_controller_1.updateUser);
exports.default = router;
