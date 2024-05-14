import PromptSync from "prompt-sync";

export default class Entrada{
    public receberNumero(mensagem : string): number{
        let prompt = PromptSync();
        let valor = prompt(mensagem);
        let numero = new Number(valor);
        return numero.valueOf();
    }

    public receberTexto(mensagem:string) : string{
        let prompt = PromptSync();
        let texto = prompt(mensagem);
        return texto;
    }
}