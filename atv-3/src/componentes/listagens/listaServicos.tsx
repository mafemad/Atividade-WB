import React, { Component, createRef } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';  // Importando o CSS Module

type Props = {
    tema: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracaoMinutos: number;
    quantidadeAgendamentos?: number;
    genero?: string;
};

type State = {
    servicoSelecionado: Servico | null;
    servicoGeneroSelecionado: Servico | null;
};

export default class ListaServico extends Component<Props, State> {
    modalServicoRef: React.RefObject<HTMLDivElement> = createRef();
    modalGeneroRef: React.RefObject<HTMLDivElement> = createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            servicoSelecionado: null,
            servicoGeneroSelecionado: null
        };
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentDidUpdate() {
        if (this.modalServicoRef.current) {
            M.Modal.init(this.modalServicoRef.current);
        }
        if (this.modalGeneroRef.current) {
            M.Modal.init(this.modalGeneroRef.current);
        }
    }

    handleItemClick = (servico: Servico) => {
        this.setState({ servicoSelecionado: servico }, () => {
            const instance = M.Modal.getInstance(this.modalServicoRef.current!);
            instance.open();
        });
    };

    handleGeneroItemClick = (servico: Servico) => {
        this.setState({ servicoGeneroSelecionado: servico }, () => {
            const instance = M.Modal.getInstance(this.modalGeneroRef.current!);
            instance.open();
        });
    };

    handleCloseModal = () => {
        this.setState({ servicoSelecionado: null, servicoGeneroSelecionado: null });
    };

    handleEdit = (servicoId: number) => {
        console.log(`Edit service with ID: ${servicoId}`);
        // Adicione aqui a lógica para editar o serviço
    };

    handleDelete = (servicoId: number) => {
        console.log(`Delete service with ID: ${servicoId}`);
        // Adicione aqui a lógica para excluir o serviço
    };

    render() {
        const estilo = `collection-item active ${this.props.tema}`;

        const servicos: Servico[] = [
            {
                id: 1,
                nome: "Massagem Relaxante",
                preco: 80.00,
                duracaoMinutos: 60,
                quantidadeAgendamentos: 50,
                genero: "Unissex"
            },
            {
                id: 2,
                nome: "Corte de Cabelo",
                preco: 40.00,
                duracaoMinutos: 30,
                quantidadeAgendamentos: 80,
                genero: "Masculino"
            },
            {
                id: 3,
                nome: "Manicure",
                preco: 25.00,
                duracaoMinutos: 45,
                quantidadeAgendamentos: 60,
                genero: "Feminino"
            },
            {
                id: 4,
                nome: "Limpeza de Pele",
                preco: 100.00,
                duracaoMinutos: 90,
                quantidadeAgendamentos: 30,
                genero: "Feminino"
            }
        ];

        const servicoMaisAgendado = [...servicos].sort((a, b) => b.quantidadeAgendamentos! - a.quantidadeAgendamentos!)[0];
        const servicoMaisAgendadoPorGenero = (genero: string) => 
            [...servicos].filter(s => s.genero === genero).sort((a, b) => b.quantidadeAgendamentos! - a.quantidadeAgendamentos!)[0];

        return (
            <div className="container">
                <h5>Serviços</h5>
                <div className="collection">
                    {servicos.map((servico, index) => (
                        <div key={servico.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleItemClick(servico)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {servico.nome}
                            </a>
                            <div>
                                <button onClick={() => this.handleEdit(servico.id)} className="btn btn-small blue">Editar</button>
                                <button onClick={() => this.handleDelete(servico.id)} className="btn btn-small red">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <h5>Serviço Mais Agendado Geral</h5>
                <div className="collection">
                    {servicoMaisAgendado && (
                        <div className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                onClick={() => this.handleGeneroItemClick(servicoMaisAgendado)}
                                style={{ flex: 1, cursor: 'pointer' }}
                            >
                                {servicoMaisAgendado.nome}
                            </a>
                            <ul className="dropdown-content">
                                <li><span>Quantidade de Agendamentos: {servicoMaisAgendado.quantidadeAgendamentos}</span></li>
                                <li><span>Preço: {servicoMaisAgendado.preco?.toFixed(2)}</span></li>
                            </ul>
                        </div>
                    )}
                </div>

                <h5>Serviço Mais Agendado por Gênero</h5>
                <div className="collection">
                    {["Masculino", "Feminino", "Unissex"].map(genero => {
                        const servico = servicoMaisAgendadoPorGenero(genero);
                        return servico && (
                            <div key={servico.id} className={`collection-item ${styles.collectionItemHover}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <a
                                    onClick={() => this.handleGeneroItemClick(servico)}
                                    style={{ flex: 1, cursor: 'pointer' }}
                                >
                                    {servico.nome} ({genero})
                                </a>
                                <ul className="dropdown-content">
                                    <li><span>Quantidade de Agendamentos: {servico.quantidadeAgendamentos}</span></li>
                                    <li><span>Preço: {servico.preco?.toFixed(2)}</span></li>
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Modal para todas as informações do serviço */}
                <div id="modalServico" className="modal" ref={this.modalServicoRef}>
                     <div className="modal-content">
                        {this.state.servicoSelecionado && (
                            <>
                                <h4>{this.state.servicoSelecionado.nome}</h4>
                                <p><strong>Preço:</strong> {this.state.servicoSelecionado.preco}</p>
                                <p><strong>Duração (minutos):</strong> {this.state.servicoSelecionado.duracaoMinutos}</p>
                                <p><strong>Quantidade de Agendamentos:</strong> {this.state.servicoSelecionado.quantidadeAgendamentos}</p>
                                <p><strong>Gênero:</strong> {this.state.servicoSelecionado.genero}</p>
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
                        {this.state.servicoGeneroSelecionado && (
                            <>
                                <h4>{this.state.servicoGeneroSelecionado.nome}</h4>
                                <p><strong>Quantidade Vendida:</strong> {this.state.servicoGeneroSelecionado.quantidadeAgendamentos}</p>
                                <p><strong>Preço:</strong> {this.state.servicoGeneroSelecionado.preco}</p>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleCloseModal} className="modal-close btn-flat">Fechar</button>
                    </div>
                </div>
            </div>)
        }   
    }      
