import { Router } from "express";
import ProductController from "../../controller/product/index.js";

const productRouter = Router();
productRouter.get("/products", ProductController.getAll);

productRouter.post("/product", ProductController.create);

productRouter.get("/product/:id", ProductController.getSingle);

export default productRouter;
