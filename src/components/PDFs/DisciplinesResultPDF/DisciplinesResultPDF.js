/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import SelectiveProcessResult from '../../SelectiveProcessResult';
import '../DeclarationPDF/Declaration.scss';
import './DisciplineResultPdf.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const processProps = this.props;
    const processInfo = processProps.info;
    return (
      <div className="pdfResult">
        <SelectiveProcessResult processId={processInfo.id} />   
      </div>
    );
  }
}

const DisciplinesResultPDF = (props) => {
  const infoProcess = props;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="print-buttonDiscipline" role="button" tabIndex="0" onClick={handlePrint} onKeyDown={handlePrint}>
        <div className="print-button-text">
          <FiPrinter className="print-icon" size={25} />
          Imprimir
        </div>
      </div>
      <ComponentToPrint ref={componentRef} info={infoProcess.props[0]} />
    </div>
  );
};

export default DisciplinesResultPDF;
