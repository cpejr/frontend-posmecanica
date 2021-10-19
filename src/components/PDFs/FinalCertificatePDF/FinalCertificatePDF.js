/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import moment from 'moment';
import '../SummaryAtaPDF/SummaryAta.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const defenseProps = this.props;
    const defenseInfo = defenseProps.info;
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
            Atesto, para os devidos fins, que, <a className="pdfSummary-studentName">{`${defenseInfo.studName}`}</a> defendeu,
            no dia {`${moment(defenseInfo.date).format('LL')}`}, perante Banca Examinadora homologada
            pelo Colegiado do Programa de Pós-Graduação em Engenharia Mecânica
            da Universidade Federal de Minas Gerais, constituída pelos professores: {`${defenseInfo.bank}`}, a 
            {(defenseInfo.type == 'DISSERTACAO') ? (
              ' dissertação'
            ) : (' tese')} intitulada
            <a className="pdfSummary-studentName"> “{`${defenseInfo.title}`}”</a>.
          </p>
          <p className="pdfSumary-dedicate">
            Salientamos que o Sr(a). <a className="pdfSummary-studentNameBold">{`${defenseInfo.studName}`}</a> está apto a gozar dos direitos que 
            o referido título lhe concede - 
            {(defenseInfo.type == 'DISSERTACAO') ? (
              ' Mestre'
            ) : (' Doutor')} em Engenharia Mecânica. Atesto também 
            que seu pedido de diploma estará em fase de expedição junto ao Programa de 
            Pós-Graduação em Engenharia Mecânica e da Pró-Reitoria de Pós-Graduação da 
            Universidade Federal de Minas Gerais após o retorno das atividades presenciais, 
            devido à crise sanitária da covid-19.
          </p>
          <p className="pdfSummary-date">Belo Horizonte, {`${moment(defenseInfo.currentDate).format('LL')}`}</p>
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

const FinalCertificatePDF = (props) => {
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

export default FinalCertificatePDF;
