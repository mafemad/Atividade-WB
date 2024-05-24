import React from "react";

type Props = {
    tema: string;
};

const FormularioCadastroServico: React.FC<Props> = ({ tema }) => {
    let estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <>
            <div className="container">
                <div className="row">
                    <h5><strong>Cadastro Serviços</strong></h5>
                    <form className="col s12">
                        <div id="modalLine" className="row">
                            <div className="input-field col s7">
                                <input id="name" type="text" className="validate" />
                                <label htmlFor="name">nome</label>
                            </div>
                            <div className="input-field col s5">
                                <input id="price" type="text" className="validate" />
                                <label htmlFor="price">Preço</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action">
                                    Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormularioCadastroServico;
