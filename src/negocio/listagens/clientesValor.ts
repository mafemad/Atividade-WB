import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import Listar from "../operações/listar";

export default class ListarClientesValor implements Listar {
    private clientes: Array<Cliente>

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    
    public listar(): void {
        let consumoValor : {
            nome: String,
            valorConsumo : number,
        }[] = this.clientes.map(({
            nome,
            getProdutosConsumidos : produtosConsumidos, 
        }) => ({
            nome,
            valorConsumo: this.somar(produtosConsumidos)
        }));

         let consumoClienteOrdenado = consumoValor.sort((
          a: { valorConsumo: number },
          b: { valorConsumo: number }
        ) => b.valorConsumo - a.valorConsumo);

        console.log(`\n 5 clientes que mais consumiram por valor: `);
        console.table(consumoClienteOrdenado.slice(0,5));
        console.log("\n");
    }

    public somar(produtos : Array<Produto>){
        let total = 0;
        produtos.forEach((prod)=>{
            total += prod.getValor;
        })
        return total;
    }

}