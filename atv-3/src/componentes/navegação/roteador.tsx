import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "../formularios/formularioCadastroCliente";
import ListaCliente from "../listagens/listaCliente";
import FormularioCadastroProduto from "../formularios/formularioCadastroProduto";
import FormularioCadastroServico from "../formularios/formularioCadastroServico";
import ListaProduto from "../listagens/listaProdutos";
import ListaServico from "../listagens/listaServicos";

const Roteador: React.FC = () => {
    const [tela, setTela] = useState<string>('ListagensClientes');

    const selecionarView = (novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evento.preventDefault();
        console.log(novaTela);
        setTela(novaTela);
    };

    const barraNavegacao = (
        <BarraNavegacao 
            seletorView={selecionarView} 
            tema="purple lighten-1" 
            botoes={['ListagensClientes', 'listagensProdutos', 'ListgensServiços', 'CadastroCliente', 'CadastroProduto', 'CadastroServiço']} 
        />
    );

    switch (tela) {
        case 'ListagensClientes':
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="purple lighten-2" />
                </>
            );
        case 'listagensProdutos':
            return (
                <>
                    {barraNavegacao}
                    <ListaProduto tema="purple lighten-2" />
                </>
            );
        case 'ListgensServiços':
            return (
                <>
                    {barraNavegacao}
                    <ListaServico tema="purple lighten-2" />
                </>
            );
        case 'CadastroCliente':
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple lighten-2" />
                </>
            );
        case 'CadastroProduto':
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProduto tema="purple lighten-2" />
                </>
            );
        case 'CadastroServiço':
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroServico tema="purple lighten-2" />
                </>
            );
        default:
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="purple lighten-2" />
                </>
            );
    }
};

export default Roteador;
