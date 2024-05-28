import React, { useState, useEffect, useRef } from "react";
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

const ListaProduto: React.FC<Props> = ({ tema }) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [produtoGeneroSelecionado, setProdutoGeneroSelecionado] = useState<Produto | null>(null);
    const modalProdutoRef = useRef<HTMLDivElement>(null);
    const modalGeneroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        M.AutoInit();
    }, []);

    useEffect(() => {
        if (modalProdutoRef.current) {
            const modalProdutoInstance = M.Modal.init(modalProdutoRef.current);
            if (produtoSelecionado) {
                modalProdutoInstance.open();
            }
        }
    }, [produtoSelecionado]);

    useEffect(() => {
        if (modalGeneroRef.current) {
            const modalGeneroInstance = M.Modal.init(modalGeneroRef.current);
            if (produtoGeneroSelecionado) {
                modalGeneroInstance.open();
            }
        }
    }, [produtoGeneroSelecionado]);

    const handleItemClick = (produto: Produto) => {
        setProdutoSelecionado(produto);
    };

    const handleGeneroItemClick = (produto: Produto) => {
        setProdutoGeneroSelecionado(produto);
    };

    const handleCloseModal = () => {
        setProdutoSelecionado(null);
        setProdutoGeneroSelecionado(null);
    };

    const handleEdit = (produtoId: number) => {
        console.log(`Edit product with ID: ${produtoId}`);
        // Adicione aqui a lógica para editar o produto
    };

    const handleDelete = (produtoId: number) => {
        console.log(`Delete product with ID: ${produtoId}`);
        // Adicione aqui a lógica para excluir o produto
    };

    const estilo = `collection-item active ${tema}`;

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
                {produtos.map((produto) => (
                    <div key={produto.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleItemClick(produto)}
                            style={{ flex: 1, cursor: 'pointer' }}
                        >
                            {produto.nome}
                        </a>
                        <div>
                            <button onClick={() => handleEdit(produto.id)} className="btn btn-small blue">Editar</button>
                            <button onClick={() => handleDelete(produto.id)} className="btn btn-small red">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <h5>Produto Geral Mais Consumido</h5>
            <div className="collection">
                {produtoMaisConsumido && (
                    <div className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <a
                            onClick={() => handleGeneroItemClick(produtoMaisConsumido)}
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
                                onClick={() => handleGeneroItemClick(produto)}
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
            <div id="modalProduto" className="modal" ref={modalProdutoRef}>
                <div className="modal-content">
                    {produtoSelecionado && (
                        <>
                            <h4>{produtoSelecionado.nome}</h4>
                            <p><strong>Preço:</strong> {produtoSelecionado.preco}</p>
                            <p><strong>Quantidade em Estoque:</strong> {produtoSelecionado.quantidadeEstoque}</p>
                            <p><strong>Quantidade Vendida:</strong> {produtoSelecionado.quantidadeVendida}</p>
                            <p><strong>Gênero:</strong> {produtoSelecionado.genero}</p>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={handleCloseModal} className="modal-close btn-flat">Fechar</button>
                </div>
            </div>

            {/* Modal para informações de consumo do produto */}
            <div id="modalGenero" className="modal" ref={modalGeneroRef}>
                <div className="modal-content">
                    {produtoGeneroSelecionado && (
                        <>
                            <h4>{produtoGeneroSelecionado.nome}</h4>
                            <p><strong>Quantidade Vendida:</strong> {produtoGeneroSelecionado.quantidadeVendida}</p>
                            <p><strong>Preço:</strong> {produtoGeneroSelecionado.preco}</p>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={handleCloseModal} className="modal-close btn-flat">Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ListaProduto;
