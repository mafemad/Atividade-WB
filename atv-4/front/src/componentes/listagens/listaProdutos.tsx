import React, { Component, createRef } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';  // Importando o CSS Module

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

type State = {
    produtoSelecionado: Produto | null;
    produtoGeneroSelecionado: Produto | null;
};

export default class ListaProduto extends Component<Props, State> {
    modalProdutoRef: React.RefObject<HTMLDivElement> = createRef();
    modalGeneroRef: React.RefObject<HTMLDivElement> = createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            produtoSelecionado: null,
            produtoGeneroSelecionado: null
        };
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentDidUpdate() {
        if (this.modalProdutoRef.current) {
            M.Modal.init(this.modalProdutoRef.current);
        }
        if (this.modalGeneroRef.current) {
            M.Modal.init(this.modalGeneroRef.current);
        }
    }

    handleItemClick = (produto: Produto) => {
        this.setState({ produtoSelecionado: produto }, () => {
            const instance = M.Modal.getInstance(this.modalProdutoRef.current!);
            instance.open();
        });
    };

    handleGeneroItemClick = (produto: Produto) => {
        this.setState({ produtoGeneroSelecionado: produto }, () => {
            const instance = M.Modal.getInstance(this.modalGeneroRef.current!);
            instance.open();
        });
    };

    handleCloseModal = () => {
        this.setState({ produtoSelecionado: null, produtoGeneroSelecionado: null });
    };

    handleEdit = (produtoId: number) => {
        console.log(`Edit product with ID: ${produtoId}`);
        // Adicione aqui a lógica para editar o produto
    };

    handleDelete = (produtoId: number) => {
        console.log(`Delete product with ID: ${produtoId}`);
        // Adicione aqui a lógica para excluir o produto
    };

    render() {
        const estilo = `collection-item active ${this.props.tema}`;

        const produtos: Produto[] = [
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
            },
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
        ];

        const produtoMaisConsumido = [...produtos].sort((a, b) => b.quantidadeVendida! - a.quantidadeVendida!)[0];
        const produtoMaisConsumidoPorGenero = (genero: string) => 
            [...produtos].filter(p => p.genero === genero).sort((a, b) => b.quantidadeVendida! - a.quantidadeVendida!)[0];

        return (
            <div className="container">
                <h5>Produtos</h5>
                <div className="collection">
                    {produtos.map((produto, index) => (
                        <div key={produto.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleItemClick(produto)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {produto.nome}
                            </a>
                            <div>
                                <button onClick={() => this.handleEdit(produto.id)} className="btn btn-small blue">Editar</button>
                                <button onClick={() => this.handleDelete(produto.id)} className="btn btn-small red">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <h5>Produto Geral Mais Consumido</h5>
                <div className="collection">
                    {produtoMaisConsumido && (
                        <div className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleGeneroItemClick(produtoMaisConsumido)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {produtoMaisConsumido.nome}
                            </a>
                            <ul className="dropdown-content">
                                <li><span>Quantidade Vendida: {produtoMaisConsumido.quantidadeVendida}</span></li>
                                <li><span>Preço: {produtoMaisConsumido.preco?.toFixed(2)}</span></li>
                            </ul>
                        </div>
                    )}
                </div>

                <h5>Produto Mais Consumido por Gênero</h5>
                <div className="collection">
                    {["Masculino", "Feminino", "Unissex"].map(genero => {
                        const produto = produtoMaisConsumidoPorGenero(genero);
                        return produto && (
                            <div key={produto.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <a
                                    onClick={() => this.handleGeneroItemClick(produto)}
                                    style={{ flex: 1, cursor: 'pointer' }}
                                >
                                    {produto.nome} ({genero})
                                </a>
                                <ul className="dropdown-content">
                                    <li><span>Quantidade Vendida: {produto.quantidadeVendida}</span></li>
                                    <li><span>Preço: {produto.preco?.toFixed(2)}</span></li>
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Modal para todas as informações do produto */}
                <div id="modalProduto" className="modal" ref={this.modalProdutoRef}>
                    <div className="modal-content">
                        {this.state.produtoSelecionado && (
                            <>
                                <h4>{this.state.produtoSelecionado.nome}</h4>
                                <p><strong>Preço:</strong> {this.state.produtoSelecionado.preco}</p>
                                <p><strong>Quantidade em Estoque:</strong> {this.state.produtoSelecionado.quantidadeEstoque}</p>
                                <p><strong>Quantidade Vendida:</strong> {this.state.produtoSelecionado.quantidadeVendida}</p>
                                <p><strong>Gênero:</strong> {this.state.produtoSelecionado.genero}</p>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleCloseModal} className="modal-close btn-flat">Fechar</button>
                    </div>
                </div>

                {/* Modal para informações de consumo do produto */}
                <div id="modalGenero" className="modal" ref={this.modalGeneroRef}>
                    <div className="modal-content">
                        {this.state.produtoGeneroSelecionado && (
                            <>
                                <h4>{this.state.produtoGeneroSelecionado.nome}</h4>
                                <p><strong>Quantidade Vendida:</strong> {this.state.produtoGeneroSelecionado.quantidadeVendida}</p>
                                <p><strong>Preço:</strong> {this.state.produtoGeneroSelecionado.preco}</p>
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
