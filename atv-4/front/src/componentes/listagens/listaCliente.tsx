import React, { Component, createRef } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string;
};

type Endereco = {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
};

type Telefone = {
    ddd: string;
    numero: string;
};

type Cliente = {
    id: number;
    nome: string;
    sobreNome: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
};

type State = {
    clientes: Cliente[];
    clienteSelecionado: Cliente | null;
};

export default class ListaCliente extends Component<Props, State> {
    modalClienteRef = createRef<HTMLDivElement>();
    modalEditarRef = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [],
            clienteSelecionado: null
        };
    }

    componentDidMount() {
        this.fetchClientes();
        if (this.modalClienteRef.current) {
            M.Modal.init(this.modalClienteRef.current);
        }
        if (this.modalEditarRef.current) {
            M.Modal.init(this.modalEditarRef.current);
        }
    }

    fetchClientes = () => {
        fetch('http://localhost:32832/clientes')
            .then(response => response.json())
            .then(data => this.setState({ clientes: data }))
            .catch(error => console.error('Erro:', error));
    }

    handleItemClick = (cliente: Cliente) => {
        this.setState({ clienteSelecionado: cliente }, () => {
            if (this.modalClienteRef.current) {
                const modal = M.Modal.getInstance(this.modalClienteRef.current);
                modal.open();
            }
        });
    }

    handleEditClick = (cliente: Cliente) => {
        this.setState({ clienteSelecionado: cliente }, () => {
            if (this.modalEditarRef.current) {
                const modal = M.Modal.getInstance(this.modalEditarRef.current);
                modal.open();
            }
        });
    }

    handleCloseModal = () => {
        if (this.modalClienteRef.current) {
            const modal = M.Modal.getInstance(this.modalClienteRef.current);
            modal.close();
        }
        if (this.modalEditarRef.current) {
            const modal = M.Modal.getInstance(this.modalEditarRef.current);
            modal.close();
        }
        this.setState({ clienteSelecionado: null });
    }

    handleDelete = (cliente: Cliente) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            fetch('http://localhost:32832/cliente/excluir', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            })
                .then(response => response.ok ? this.fetchClientes() : alert("Erro ao excluir cliente"))
                .catch(error => console.error('Erro:', error));
        }
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            clienteSelecionado: {
                ...prevState.clienteSelecionado!,
                [name]: value
            }
        }));
    }

    handleEditSubmit = () => {
        const { clienteSelecionado } = this.state;
        if (clienteSelecionado) {
            fetch('http://localhost:32832/cliente/atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteSelecionado)
            })
                .then(response => response.ok ? this.fetchClientes() : alert("Erro ao editar cliente"))
                .catch(error => console.error('Erro:', error));
            this.handleCloseModal();
        }
    }

    render() {
        const { clientes, clienteSelecionado } = this.state;
        let estilo = `collection-item avatar ${styles.customStyle}`;

        return (
            <div className="container">
                <h4 className="center-align">Lista de Clientes</h4>
                <ul className="collection with-header">
                    <li className="collection-header"><h5>Clientes</h5></li>
                    {clientes.map((cliente) => (
                        <li key={cliente.id} className={estilo} style={{ padding: '20px' }}>
                            <div className="row valign-wrapper">
                                <div className="col s8" onClick={() => this.handleItemClick(cliente)} style={{ cursor: 'pointer' }}>
                                    <span className="title" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                                        {cliente.nome} {cliente.sobreNome}
                                    </span>
                                    <p>{cliente.email}</p>
                                </div>
                                <div className="col s4 right-align">
                                    <button onClick={() => this.handleEditClick(cliente)} className="btn blue" style={{ marginRight: '10px' }}>Editar</button>
                                    <button onClick={() => this.handleDelete(cliente)} className="btn red">Excluir</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div ref={this.modalClienteRef} id="modal-cliente" className="modal">
                    <div className="modal-content">
                        <h4>Informações do Cliente</h4>
                        {clienteSelecionado && (
                            <div>
                                <p><strong>Nome:</strong> {clienteSelecionado.nome}</p>
                                <p><strong>Sobrenome:</strong> {clienteSelecionado.sobreNome}</p>
                                <p><strong>Email:</strong> {clienteSelecionado.email}</p>
                                <h5>Endereço</h5>
                                <p><strong>Estado:</strong> {clienteSelecionado.endereco.estado}</p>
                                <p><strong>Cidade:</strong> {clienteSelecionado.endereco.cidade}</p>
                                <p><strong>Bairro:</strong> {clienteSelecionado.endereco.bairro}</p>
                                <p><strong>Rua:</strong> {clienteSelecionado.endereco.rua}</p>
                                <p><strong>Número:</strong> {clienteSelecionado.endereco.numero}</p>
                                <p><strong>Código Postal:</strong> {clienteSelecionado.endereco.codigoPostal}</p>
                                <p><strong>Informações Adicionais:</strong> {clienteSelecionado.endereco.informacoesAdicionais}</p>
                                <h5>Telefones</h5>
                                {clienteSelecionado.telefones.map((telefone, index) => (
                                    <p key={index}><strong>({telefone.ddd}) {telefone.numero}</strong></p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.handleCloseModal}>Fechar</a>
                    </div>
                </div>

                <div ref={this.modalEditarRef} id="modal-editar" className="modal">
                    <div className="modal-content">
                        <h4>Editar Cliente</h4>
                        {clienteSelecionado && (
                            <div>
                                <div className="input-field">
                                    <input type="text" name="nome" value={clienteSelecionado.nome} onChange={this.handleInputChange} />
                                    <label className="active">Nome</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="sobreNome" value={clienteSelecionado.sobreNome} onChange={this.handleInputChange} />
                                    <label className="active">Sobrenome</label>
                                </div>
                                <div className="input-field">
                                    <input type="email" name="email" value={clienteSelecionado.email} onChange={this.handleInputChange} />
                                    <label className="active">Email</label>
                                </div>
                                {/* Endereço */}
                                <h5>Endereço</h5>
                                <div className="input-field">
                                    <input type="text" name="estado" value={clienteSelecionado.endereco.estado} onChange={this.handleInputChange} />
                                    <label className="active">Estado</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="cidade" value={clienteSelecionado.endereco.cidade} onChange={this.handleInputChange} />
                                    <label className="active">Cidade</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="bairro" value={clienteSelecionado.endereco.bairro} onChange={this.handleInputChange} />
                                    <label className="active">Bairro</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="rua" value={clienteSelecionado.endereco.rua} onChange={this.handleInputChange} />
                                    <label className="active">Rua</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="numero" value={clienteSelecionado.endereco.numero} onChange={this.handleInputChange} />
                                    <label className="active">Número</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="codigoPostal" value={clienteSelecionado.endereco.codigoPostal} onChange={this.handleInputChange} />
                                    <label className="active">Código Postal</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" name="informacoesAdicionais" value={clienteSelecionado.endereco.informacoesAdicionais} onChange={this.handleInputChange} />
                                    <label className="active">Informações Adicionais</label>
                                </div>
                                {/* Telefones */}
                                <h5>Telefones</h5>
                                {clienteSelecionado.telefones.map((telefone, index) => (
                                    <div key={index}>
                                        <div className="input-field">
                                            <input type="text" name={`telefone-${index}-ddd`} value={telefone.ddd} onChange={this.handleInputChange} />
                                            <label className="active">DDD</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" name={`telefone-${index}-numero`} value={telefone.numero} onChange={this.handleInputChange} />
                                            <label className="active">Número</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.handleCloseModal}>Cancelar</a>
                        <button className="waves-effect waves-green btn" onClick={this.handleEditSubmit}>Salvar</button>
                    </div>
                </div>
            </div>
        );
    }
}
