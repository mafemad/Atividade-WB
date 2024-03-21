export default class Rg{
    private valor !: string;
    private dataEmissao !: Date;


	constructor(valor : string, data : Date) {
        this.valor = valor;
        this.dataEmissao = data;
	}

    public get getValor(){
        return this.valor;
    }

    public get getDataEmissao(){
        return this.dataEmissao;
    }
    
    public set setValor(valor: string) {
        this.valor = valor;
    }
    public set setDataEmissao(dataEmissao: Date) {
        this.dataEmissao = dataEmissao;
    }
}