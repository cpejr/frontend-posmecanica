import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import './ThesisDefensePDF.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const defenseProps = this.props;
    const defenseInfo = defenseProps.info;
    return (
      <div className="pdfrender-external-div">
        <div className="pdfrender-header">
          <p className="pdfrender-subtitle">PROGRAMA DE PÓS-GRADUAÇÃO EM ENGENHARIA MECÂNICA</p>
        </div>
        <div className="pdfrender-text">
          <div className="pdfrender-title">
            DEFESA PÚBLICA DE TESE
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
    );
  }
}

const ThesisDefensePDF = (props) => {
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

export default ThesisDefensePDF;
