/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import moment from 'moment';
import '../SummaryAtaPDF/SummaryAta.scss';
import './Certificate.scss'

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const defenseProps = this.props;
    const defenseInfo = defenseProps.info;
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
            Certificamos que: {`${defenseInfo.bank}`}, participaram como membros da Banca Examinadora da 
            {(defenseInfo.type == 'DISSERTACAO') ? (
              ' Dissertação'
            ) : (' Tese')} intitulada <a className="pdfCertificate-titleFormated">“{`${defenseInfo.title}`}”</a>,
            de autoria do aluno(a) <a className="pdfCertificate-titleFormated">{`${defenseInfo.studName}`}</a>, do Programa 
            de Pós-Graduação em Engenharia Mecânica, nível Mestrado, Área de Concentração: {`${defenseInfo.searchArea}`}, 
            defendida e aprovada em Belo Horizonte no dia {`${moment(defenseInfo.date).format('LL')}`}.
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

const CertificatePDF = (props) => {
  const infoDefense = props;
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
      <ComponentToPrint ref={componentRef} info={infoDefense.props[0]} />
    </div>
  );
};

export default CertificatePDF;