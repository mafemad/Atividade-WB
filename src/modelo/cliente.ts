import Cpf from "./cpf";
import Produto from "./produto";
import Rg from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente{
    public nome !: string;
    public nomeSocial !: string;
    private cpf !: Cpf;
    private rgs !: Array<Rg>;
    private dataCadastro !: Date;
    private telefones !: Array<Telefone>;
    private produtosConsumidos !: Array<Produto>;
    private servicosConsumidos !: Array<Servico>;


	constructor(nome : string,nomeSocial : string, cpf : Cpf) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rgs = [];
        this.dataCadastro = new Date();
        this.telefones = [];
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
	}

    public get getCpf(){
        return this.cpf;
    }

    public get getRgs(){
        return this.rgs;
    }

    public get getDataC(){
        return this.dataCadastro;
    }

    public get getTelefones(){
        return this.telefones;
    }

    public get getProdutosConsumidos(){
        return this.produtosConsumidos;
    }

    public get getServicosConsumidos(){
        return this.produtosConsumidos;
    }
}