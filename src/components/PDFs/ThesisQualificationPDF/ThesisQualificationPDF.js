import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter, FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const defenseProps = this.props;
    const defenseInfo = defenseProps.info;
    return (
      <div className="pdfrender-block">
        <div className="pdfrender-external-div">
          <div className="pdfrender-header">
            <p className="pdfrender-subtitle">PROGRAMA DE PÓS-GRADUAÇÃO EM ENGENHARIA MECÂNICA</p>
          </div>
          <div className="pdfrender-text">
            <div className="pdfrender-title">
              {defenseInfo.tipo === 'DISSERTACAO'
                && (
                  'QUALIFICAÇÃO DE DISSERTAÇÃO'
                )}
              {defenseInfo.tipo === 'TESE'
                && (
                  'QUALIFICAÇÃO DE TESE'
                )}
            </div>
            <p className="pdfrender-dedicate">
              {`ALUNO: ${defenseInfo.name}`}
            </p>
            <p className="pdfrender-dedicate">
              {`TÍTULO: ${defenseInfo.title}`}
            </p>
            <p className="pdfrender-dedicate-bench">
              <p className="pdfrender-dedicate-bench-title"> BANCA EXAMINADORA </p>
              {`${defenseInfo.bench}`}
            </p>
            <p className="pdfrender-dedicate-advisor">
              {`ORIENTADOR: ${defenseInfo.advisor}`}
            </p>
            <div className="pdfrender-last-infos">
              <p>
                {`DATA: ${defenseInfo.date}`}
              </p>
              <p>
                {`HORÁRIO: ${defenseInfo.hour}`}
              </p>
              <p>
                {`LOCAL: ${defenseInfo.location}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ThesisQualificationPDF = (props) => {
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

export default ThesisQualificationPDF;
