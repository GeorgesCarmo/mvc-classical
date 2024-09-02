import { ProductRepository } from "../../repositories/product/productRepository";
import { BuyOutputDto, ListOutputDto, ProductService, SellOutputDto } from "../product/productService";

export class ProductServiceImplementation implements ProductService{

    private constructor(readonly repository: ProductRepository){}

    public static build(repository: ProductRepository){
        return new ProductServiceImplementation(repository);
    }

    public async sell(id: string, amount: number): Promise<SellOutputDto> {
        const aProduct = await this.repository.find(id);

        if(!aProduct){
            throw new Error("O produto "+id+" não foi encontrado!");
        }

        aProduct.sell(amount);

        await this.repository.update(aProduct);

        const output: SellOutputDto = {
            id: aProduct.id,
            balance: aProduct.quantity
        }

        return output;
    }
    public async buy(id: string, amount: number): Promise<BuyOutputDto> {
        const aProduct = await this.repository.find(id);

        if(!aProduct){
            throw new Error("O produto "+id+" não foi encontrado!");
        }

        aProduct.buy(amount);

        await this.repository.update(aProduct);

        const output: BuyOutputDto = {
            id: aProduct.id,
            balance: aProduct.quantity
        }

        return output;
    }
    public async list(): Promise<ListOutputDto> {
        const aProducts = await this.repository.list();

        const products = aProducts.map((p)=>{
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                balance: p.quantity
            };
        });

        const output: ListOutputDto = {
            products,
        };

        return output;
    }
    
}