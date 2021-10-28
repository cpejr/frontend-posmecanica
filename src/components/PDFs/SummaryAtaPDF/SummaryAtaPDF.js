/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import { FiPrinter, FiXCircle } from 'react-icons/fi';
import './SummaryAta.scss';
import { useHistory } from 'react-router-dom';

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
            <a className="pdfSummary-CapsItalic">{`${defenseInfo.title}`}</a>
          </div>
          <p className="pdfrender-paragraph"/>
          <div className="pdfrenderSummary-title">
            <a className="pdfSummary-studentName">{`${defenseInfo.studName}`}</a>
          </div>
          <p className="pdfrender-paragraph"/>
          <p className="pdfSumary-dedicate">
          Dissertação submetida à Banca Examinadora designada pelo Colegiado do Programa 
          de Pós-Graduação em Engenharia Mecânica da Universidade Federal de Minas Gerais, 
          constituída pelos Professores: {`${defenseInfo.bank}`}, como parte dos requisitos necessários à obtenção do título de 
            <a className="pdfSummary-studentNameBold">
            "{(defenseInfo.type == 'DISSERTACAO') ? (
                'Mestre'
              ) : ('Doutor')} em Engenharia Mecânica"
            </a>
          , na área de concentração de <a className="pdfSummary-studentNameBold">"Energia e Sustentabilidade"</a>.
          </p>
          <p className="pdfSummary-date">Dissertação aprovada no dia {`${moment(defenseInfo.date).format('LL')}`}.</p>
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

const SummaryAtaPDF = (props) => {
  const history = useHistory();
  const infoDefense = props;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleBack = () => {
    history.push('/painel/administrator/lista-estudantes');
  };

  return (
    <div>
     <div className="print-button">
        <div className="print-button-text" role="button" tabIndex="0" onClick={handlePrint} onKeyDown={handlePrint}>
          <FiPrinter className="print-icon" size={25} />
          Imprimir
        </div>
        <div className="print-button-text" role="button" tabIndex="0" onClick={handleBack} onKeyDown={handleBack}>
          <FiXCircle className="print-icon" size={25} />
          Voltar
        </div>
      </div>
      <ComponentToPrint ref={componentRef} info={infoDefense.props[0]} />
    </div>
  );
};

export default SummaryAtaPDF;
