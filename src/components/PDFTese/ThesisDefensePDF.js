import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../PDF/PDF.scss';
import { FiPrinter } from 'react-icons/fi';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="pdf-external-div">
        <div className="pdf-header">
          <p className="pdf-dedicate">PROGRAMA DE PÓS-GRADUAÇÃO EM ENGENHARIA MECÂNICA</p>
        </div>
        <div className="pdf-text">
          <div className="pdf-title">
            DEFESA PÚBLICA DE TESE
          </div>
          <p className="pdf-dedicate">
            ALUNO:
          </p>
          <p className="pdf-dedicate">
            TÍTULO:
          </p>
          <p className="pdf-dedicate">
            BANCA EXAMINADORA:
          </p>
          <p className="pdf-dedicate">
            ORIENTADOR:
          </p>
          <p className="pdf-dedicate">
            DATA:
          </p>
          <p className="pdf-dedicate">
            HORA:
          </p>
          <p className="pdf-dedicate">
            LOCAL:
          </p>
        </div>
      </div>
    );
  }
}

const PDFPage = () => {
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

export default PDFPage;
