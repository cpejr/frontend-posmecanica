/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter, FiXCircle } from 'react-icons/fi';
import SelectiveProcessResult from '../../SelectiveProcessResult';
import '../DeclarationPDF/Declaration.scss';
import './DisciplineResultPdf.scss';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const infoProcess = props;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleBack = () => {
    history.push('/painel/processos-seletivos');
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
      <ComponentToPrint ref={componentRef} info={infoProcess.props[0]} />
    </div>
  );
};

export default DisciplinesResultPDF;
