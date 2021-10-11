/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import '../SummaryAtaPDF/SummaryAta.scss';

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
            ATESTADO
          </div>
          <p className="pdfSumary-dedicate">
            Atesto, para os devidos fins, que, VITOR FURTADO PAES defendeu,
            no dia 27 de julho de 2021, perante Banca Examinadora homologada
            pelo Colegiado do Programa de Pós-Graduação em Engenharia Mecânica
            da Universidade Federal de Minas Gerais, constituída pelos professores:
            Dr. Matheus Pereira Porto (Orientador-Departamento de Engenharia Mecânica/UFMG),
            Dr. Renato Nunes Teixeira (Instituto Nacional de Metrologia,
            Qualidade e Tecnologia/INMETRO), Dr. Rafael Augusto Magalhães Ferreira
            (Departamento de Engenharia Mecânica/UFMG) e Dr. Pedro Bastos Costa
            (Departamento de Engenharia Mecânica/UFMG), a dissertação intitulada
            “RESULTADOS DE INCERTEZA DE CALIBRAÇÃO PARA SENSORES
            INFRAVERMELHO DO TIPO MEMS TERMOPILHA”.
          </p>
          <p className="pdfSumary-dedicate">
            Salientamos que o Sr. Vitor Furtado Paes está apto a gozar dos direitos que 
            o referido título lhe concede - Mestre em Engenharia Mecânica. Atesto também 
            que seu pedido de diploma estará em fase de expedição junto ao Programa de 
            Pós-Graduação em Engenharia Mecânica e da Pró-Reitoria de Pós-Graduação da 
            Universidade Federal de Minas Gerais após o retorno das atividades presenciais, 
            devido à crise sanitária da covid-19.
          </p>
          <p className="pdfSummary-date">Belo Horizonte, 13 de maio de 2021</p>
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

const FinalCertificatePDF = () => {
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

export default FinalCertificatePDF;
