import React, { Component, createRef } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: number;
    quantidadeEstoque: number;
    quantidadeVendida?: number;
    genero?: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracaoMinutos: number;
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
    produtosComprados: Produto[];
    servicosConsumidos: Servico[];
};

type State = {
    clienteSelecionado: Cliente | null;
    clienteConsumoSelecionado: Cliente | null;
};

export default class ListaCliente extends Component<Props, State> {
    modalClienteRef: React.RefObject<HTMLDivElement> = createRef();
    modalConsumoRef: React.RefObject<HTMLDivElement> = createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            clienteSelecionado: null,
            clienteConsumoSelecionado: null
        };
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentDidUpdate() {
        if (this.modalClienteRef.current) {
            M.Modal.init(this.modalClienteRef.current);
        }
        if (this.modalConsumoRef.current) {
            M.Modal.init(this.modalConsumoRef.current);
        }
    }

    handleItemClick = (cliente: Cliente) => {
        this.setState({ clienteSelecionado: cliente }, () => {
            const instance = M.Modal.getInstance(this.modalClienteRef.current!);
            instance.open();
        });
    };

    handleConsumoItemClick = (cliente: Cliente) => {
        this.setState({ clienteConsumoSelecionado: cliente }, () => {
            const instance = M.Modal.getInstance(this.modalConsumoRef.current!);
            instance.open();
        });
    };

    handleCloseModal = () => {
        this.setState({ clienteSelecionado: null, clienteConsumoSelecionado: null });
    };

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
                produtosComprados: [
                    {
                        id: 1,
                        nome: "Xampu",
                        preco: 20.00,
                        quantidadeEstoque: 50,
                        quantidadeVendida: 100,
                        genero: "Unissex"
                    },
                    {
                        id: 2,
                        nome: "Condicionador",
                        preco: 25.00,
                        quantidadeEstoque: 40,
                        quantidadeVendida: 80,
                        genero: "Feminino"
                    }
                ],
                servicosConsumidos: [
                    {
                        id: 2,
                        nome: "Corte de Cabelo",
                        preco: 40.00,
                        duracaoMinutos: 30,                     
                    },
                    {
                        id: 1,
                        nome: "Massagem Relaxante",
                        preco: 80.00,
                        duracaoMinutos: 60,                     
                    },
                    {
                        id: 3,
                        nome: "Manicure",
                        preco: 25.00,
                        duracaoMinutos: 45,
                    }
                ]
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
                produtosComprados: [
                    {
                        id: 3,
                        nome: "Creme Hidratante",
                        preco: 30.00,
                        quantidadeEstoque: 30,
                        quantidadeVendida: 60,
                        genero: "Masculino"
                    },
                    {
                        id: 4,
                        nome: "Sabonete",
                        preco: 10.00,
                        quantidadeEstoque: 100,
                        quantidadeVendida: 150,
                        genero: "Unissex"
                    }
                ],
                servicosConsumidos: [
                    {
                        id: 2,
                        nome: "Corte de Cabelo",
                        preco: 40.00,
                        duracaoMinutos: 30,                     
                    },
                    {
                        id: 4,
                        nome: "Limpeza de Pele",
                        preco: 100.00,
                        duracaoMinutos: 90,
                    }
                ]
            }
        ];

        const produtosPorQuantidade = [...clientes].sort((a, b) => {
            const totalA = a.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0), 0);
            const totalB = b.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0), 0);
            return totalB - totalA;
        }).slice(0, 3);

        const produtosPorValor = [...clientes].sort((a, b) => {
            const valorA = a.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0) * prod.preco, 0);
            const valorB = b.produtosComprados.reduce((sum, prod) => sum + (prod.quantidadeVendida || 0) * prod.preco, 0);
            return valorB - valorA;
        }).slice(0, 3);

        const servicosPorQuantidade = [...clientes].sort((a, b) => {
            const totalA = a.produtosComprados.length;
            const totalB = b.produtosComprados.length;
            return totalB - totalA;
        }).slice(0, 3);

        const servicosPorValor = [...clientes].sort((a, b) => {
            const valorA = a.servicosConsumidos.reduce((sum, prod) => sum + (prod.preco || 0) * prod.preco, 0);
            const valorB = b.servicosConsumidos.reduce((sum, prod) => sum + (prod.preco || 0) * prod.preco, 0);
            return valorB - valorA;
        }).slice(0, 3);

        return (
            <div className="container">
                <h5>Clientes</h5>
                <div className="collection">
                    {clientes.map((cliente, index) => (
                        <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleItemClick(cliente)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {cliente.nome}
                            </a>
                            <div>
                                <button onClick={() => this.handleEdit(cliente.id)} className="btn btn-small blue">Editar</button>
                                <button onClick={() => this.handleDelete(cliente.id)} className="btn btn-small red">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <h5>Clientes que mais consumiram produtos por quantidade</h5>
                <div className="collection">
                    {produtosPorQuantidade.map((cliente, index) => (
                        <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleConsumoItemClick(cliente)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {cliente.nome}
                            </a>
                        </div>
                    ))}
                </div>

                <h5>Clientes que mais consumiram produtos por valor</h5>
                <div className="collection">
                    {produtosPorValor.map((cliente, index) => (
                        <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleConsumoItemClick(cliente)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {cliente.nome}
                            </a>
                        </div>
                    ))}
                </div>
                <h5>Clientes que mais consumiram serviços por quantidade</h5>
                <div className="collection">
                    {servicosPorQuantidade.map((cliente, index) => (
                        <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleConsumoItemClick(cliente)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {cliente.nome}
                            </a>
                        </div>
                    ))}
                </div>

                <h5>Clientes que mais consumiram serviços por valor</h5>
                <div className="collection">
                    {servicosPorValor.map((cliente, index) => (
                        <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleConsumoItemClick(cliente)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {cliente.nome}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Modal para todas as informações do cliente */}
                <div id="modalCliente" className="modal" ref={this.modalClienteRef}>
                    <div className="modal-content">
                        {this.state.clienteSelecionado && (
                            <>
                                <h4>{this.state.clienteSelecionado.nome}</h4>
                                <p><strong>Nome Social:</strong> {this.state.clienteSelecionado.nomeSocial}</p>
                                <p><strong>CPF:</strong> {this.state.clienteSelecionado.cpf}</p>
                                <p><strong>Data de Nascimento:</strong> {this.state.clienteSelecionado.dataNascimento}</p>
                                <p><strong>Data de Emissão CPF:</strong> {this.state.clienteSelecionado.dataEmissaoCPF}</p>
                                <p><strong>RG:</strong> {this.state.clienteSelecionado.rg}</p>
                                <p><strong>Data de Emissão RG:</strong> {this.state.clienteSelecionado.dataEmissaoRG}</p>
                                <p><strong>Telefone:</strong> {this.state.clienteSelecionado.telefone}</p>
                                <p><strong>Gênero:</strong> {this.state.clienteSelecionado.genero}</p>
                                <p><strong>Email:</strong> {this.state.clienteSelecionado.email}</p>
                                <p><strong>Produtos Comprados:</strong></p>
                                <ul>
                                    {this.state.clienteSelecionado.produtosComprados.map(produto => (
                                        <li key={produto.id}>{produto.nome} - Quantidade: {produto.quantidadeVendida}</li>
                                    ))}
                                </ul>
                                <p><strong>Serviços consumidos:</strong></p>
                                <ul>
                                    {this.state.clienteSelecionado.servicosConsumidos.map(produto => (
                                        <li key={produto.id}>{produto.nome} - Duração: {produto.duracaoMinutos} minutos</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleCloseModal} className="modal-close btn-flat">Fechar</button>
                    </div>
                </div>

                {/* Modal para informações de consumo do cliente */}
                <div id="modalConsumo" className="modal" ref={this.modalConsumoRef}>
                    <div className="modal-content">
                        {this.state.clienteConsumoSelecionado && (
                            <>
                                <h4>{this.state.clienteConsumoSelecionado.nome}</h4>
                                <p><strong>Produtos Comprados:</strong></p>
                                <ul>
                                    {this.state.clienteConsumoSelecionado.produtosComprados.map(produto => (
                                        <li key={produto.id}>{produto.nome} - Quantidade: {produto.quantidadeVendida}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleCloseModal} className="modal-close btn-flat">Fechar</button>
                    </div>
                </div>
                {/* Modal para informações de consumo do cliente */}
                <div id="modalConsumoServico" className="modal" ref={this.modalConsumoRef}>
                    <div className="modal-content">
                        {this.state.clienteConsumoSelecionado && (
                            <>
                                <h4>{this.state.clienteConsumoSelecionado.nome}</h4>
                                <p><strong>Serviços consumidos:</strong></p>
                                <ul>
                                    {this.state.clienteConsumoSelecionado.servicosConsumidos.map(produto => (
                                        <li key={produto.id}>{produto.nome} - Duração: {produto.duracaoMinutos} minutos</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleCloseModal} className="modal-close btn-flat">Fechar</button>
                    </div>
                </div>
            </div>
        );
    }
}
