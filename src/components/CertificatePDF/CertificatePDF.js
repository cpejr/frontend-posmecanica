/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import '../SummaryAtaPDF/SummaryAta.scss';
import './Certificate.scss'

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    // const defenseProps = this.props;
    // const defenseInfo = defenseProps.info;
    return (
      <div className="pdfrenderSummary-external-div">
        <div className="pdfrender-text">
          <div className="pdfrenderCertificate-title">
            CERTIFICADO
          </div>
          <img
            className="pdfCertificate-image"
            src="/Images/logoufmg.png"
            alt="logotipo Universidade FEderal de Minas Gerais"
          />
          <p className="pdfSumary-dedicate">
            Certificamos que: Matheus Pereira Porto, Renato Nunes Teixeira, Rafael Augusto 
            Magalhães Ferreira e Pedro Bastos Costa, sob a presidência do Prof. Matheus 
            Pereira Porto, participaram como membros da Banca Examinadora da Dissertação 
            intitulada “RESULTADOS DE INCERTEZA DE CALIBRAÇÃO PARA SENSORES INFRAVERMELHO 
            DO TIPO MEMS TERMOPILHA”, de autoria do aluno Vitor Furtado Paes, do Programa 
            de Pós-Graduação em Engenharia Mecânica, nível Mestrado, Área de Concentração: 
            Energia e Sustentabilidade, defendida e aprovada em Belo Horizonte no dia 27 de julho de 2021.
          </p>
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

const CertificatePDF = () => {
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

export default CertificatePDF;