export default class Cpf{
    private valor !: string;
    private dataEmissao !: Date;

    constructor(valor : string, data : Date){
        this.valor = valor;
        this.dataEmissao = data;
    }

    public get getValor(){
        return this.valor;
    }

    public get getDataEmissao(){
        return this.dataEmissao;
    }
}