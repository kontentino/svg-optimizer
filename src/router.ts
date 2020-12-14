import { Router } from "express";
import { upload } from "./middlewares";

const baseRouter = Router()

baseRouter.get('/', function (req, res, next) {
  res.render('index', {title: 'Kontentino Svg Optimizer'});
});

baseRouter.post('/optimize', upload.single('icon'), function (req, res, next) {
  console.log(req)
  console.log(req.file)

  res.render('index', {title: 'Kontentino Svg Optimizer'});
});


export default baseRouter
