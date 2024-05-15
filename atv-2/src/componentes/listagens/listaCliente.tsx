import React, { Component, createRef } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';  // Importando o CSS Module

type Props = {
    tema: string;
};

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataNascimento: string;
    dataEmissaoCPF: string;
    rg: string;
    dataEmissaoRG: string;
    telefone: string;
    genero: string;
    email: string;
    quantidade?: number;
    valor?: number;
};

export default class ListaCliente extends Component<Props> {
    dropdownRefs: React.RefObject<HTMLUListElement>[] = [];

    constructor(props: Props) {
        super(props);
        this.dropdownRefs = [];
    }

    componentDidMount() {
        M.AutoInit();
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent) => {
        this.dropdownRefs.forEach(ref => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                const instance = M.Dropdown.getInstance(ref.current);
                if (instance) {
                    instance.close();
                }
            }
        });
    }

    handleEdit = (clienteId: number) => {
        console.log(`Edit client with ID: ${clienteId}`);
        // Adicione aqui a lógica para editar o cliente
    };

    handleDelete = (clienteId: number) => {
        console.log(`Delete client with ID: ${clienteId}`);
        // Adicione aqui a lógica para excluir o cliente
    };

    render() {
        const estilo = `collection-item active ${this.props.tema}`;

        const clientes: Cliente[] = [
            {
                id: 1,
                nome: "Cliente 1",
                nomeSocial: "Nome Social 1",
                cpf: "111.111.111-11",
                dataNascimento: "01/01/1990",
                dataEmissaoCPF: "01/01/2010",
                rg: "MG-11.111.111",
                dataEmissaoRG: "01/01/2010",
                telefone: "(11) 1111-1111",
                genero: "Masculino",
                email: "cliente1@example.com",
                quantidade: 120,
                valor: 500.00
            },
            {
                id: 2,
                nome: "Cliente 2",
                nomeSocial: "Nome Social 2",
                cpf: "222.222.222-22",
                dataNascimento: "02/02/1992",
                dataEmissaoCPF: "02/02/2012",
                rg: "MG-22.222.222",
                dataEmissaoRG: "02/02/2012",
                telefone: "(22) 2222-2222",
                genero: "Feminino",
                email: "cliente2@example.com",
                quantidade: 100,
                valor: 450.00
            },
            {
                id: 3,
                nome: "Cliente 3",
                nomeSocial: "Nome Social 3",
                cpf: "333.333.333-33",
                dataNascimento: "03/03/1993",
                dataEmissaoCPF: "03/03/2013",
                rg: "MG-33.333.333",
                dataEmissaoRG: "03/03/2013",
                telefone: "(33) 3333-3333",
                genero: "Masculino",
                email: "cliente3@example.com",
                quantidade: 90,
                valor: 300.00
            },
            {
                id: 4,
                nome: "Cliente 4",
                nomeSocial: "Nome Social 4",
                cpf: "444.444.444-44",
                dataNascimento: "04/04/1994",
                dataEmissaoCPF: "04/04/2014",
                rg: "MG-44.444.444",
                dataEmissaoRG: "04/04/2014",
                telefone: "(44) 4444-4444",
                genero: "Feminino",
                email: "cliente4@example.com",
                quantidade: 80,
                valor: 470.00
            }
        ];

        const clientesPorQuantidade = [...clientes].sort((a, b) => b.quantidade! - a.quantidade!).slice(0, 3);
        const clientesPorValor = [...clientes].sort((a, b) => b.valor! - a.valor!).slice(0, 3);

        return (
            <div className="container">
                <h5>Clientes</h5>
                <div className="collection">
                    {clientes.map((cliente, index) => {
                        const dropdownId = `dropdown${cliente.id}`;
                        const ref = createRef<HTMLUListElement>();
                        this.dropdownRefs[index] = ref;

                        return (
                            <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <a
                                    className="dropdown-trigger"
                                    href="#"
                                    data-target={dropdownId}
                                    style={{ flex: 1, cursor: 'pointer' }}
                                >
                                    {cliente.nome}
                                </a>
                                <div>
                                    <button onClick={() => this.handleEdit(cliente.id)} className="btn btn-small blue">Editar</button>
                                    <button onClick={() => this.handleDelete(cliente.id)} className="btn btn-small red">Excluir</button>
                                </div>
                                <ul
                                    id={dropdownId}
                                    className="dropdown-content"
                                    ref={ref}
                                >
                                    <li><span>Nome Social: {cliente.nomeSocial}</span></li>
                                    <li><span>CPF: {cliente.cpf}</span></li>
                                    <li><span>Data de Nascimento: {cliente.dataNascimento}</span></li>
                                    <li><span>Data de Emissão CPF: {cliente.dataEmissaoCPF}</span></li>
                                    <li><span>RG: {cliente.rg}</span></li>
                                    <li><span>Data de Emissão RG: {cliente.dataEmissaoRG}</span></li>
                                    <li><span>Telefone: {cliente.telefone}</span></li>
                                    <li><span>Gênero: {cliente.genero}</span></li>
                                    <li><span>Email: {cliente.email}</span></li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <h5>Clientes que mais consumiram por quantidade</h5>
                <div className="collection">
                    {clientesPorQuantidade.map((cliente, index) => {
                        const dropdownId = `dropdownQuantidade${cliente.id}`;
                        const ref = createRef<HTMLUListElement>();
                        this.dropdownRefs[clientes.length + index] = ref;

                        return (
                            <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <a
                                    className="dropdown-trigger"
                                    href="#"
                                    data-target={dropdownId}
                                    style={{ flex: 1, cursor: 'pointer' }}
                                >
                                    {cliente.nome}
                                </a>
                                <ul
                                    id={dropdownId}
                                    className="dropdown-content"
                                    ref={ref}
                                >
                                    <li><span>Quantidade: {cliente.quantidade}</span></li>
                                    <li><span>Valor: {cliente.valor?.toFixed(2)}</span></li>
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <h5>Clientes que mais consumiram por valor</h5>
                <div className="collection">
                    {clientesPorValor.map((cliente, index) => {
                        const dropdownId = `dropdownValor${cliente.id}`;
                        const ref = createRef<HTMLUListElement>();
                        this.dropdownRefs[clientes.length + clientesPorQuantidade.length + index] = ref;

                        return (
                            <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <a
                                    className="dropdown-trigger"
                                    href="#"
                                    data-target={dropdownId}
                                    style={{ flex: 1, cursor: 'pointer' }}
                                >
                                    {cliente.nome}
                                </a>
                                <ul
                                    id={dropdownId}
                                    className="dropdown-content"
                                    ref={ref}
                                >
                                    <li><span>Quantidade: {cliente.quantidade}</span></li>
                                    <li><span>Valor: {cliente.valor?.toFixed(2)}</span></li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
