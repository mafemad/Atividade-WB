import React, { Component } from "react";

type props = {
    tema: string;
}

type state = {
    nome: string;
    sobrenome: string;
    email: string;
    endereco: {
        estado: string;
        cidade: string;
        bairro: string;
        rua: string;
        numero: string;
        codigoPostal: string;
        informacoesAdicionais: string;
    };
    telefones: { ddd: string; numero: string }[];
};

export default class CadastroCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            nome: "",
            sobrenome: "",
            email: "",
            endereco: {
                estado: "",
                cidade: "",
                bairro: "",
                rua: "",
                numero: "",
                codigoPostal: "",
                informacoesAdicionais: ""
            },
            telefones: [{ ddd: "", numero: "" }]
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<state, keyof state>);
    };

    handleEnderecoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            endereco: {
                ...prevState.endereco,
                [name]: value
            }
        }));
    };

    handleTelefoneChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const telefones = [...this.state.telefones];
        telefones[index] = { ...telefones[index], [name]: value };
        this.setState({ telefones });
    };

    addTelefone = () => {
        this.setState(prevState => ({
            telefones: [...prevState.telefones, { ddd: "", numero: "" }]
        }));
    };

    removeTelefone = (index: number) => {
        this.setState(prevState => ({
            telefones: prevState.telefones.filter((_, i) => i !== index)
        }));
    };

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const cliente = {
            nome: this.state.nome,
            sobreNome: this.state.sobrenome,
            email: this.state.email,
            endereco: this.state.endereco,
            telefones: this.state.telefones
        };

        fetch('http://localhost:32832/cliente/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
        .then(response => response.ok ? alert("Cliente cadastrado com sucesso!") : alert("Erro ao cadastrar cliente"))
        .catch(error => console.error('Erro:', error));
    }

    render() {
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        return (
            <div className="container">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <h5><strong>Cadastro Cliente</strong></h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="nome" name="nome" type="text" value={this.state.nome} onChange={this.handleInputChange} className="validate" />
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="sobrenome" name="sobrenome" type="text" value={this.state.sobrenome} onChange={this.handleInputChange} className="validate" />
                            <label htmlFor="sobrenome">Sobrenome</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleInputChange} className="validate"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input id="estado" name="estado" type="text" value={this.state.endereco.estado} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="estado">Estado</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="cidade" name="cidade" type="text" value={this.state.endereco.cidade} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="cidade">Cidade</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="bairro" name="bairro" type="text" value={this.state.endereco.bairro} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="bairro">Bairro</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input id="rua" name="rua" type="text" value={this.state.endereco.rua} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="rua">Rua</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="numero" name="numero" type="text" value={this.state.endereco.numero} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="numero">Número</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="codigoPostal" name="codigoPostal" type="text" value={this.state.endereco.codigoPostal} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="codigoPostal">Código Postal</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="informacoesAdicionais" name="informacoesAdicionais" type="text" value={this.state.endereco.informacoesAdicionais} onChange={this.handleEnderecoChange} className="validate"/>
                            <label htmlFor="informacoesAdicionais">Informações Adicionais</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h6>Telefones</h6>
                            {this.state.telefones.map((telefone, index) => (
                                <div key={index} className="row">
                                    <div className="input-field col s2">
                                        <input id={`ddd-${index}`} name="ddd" type="text" value={telefone.ddd} onChange={(event) => this.handleTelefoneChange(index, event)} className="validate"/>
                                        <label htmlFor={`ddd-${index}`}>DDD</label>
                                    </div>
                                    <div className="input-field col s4">
                                        <input id={`numero-${index}`} name="numero" type="text" value={telefone.numero} onChange={(event) => this.handleTelefoneChange(index, event)} className="validate"/>
                                        <label htmlFor={`numero-${index}`}>Número</label>
                                    </div>
                                    <div className="input-field col s2">
                                        <button type="button" className="btn red" onClick={() => this.removeTelefone(index)}>Remover</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn" onClick={this.addTelefone}>Adicionar Telefone</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action">Enviar
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
