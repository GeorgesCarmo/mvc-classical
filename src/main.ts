import { ApiExpress } from "./api/express/apiExpress";
import { ProductController } from "./api/express/controllers/productController";

function main(){
    const api = ApiExpress.build();

    const controller = ProductController.build();

    api.addGetRoute("/products", controller.list);
    api.addPostRoute("/products/:id/buy", controller.buy);
    api.addPostRoute("/products/:id/sell", controller.sell);
    api.addPostRoute("/products/create", controller.create);

    api.start(8000);
}

main();