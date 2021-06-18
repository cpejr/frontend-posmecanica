/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import JsPDF from 'jspdf';
import ContentsPDF from '../ContentsPDF';
import './PDF.scss';

export default class pdfGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.jsPdfGenerator = () => {
      // Nova página
      const doc = new JsPDF();
      // Cor do texto
      doc.setTextColor(10);
      // Tentar implementar essafunçao que pega div e trasnforma em pdf
      // doc.html(document.getElementById('pdf'));
      // doc.save('teste.pdf');

      // Fonte do documento
      doc.setFont('inter');

      // Adiciona imagem
      doc.addImage('/Images/logoufmg.png', 'PNG', 20, 20, 24, 24);
      // Posicao do texto. Prieiro argumento espaçamento lateral esquerdo,
      // segundo espaçamento superior
      doc.text(50, 26, 'UNIVERSIDADE FEDERAL DE MINAS GERAIS');
      doc.text(53, 32, 'PROGRAMA DE PÓS-GRADUAÇÃO EM');
      doc.text(55, 38, ' ENGENHARIA MECÂNICA');
      doc.text(60, 44, 'Av. Antônio Carlos, 6627 - Campus Universitário');
      doc.text(55, 50, '31270-901 – Belo Horizonte – MG');
      doc.text(57, 56, 'Tel.:+55 31 3409.5145');
      doc.text(57, 62, 'E-mail: cpgmec@demec.ufmg.br');

      doc.getTextDimensions(500, 90, 'Esse e o sub texto');
      // Salva o documento
      doc.save('NandoGostosoMeDaUmaChance.pdf');
    };
  }

  // renderiza a funcao
  render() {
    return (
      <div className="PDF">
        <ContentsPDF />
        <button type="button" className="btn" onClick={this.jsPdfGenerator}>
          BAIXAR
        </button>
      </div>
    );
  }
}
