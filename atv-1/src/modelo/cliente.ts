import Cpf from "./cpf";
import Produto from "./produto";
import Rg from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
    public nome: string
    public nomeSocial: string
    public genero: 'm' | 'f'
    private cpf: Cpf
    private rgs: Array<Rg>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    constructor(
        nome: string,
        nomeSocial: string,
        cpf: Cpf,
        rg: Array<Rg>,
        telefones: Array<Telefone>,
        produtosConsumidos: Array<Produto>,
        servicosConsumidos: Array<Servico>,
        genero: 'm' | 'f'
    ) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = rg;
        this.dataCadastro = new Date()
        this.telefones = telefones;
        this.produtosConsumidos = produtosConsumidos;
        this.servicosConsumidos = servicosConsumidos;
        this.genero = genero;
    }
    public get getCpf(): Cpf {
        return this.cpf;
    }
    public get getRgs(): Array<Rg> {
        return this.rgs;
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro;
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones;
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos;
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos;
    }
    public get getGenero(): 'm' | 'f' {
        return this.genero;
    }
    public set setGenero(genero: 'm' | 'f') {
        this.genero = genero;
    }
    public set setCpf(cpf: Cpf) {
        this.cpf.setValor= cpf.getValor;
        this.cpf.setDataEmissao = cpf.getDataEmissao;
    }
    public set setRgs(rgs: Array<Rg>) {
        this.rgs = rgs;
    }
    public set setTelefones(telefones: Array<Telefone>) {
        this.telefones = telefones;
    }
    public set setProdutosConsumidos(produtosConsumidos: Array<Produto>) {
        this.produtosConsumidos = produtosConsumidos;
    }
}