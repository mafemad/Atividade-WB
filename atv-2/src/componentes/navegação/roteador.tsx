import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "../formularios/formularioCadastroCliente";
import ListaCliente from "../listagens/listaCliente";
import FormularioCadastroProduto from "../formularios/formularioCadastroProduto";
import FormularioCadastroServico from "../formularios/formularioCadastroServico";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'ListagensClientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="purple lighten-1" botoes={['ListagensClientes', 'listagensProdutos', 'ListgensServiços', 'CadastroCliente','CadastroProduto', 'CadastroServiço']} />
        if (this.state.tela === 'ListagensClientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="purple lighten-2" />
                </>
            )
        }else if(this.state.tela === 'listagensProdutos') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple lighten-2" />
                </>
            )
        }else if(this.state.tela === 'ListgensServiços') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple lighten-2" />
                </>
            )
        } else if(this.state.tela === 'CadastroCliente') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple lighten-2" />
                </>
            )
        }else if(this.state.tela === 'CadastroProduto') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProduto tema="purple lighten-2" />
                </>
            )
        }else if(this.state.tela === 'CadastroServiço') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroServico tema="purple lighten-2" />
                </>
            )
        }

    }
}