import React, { useState, useEffect, useRef } from 'react';
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

const ListaCliente: React.FC<Props> = ({ tema }) => {
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [clienteProdutoSelecionado, setClienteProdutoSelecionado] = useState<Cliente | null>(null);
    const [clienteServicoSelecionado, setClienteServicoSelecionado] = useState<Cliente | null>(null);

    const modalClienteRef = useRef<HTMLDivElement>(null);
    const modalProdutoRef = useRef<HTMLDivElement>(null);
    const modalServicoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Inicialize todos os modais
        M.Modal.init(modalClienteRef.current!);
        M.Modal.init(modalProdutoRef.current!);
        M.Modal.init(modalServicoRef.current!);
    }, []);

    const handleItemClick = (cliente: Cliente) => {
        setClienteSelecionado(cliente);
        const instance = M.Modal.getInstance(modalClienteRef.current!);
        instance.open();
    };

    const handleProdutoItemClick = (cliente: Cliente) => {
        setClienteProdutoSelecionado(cliente);
        const instance = M.Modal.getInstance(modalProdutoRef.current!);
        instance.open();
    };

    const handleServicoItemClick = (cliente: Cliente) => {
        setClienteServicoSelecionado(cliente);
        const instance = M.Modal.getInstance(modalServicoRef.current!);
        instance.open();
    };

    const handleCloseModal = () => {
        setClienteSelecionado(null);
        setClienteProdutoSelecionado(null);
        setClienteServicoSelecionado(null);
    };

    const handleEdit = (clienteId: number) => {
        console.log(`Edit client with ID: ${clienteId}`);
        // Adicione aqui a lógica para editar o cliente
    };

    const handleDelete = (clienteId: number) => {
        console.log(`Delete client with ID: ${clienteId}`);
        // Adicione aqui a lógica para excluir o cliente
    };

    const estilo = `collection-item active ${tema}`;

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
            produtosComprados: [
                {
                    id: 5,
                    nome: "Perfume",
                    preco: 150.00,
                    quantidadeEstoque: 20,
                    quantidadeVendida: 30,
                    genero: "Unissex"
                },
                {
                    id: 6,
                    nome: "Gel de Banho",
                    preco: 40.00,
                    quantidadeEstoque: 60,
                    quantidadeVendida: 90,
                    genero: "Masculino"
                }
            ],
            servicosConsumidos: [
                {
                    id: 5,
                    nome: "Barbearia",
                    preco: 60.00,
                    duracaoMinutos: 45,
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
            produtosComprados: [
                {
                    id: 7,
                    nome: "Batom",
                    preco: 20.00,
                    quantidadeEstoque: 50,
                    quantidadeVendida: 80,
                    genero: "Feminino"
                },
                {
                    id: 8,
                    nome: "Base",
                    preco: 60.00,
                    quantidadeEstoque: 30,
                    quantidadeVendida: 70,
                    genero: "Feminino"
                }
            ],
            servicosConsumidos: [
                {
                    id: 6,
                    nome: "Pintura de Unhas",
                    preco: 35.00,
                    duracaoMinutos: 60,
                },
                {
                    id: 7,
                    nome: "Penteado",
                    preco: 50.00,
                    duracaoMinutos: 40,
                }
            ]
        },
        {
            id: 5,
            nome: "Cliente 5",
            nomeSocial: "Nome Social 5",
            cpf: "555.555.555-55",
            dataNascimento: "05/05/1995",
            dataEmissaoCPF: "05/05/2015",
            rg: "MG-55.555.555",
            dataEmissaoRG: "05/05/2015",
            telefone: "(55) 5555-5555",
            genero: "Masculino",
            email: "cliente5@example.com",
            produtosComprados: [
                {
                    id: 9,
                    nome: "Mousse de Cabelo",
                    preco: 25.00,
                    quantidadeEstoque: 40,
                    quantidadeVendida: 50,
                    genero: "Masculino"
                },
                {
                    id: 10,
                    nome: "Cera Capilar",
                    preco: 35.00,
                    quantidadeEstoque: 30,
                    quantidadeVendida: 60,
                    genero: "Masculino"
                }
            ],
            servicosConsumidos: [
                {
                    id: 8,
                    nome: "Pedicure",
                    preco: 30.00,
                    duracaoMinutos: 50,
                },
                {
                    id: 9,
                    nome: "Tratamento Capilar",
                    preco: 70.00,
                    duracaoMinutos: 80,
                }
            ]
        },
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
        const valorA = a.servicosConsumidos.reduce((sum, servico) => sum + servico.preco, 0);
        const valorB = b.servicosConsumidos.reduce((sum, servico) => sum + servico.preco, 0);
        return valorB - valorA;
    }).slice(0, 3);
    
    return (
        <div className="container">
            <h5>Clientes</h5>
            <div className="collection">
                {clientes.map((cliente) => (
                    <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleItemClick(cliente)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {cliente.nome}
                        </a>
                        <div>
                            <button onClick={() => handleEdit(cliente.id)} className="btn btn-small blue">Editar</button>
                            <button onClick={() => handleDelete(cliente.id)} className="btn btn-small red">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <h5>Clientes que mais consumiram produtos por quantidade</h5>
            <div className="collection">
                {produtosPorQuantidade.map((cliente) => (
                    <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleProdutoItemClick(cliente)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {cliente.nome}
                        </a>
                    </div>
                ))}
            </div>

            <h5>Clientes que mais consumiram produtos por valor</h5>
            <div className="collection">
                {produtosPorValor.map((cliente) => (
                    <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleProdutoItemClick(cliente)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {cliente.nome}
                        </a>
                    </div>
                ))}
            </div>
            <h5>Clientes que mais consumiram serviços por quantidade</h5>
            <div className="collection">
                {servicosPorQuantidade.map((cliente) => (
                    <div key={cliente.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleServicoItemClick(cliente)}
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
                            onClick={() => handleServicoItemClick(cliente)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {cliente.nome}
                        </a>
                    </div>
                ))}
            </div>


            {/* Modal para todas as informações do cliente */}
            <div id="modal-cliente" className="modal" ref={modalClienteRef}>
                <div className="modal-content">
                    {clienteSelecionado && (
                        <>
                            <h4>{clienteSelecionado.nome}</h4>
                            <p><strong>Nome Social:</strong> {clienteSelecionado.nomeSocial}</p>
                            <p><strong>CPF:</strong> {clienteSelecionado.cpf}</p>
                            <p><strong>Data de Nascimento:</strong> {clienteSelecionado.dataNascimento}</p>
                            <p><strong>Data de Emissão CPF:</strong> {clienteSelecionado.dataEmissaoCPF}</p>
                            <p><strong>RG:</strong> {clienteSelecionado.rg}</p>
                            <p><strong>Data de Emissão RG:</strong> {clienteSelecionado.dataEmissaoRG}</p>
                            <p><strong>Telefone:</strong> {clienteSelecionado.telefone}</p>
                            <p><strong>Gênero:</strong> {clienteSelecionado.genero}</p>
                            <p><strong>Email:</strong> {clienteSelecionado.email}</p>
                            <h5>Produtos Comprados</h5>
                            <ul className="collection">
                                {clienteSelecionado.produtosComprados.map((produto) => (
                                    <li key={produto.id} className="collection-item">
                                    <span className="title">{produto.nome}</span>
                                    <p>
                                        Preço: R${produto.preco.toFixed(2)}
                                    </p>
                                </li>
                            ))}

                            </ul>
                            <h5>Serviços Consumidos</h5>
                            <ul className="collection">
                                {clienteSelecionado.servicosConsumidos.map((servico) => (
                                    <li key={servico.id} className="collection-item">
                                    <span className="title">{servico.nome}</span>
                                    <p>
                                        Preço: R${servico.preco.toFixed(2)} <br />
                                        Duração: {servico.duracaoMinutos} minutos
                                    </p>
                                </li>
                            ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-close btn waves-effect waves-green" onClick={handleCloseModal}>Fechar</button>
                </div>
            </div>

            {/* Modal para produtos do cliente */}
            <div id="modal-produto" className="modal" ref={modalProdutoRef}>
                <div className="modal-content">
                    {clienteProdutoSelecionado && (
                        <>
                            <h4>Produtos consumidos por {clienteProdutoSelecionado.nome}</h4>
                            <ul className="collection">
                                {clienteProdutoSelecionado.produtosComprados.map((produto) => (
                                    <li key={produto.id} className="collection-item">
                                        <span className="title">{produto.nome}</span>
                                        <p>
                                            Preço: R${produto.preco.toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={handleCloseModal}>Fechar</button>
                </div>
            </div>

            {/* Modal para serviços do cliente */}
            <div id="modal-servico" className="modal" ref={modalServicoRef}>
                <div className="modal-content">
                    {clienteServicoSelecionado && (
                        <>
                            <h4>Serviços consumidos por {clienteServicoSelecionado.nome}</h4>
                            <ul className="collection">
                                {clienteServicoSelecionado.servicosConsumidos.map((servico) => (
                                    <li key={servico.id} className="collection-item">
                                        <span className="title">{servico.nome}</span>
                                        <p>
                                            Preço: R${servico.preco.toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={handleCloseModal}>Fechar</button>
                </div>
            </div>

        </div>
    );
};

export default ListaCliente;
