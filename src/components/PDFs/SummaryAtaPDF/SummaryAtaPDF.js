/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import './SummaryAta.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    // const defenseProps = this.props;
    // const defenseInfo = defenseProps.info;
    return (
      <div className="pdfrenderSummary-external-div">
        <div className="pdfrender-header">
          <div className="pdfSummary-image">
            <img
              className="pdfSummary-image"
              src="/Images/logoufmg.png"
              alt="logotipo Universidade FEderal de Minas Gerais"
            />
          </div>
          <div className="pdfheaderSumary-text">
            <p>UNIVERSIDADE FEDERAL DE MINAS GERAIS</p>
            <p>PROGRAMA DE PÓS-GRADUAÇÃO EM</p>
            <p> ENGENHARIA MECÂNICA</p>
            <p>Av. Antônio Carlos, 6627 - Campus Universitário</p>
            <p>31270-901 – Belo Horizonte – MG</p>
            <p>Tel.:+55 31 3409.5145</p>
            <p>E-mail: cpgmec@demec.ufmg.br</p>
          </div>
        </div>
        <div className="pdfrender-text">
          <div className="pdfrenderSummary-title">
            RESULTADOS DE INCERTEZA DE CALIBRAÇÃO PARA SENSORES INFRAVERMELHO DO TIPO MEMS TERMOPILHA
          </div>
          <p className="pdfrender-paragraph"/>
          <div className="pdfrenderSummary-title">
            VITOR FURTADO PAES
          </div>
          <p className="pdfrender-paragraph"/>
          <p className="pdfSumary-dedicate">
          Dissertação submetida à Banca Examinadora designada pelo Colegiado do Programa 
          de Pós-Graduação em Engenharia Mecânica da Universidade Federal de Minas Gerais, 
          constituída pelos Professores: Dr. Matheus Pereira Porto (Orientador-Departamento
           de Engenharia Mecânica/UFMG), Dr. Renato Nunes Teixeira (Instituto Nacional de Metrologia, 
           Qualidade e Tecnologia/INMETRO), Dr. Rafael Augusto Magalhães Ferreira (Departamento de 
           Engenharia Mecânica/UFMG) e Dr. Pedro Bastos Costa (Departamento de Engenharia 
           Mecânica/UFMG), como parte dos requisitos necessários à obtenção do título de 
           "Mestre em Engenharia Mecânica", na área de concentração de "Energia e Sustentabilidade".
          </p>
          <p className="pdfSummary-date">Dissertação aprovada no dia 27 de julho de 2021.</p>
        </div>
        <div className="pdfSummary-coordinator">
            <p>Prof. Dr. Marco Túlio Corrêa de Faria</p>
            <p>Coordenador do Programa de Pós-Graduação</p>
            <p>em Engenharia Mecânica da UFMG</p>
          </div>
      </div>
    );
  }
}

const ThesisQualificationPDF = () => {
  // const infoDefense = props;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="print-button" role="button" tabIndex="0" onClick={handlePrint} onKeyDown={handlePrint}>
        <div className="print-button-text">
          <FiPrinter className="print-icon" size={25} />
          Imprimir
        </div>
      </div>
      <ComponentToPrint ref={componentRef} />
    </div>
  );
};

export default ThesisQualificationPDF;
