import Cliente from "../../modelo/cliente";
import Listar from "../operações/listar";

export default class ListarClientesPorGenero implements Listar {
    private clientes: Array<Cliente>

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    
    public listar(): void {
      let clientesPorGenero = this.clientes.map(({nome, genero}) => ({
        masculino: genero === 'm' ? nome : '-',
        feminino: genero === 'f' ? nome : '-'
      }));
      console.log(`\nClientes por gênero:`);
      console.table(clientesPorGenero);
      console.log(`\n`);
    }
}