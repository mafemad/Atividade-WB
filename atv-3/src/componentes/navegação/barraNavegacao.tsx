/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import styles from '../styles/myStyles.module.css';

type Props = {
    tema: string;
    botoes: string[];
    seletorView: (valor: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const BarraNavegacao: React.FC<Props> = ({ tema, botoes, seletorView }) => {
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            const elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
        });
    }, []);

    const gerarListaBotoes = useCallback(() => {
        if (botoes.length <= 0) {
            return <></>;
        } else {
            return botoes.map((valor) => (
                <li key={valor}>
                    <a onClick={(e) => seletorView(valor, e)}>{valor}</a>
                </li>
            ));
        }
    }, [botoes, seletorView]);

    const estilo = `${tema}`;
    return (
        <>
            <nav className={estilo}>
                <div className="nav-wrapper">
                    <a className={`brand-logo ${styles.logo}`}>WB</a>
                    <a data-target="mobile-menu" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {gerarListaBotoes()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-menu">
                {gerarListaBotoes()}
            </ul>
        </>
    );
};

export default BarraNavegacao;
