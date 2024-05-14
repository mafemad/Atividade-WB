import Produto from "../../modelo/produto";
import Listar from "../operações/listar";

export default class ListarProdutos implements Listar {
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
    }
    
    public listar(): void {
        console.log(`\nLista de todos os produtos:`);
        console.table(this.produtos);
        console.log(`\n`);
    }
}