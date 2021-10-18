/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import moment from 'moment';
import '../SummaryAtaPDF/SummaryAta.scss';
import './ChoiceMember.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const qualiProps = this.props;
    const qualiInfo = qualiProps.info;
    return (
      <div className="pdfrenderSummary-external-div">
        <div className="pdfrender-text">
          <div className="pdfrenderChoice-title">
            ESCOLHA DO MEMBRO DA BANCA EXAMINADORA PARA
            SUPERVISIONAR AS CORREÇÕES SUGERIDAS E/OU REQUERIDAS
            <p className="pdfrender-paragraph"/>
          </div>
          <p className="pdfSumary-dedicate">
            A Banca Examinadora constituída pelos professores: {`${qualiInfo.bank}`}  reunida no dia {`${moment(qualiInfo.date).format('LL')}`}
            , às {`${qualiInfo.hour}`} horas, para examinar a dissertação intitulada “{`${qualiInfo.title}`}", 
            defendida pelo  aluno {`${qualiInfo.studName}`}, decidiu, por unanimidade, designar o(a) {`${qualiInfo.advisor}`}, para supervisionar as correções requeridas e/ou sugeridas 
            pela Banca Examinadora do candidato.
          </p>
          <p className="pdfSumary-dedicate">
            A Banca Examinadora decidiu ainda que o candidato terá um prazo de {`${qualiInfo.qualiDays}`} dias para a 
            entrega da versão final de sua dissertação.
          </p>
          <p className="pdfSummary-date">Belo Horizonte, {`${moment(qualiInfo.currentDate).format('LL')}`}</p>
        </div>
      </div>
    );
  }
}

const ChoiceMemberPDF = (props) => {
  const infoQuali = props;
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
      <ComponentToPrint ref={componentRef} info={infoQuali.props[0]} />
    </div>
  );
};

export default ChoiceMemberPDF;
