/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import '../SummaryAtaPDF/SummaryAta.scss';
import './ChoiceMember.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    // const defenseProps = this.props;
    // const defenseInfo = defenseProps.info;
    return (
      <div className="pdfrenderSummary-external-div">
        <div className="pdfrender-text">
          <div className="pdfrenderChoice-title">
            ESCOLHA DO MEMBRO DA BANCA EXAMINADORA PARA
            SUPERVISIONAR AS CORREÇÕES SUGERIDAS E/OU REQUERIDAS
            <p className="pdfrender-paragraph"/>
          </div>
          <p className="pdfSumary-dedicate">
            A Banca Examinadora constituída pelos professores: Dr. Matheus Pereira Porto 
            (Orientador-Departamento de Engenharia Mecânica/UFMG), Dr. Renato Nunes Teixeira 
            (Instituto Nacional de Metrologia, Qualidade e Tecnologia/INMETRO), Dr. Rafael 
            Augusto Magalhães Ferreira (Departamento de Engenharia Mecânica/UFMG) e Dr. Pedro 
            Bastos Costa (Departamento de Engenharia Mecânica/UFMG)  reunida no dia 27 de 
            julho de 2021, às 09:30 horas, para examinar a dissertação intitulada “RESULTADOS 
            DE INCERTEZA DE CALIBRAÇÃO PARA SENSORES INFRAVERMELHO DO TIPO MEMS TERMOPILHA ", 
            defendida pelo  aluno Vitor Furtado Paes, decidiu, por unanimidade, designar o  
            Prof. Matheus Pereira Porto, para supervisionar as correções requeridas e/ou sugeridas 
            pela Banca Examinadora do candidato.
          </p>
          <p className="pdfSumary-dedicate">
            A Banca Examinadora decidiu ainda que o candidato terá um prazo de 60 dias para a 
            entrega da versão final de sua dissertação.
          </p>
          <p className="pdfSummary-date">Belo Horizonte, 13 de maio de 2021</p>
        </div>
      </div>
    );
  }
}

const ChoiceMemberPDF = () => {
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

export default ChoiceMemberPDF;
