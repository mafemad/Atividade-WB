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

    handleCloseModal = () => {
        if (this.modalClienteRef.current) {
            const modal = M.Modal.getInstance(this.modalClienteRef.current);
            modal.close();
        }
        this.setState({ clienteSelecionado: null });
    }

    handleDelete = (id: number) => {
        fetch(`http://localhost:32832/cliente/${id}`, { method: 'DELETE' })
            .then(response => response.ok ? this.fetchClientes() : alert("Erro ao excluir cliente"))
            .catch(error => console.error('Erro:', error));
    }

    render() {
        const { clientes, clienteSelecionado } = this.state;
        let estilo = `collection-item avatar ${styles.customStyle}`;

        return (
            <div className="container">
                <h4>Lista de Clientes</h4>
                <ul className="collection">
                    {clientes.map((cliente) => (
                        <li key={cliente.id} className={estilo}>
                            <div>
                                {cliente.nome} {cliente.sobreNome}
                                <a href="#!" className="secondary-content" onClick={() => this.handleItemClick(cliente)}>
                                    <i className="material-icons">info</i>
                                </a>
                                <button onClick={() => this.handleDelete(cliente.id)} className="secondary-content btn red">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div ref={this.modalClienteRef} id="modal-cliente" className="modal">
                    <div className="modal-content">
                        <h4>Informações do Cliente</h4>
                        {clienteSelecionado && (
                            <div>
                                <p>Nome: {clienteSelecionado.nome}</p>
                                <p>Sobrenome: {clienteSelecionado.sobreNome}</p>
                                <p>Email: {clienteSelecionado.email}</p>
                                <h5>Endereço</h5>
                                <p>Estado: {clienteSelecionado.endereco.estado}</p>
                                <p>Cidade: {clienteSelecionado.endereco.cidade}</p>
                                <p>Bairro: {clienteSelecionado.endereco.bairro}</p>
                                <p>Rua: {clienteSelecionado.endereco.rua}</p>
                                <p>Número: {clienteSelecionado.endereco.numero}</p>
                                <p>Código Postal: {clienteSelecionado.endereco.codigoPostal}</p>
                                <p>Informações Adicionais: {clienteSelecionado.endereco.informacoesAdicionais}</p>
                                <h5>Telefones</h5>
                                {clienteSelecionado.telefones.map((telefone, index) => (
                                    <p key={index}>({telefone.ddd}) {telefone.numero}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.handleCloseModal}>Fechar</a>
                    </div>
                </div>
            </div>
        );
    }
}
