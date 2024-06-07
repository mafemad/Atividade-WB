import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cpf from "../../modelo/cpf";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Rg from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import Cadastrar from "../operações/cadastrar";

export default class CadastrarCliente implements Cadastrar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    
    constructor(
        clientes: Array<Cliente>, 
        produtos: Array<Produto>,
        servicos: Array<Servico>
    ) {
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.produtos = produtos;
        this.servicos = servicos;
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
        let genero = this.entrada.receberTexto(`Informe seu gênero (m/f): `);
        let valorCpf = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let [dateCPF, monthCPF, yearCPF] = dataCPF.split('/');
        let dataEmissaoCPF = new Date(
            Number(yearCPF), 
            Number(monthCPF) - 1, 
            Number(dateCPF)
        );
        
        let rgs: Array<Rg> = [];
        let maisRgs = true;
        while (maisRgs) {
            let valorRg = this.entrada.receberTexto(`Por favor informe o número do rg: `);
            let dataRg = this.entrada.receberTexto(`Por favor informe a data de emissão do rg, no padrão dd/mm/yyyy: `);
            let [dateRg, monthRg, yearRg] = dataRg.split('/');
            let dataEmissaoRG = new Date(
                Number(yearRg), 
                Number(monthRg) - 1, 
                Number(dateRg)
            );
            rgs.push(new Rg(valorRg, dataEmissaoRG));
            maisRgs = this.entrada.receberTexto(`Possuí mais RGs? (s/n) `) === 's';
        }

        let telefones: Array<Telefone> = [];
        let maisTelefones = true;
        while (maisTelefones) {
            let valorTelefone = this.entrada.receberTexto(`Por favor informe o telefone, no padrão (99) 99999-9999: `);
            let [ddd, numero] = valorTelefone.replace('(', '').replace(')', '').split(' ');

            telefones.push(new Telefone(ddd, numero));
            maisTelefones = this.entrada.receberTexto(`Possuí mais telefones? (s/n) `) === 's';
        }

        let cpf = new Cpf(valorCpf, dataEmissaoCPF);

        let produtosConsumidos: Array<Produto> = [];
        let maisProdutos = true;
        while (maisProdutos) {
            if (this.produtos.length === 0) {
                console.warn('\nNão há produtos cadastrados');
                console.log('Tente novamente mais tarde');
                break;
            }

            console.table(this.produtos); 
            let codigoProdutoConsumido = this.entrada.receberNumero('Selecione o produto pelo código(index): ');
            let produtoConsumido = this.produtos[codigoProdutoConsumido];

            if (produtoConsumido) {
                produtosConsumidos.push(produtoConsumido);
            } else {
                console.warn('Não há produto com esse código');
            }

            maisProdutos = this.entrada.receberTexto(`Mais Produtos? (s/n) `) === 's';
        }

        let servicosConsumidos: Array<Servico> = [];
        let maisServicos = true;
        while (maisServicos) {
            if (this.servicos.length === 0) {
                console.warn('\nNão há serviços cadastrados');
                console.log('Tente novamente mais tarde');
                break;
            }

            console.table(this.servicos); 
            let codigoServicoConsumido = this.entrada.receberNumero('Selecione o serviço pelo código(index): ');
            let servicoConsumido = this.servicos[codigoServicoConsumido];

            if (servicoConsumido) {
                servicosConsumidos.push(servicoConsumido);
            } else {
                console.warn('Não há serviço com esse código');
            }

            maisServicos = this.entrada.receberTexto(`Mais Serviços? (s/n) `) === 's';
        }
        
        let cliente = new Cliente(
            nome, 
            nomeSocial, 
            cpf, 
            rgs, 
            telefones, 
            produtosConsumidos,
            servicosConsumidos,
            genero as 'm' | 'f'
        );
        this.clientes.push(cliente);
        console.log(`\nCadastro concluído :)\n`);
    }
}
