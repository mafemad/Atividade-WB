import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Cpf from "../modelo/cpf";
import Empresa from "../modelo/empresa";
import Produto from "../modelo/produto";
import Rg from "../modelo/rg";
import Servico from "../modelo/servico";
import Telefone from "../modelo/telefone";
import CadastrarCliente from "../negocio/cliente/cadastrarCliente";
import ExcluirCliente from "../negocio/cliente/excluirCliente";
import ListarClientes from "../negocio/cliente/listarClients";
import ListarClientesConsumidores from "../negocio/listagens/clientesConsumidores";
import ListarClientesPorGenero from "../negocio/listagens/clientesGenero";
import ListarClientesMConsumidores from "../negocio/listagens/clientesMConsumidores";
import ListarClientesValor from "../negocio/listagens/clientesValor";
import ListarProdutosMaisConsumidos from "../negocio/listagens/produtosMaisConsumidos";
import ListarProdutosMaisConsumidosGenero from "../negocio/listagens/produtosMaisConsumidosGenero";
import CadastrarProduto from "../negocio/produto/cadastrarProduto";
import ExcluirProduto from "../negocio/produto/excluirProduto";
import ListarProdutos from "../negocio/produto/listarProdutos";

console.log(`Bem-vindo ao cadastro de clientes do Grupo World Beauty`)
let empresa = new Empresa();
for (let i = 1; i <= 20; i++) {
    empresa.getProdutos.push(new Produto(`Produto ${i}`, Math.random() * 100));
}

for (let i = 1; i <= 20; i++) {
    empresa.getServicos.push(new Servico(`Serviço ${i}`));
}

for (let i = 1; i <= 30; i++) {
    let cpf = new Cpf(`123.456.789-${i % 10}0`, new Date());
    let rgs = [new Rg(`MG-${i % 10}0`, new Date())];
    let telefones = [new Telefone( `31`, `98765-432${i % 10}`)];
    let produtosConsumidos = empresa.getProdutos.slice(0, Math.floor(Math.random() * empresa.getProdutos.length));
    let servicosConsumidos = empresa.getServicos.slice(0, Math.floor(Math.random() * empresa.getServicos.length));
    
    let cliente = new Cliente(
        `Cliente ${i}`,
        `Nome Social ${i}`,
        cpf,
        rgs,
        telefones,
        produtosConsumidos,
        servicosConsumidos,
        i % 2 === 0 ? 'm' : 'f'
    );
    
    empresa.getClientes.push(cliente);
}
let execucao = true;

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Clientes`);
    console.log(`2 - Produtos`);
    console.log(`3 - Listagens`);
    console.log(`0 - Sair`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

    switch (opcao) {
        // área de cliente
        case 1:
            let execucaoAreaCliente = true;
            while (execucaoAreaCliente) {
                console.log(`\n1 - Cadastrar cliente`);
                console.log(`2 - Listar todos os clientes`);
                console.log(`3 - Excluir cliente`);
                console.log(`0 - Voltar`);

                let opcaoCliente = entrada.receberNumero(`Por favor, escolha uma opção: `);

                switch (opcaoCliente) {
                    case 1:
                        let cadastroCliente = new CadastrarCliente(
                            empresa.getClientes,
                            empresa.getProdutos,
                            empresa.getServicos
                        )
                        cadastroCliente.cadastrar()
                        break;
                    case 2:
                        let listagemClientes = new ListarClientes(empresa.getClientes)
                        listagemClientes.listar()
                        break;
                    case 3:
                        let exclusaoCliente = new ExcluirCliente(empresa.getClientes);
                        exclusaoCliente.deletar();
                        break;
                    case 0:
                        execucaoAreaCliente = false
                        console.log(`\n`)
                        break;
                    default:
                        console.log(`Operação não entendida :(\n`);
                        break;
                }
            }
            break;
        // área do produto
        case 2:
            let execucaoAreaProduto = true;
            while (execucaoAreaProduto) {
                console.log(`\n1 - Cadastrar Produto`);
                console.log(`2 - Listar Produtos`);
                console.log(`3 - Excluir Produto`);
                console.log(`0 - Sair`);

                let opcaoProduto = entrada.receberNumero(`Por favor, escolha uma opção: `);

                switch (opcaoProduto) {
                    case 1:
                        let cadastroProduto = new CadastrarProduto(empresa.getProdutos);
                        cadastroProduto.cadastrar();
                        break;
                    case 2:
                        let listagemProdutos = new ListarProdutos(empresa.getProdutos);
                        listagemProdutos.listar();
                        break;
                    case 3:
                        let exclusaoProduto = new ExcluirProduto(empresa.getProdutos);
                        exclusaoProduto.deletar();
                        break;
                    case 0:
                        execucaoAreaProduto = false
                        console.log(`\n`)
                        break;
                    default:
                        console.log(`Operação não entendida :(\n`);
                        break;
                }
            }
            break;
        // Listagens
        case 3:
            let execucaoListagem = true;
            while (execucaoListagem) {
                console.log(`\n1 - Listar os 10 clientes que mais consumiram produtos`);
                console.log(`2 - Listar os 10 clientes que menos consumiram produtos`);
                console.log(`3 - Listar os 5 clientes que mais consumiram produtos pelo valor`);
                console.log(`4 - Clientes por gênero`);
                console.log(`5 - Produto mais consumido`);
                console.log(`6 - Produto mais consumido por genero`);
                console.log(`0 - Sair`);

                let opcaoProduto = entrada.receberNumero(`Por favor, escolha uma opção: `);

                switch (opcaoProduto) {
                    case 1:
                        let listarClientesConsumidores = new ListarClientesConsumidores(empresa.getClientes);
                        listarClientesConsumidores.listar();
                        break;
                    case 2:
                        let listarClientesMConsumidores = new ListarClientesMConsumidores(empresa.getClientes);
                        listarClientesMConsumidores.listar();
                        break;
                    case 3:
                        let listarClientesValor = new ListarClientesValor(empresa.getClientes);
                        listarClientesValor.listar();
                        break;

                    case 4:
                        let listarClientesporGenero = new ListarClientesPorGenero(empresa.getClientes);
                        listarClientesporGenero.listar();
                        break;
                    case 5:
                        let listarProdutosMaisConsumidos = new ListarProdutosMaisConsumidos(
                            empresa.getClientes,
                            empresa.getProdutos
                        );
                        listarProdutosMaisConsumidos.listar();
                        break;
                    case 6:
                        let listarProdutosMaisConsumidosGenero = new ListarProdutosMaisConsumidosGenero(
                            empresa.getClientes,
                            empresa.getProdutos
                        );
                        listarProdutosMaisConsumidosGenero.listar();
                        break;
                    case 0:
                        execucaoListagem = false
                        console.log(`\n`)
                        break;
                    default:
                        console.log(`Operação não entendida :(\n`);
                        break;
                }
            }
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}