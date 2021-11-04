/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import { FiPrinter, FiXCircle } from 'react-icons/fi';
import '../SummaryAtaPDF/SummaryAta.scss';
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
            {`ATA DE DEFESA DE ${defenseInfo.type}`}
          </div>
          <p className="pdfrender-paragraph"/>
          <p className="pdfSumary-dedicate">
          Ata da Sessão Pública da defesa de dissertação de <a className="pdfSummary-studentName">{`${defenseInfo.studName}`}</a>, 
          de registro Número {`${defenseInfo.register}`}, aluno(a) do Curso de 
          {(defenseInfo.type == 'DISSERTACAO') ? (
              ' Mestrado'
            ) : (' Doutorado')}  do Programa 
          de Pós-Graduação em Engenharia Mecânica da Escola de Engenharia, da Universidade 
          Federal de Minas Gerais. Sendo a participação de todos os membros da Banca 
          inclusive do Discente por vídeoconferência, às {`${defenseInfo.hour}`} horas do dia {`${moment(defenseInfo.date).format('LL')}`}. 
          A Banca Examinadora indicada pelo Colegiado do Curso, foi constituída pelos 
          professores: {`${defenseInfo.bank}`}. O Presidente da Banca Examinadora {`${defenseInfo.advisor}`}, abriu 
          a Sessão Pública de defesa Nº {`${defenseInfo.number}`}, para avaliar a defesa de dissertação do aluno(a) 
          <a className="pdfSummary-studentNameBold"> {`${defenseInfo.studName}`}</a>, intitulada: <a className="pdfSummary-studentName">“{`${defenseInfo.title}`}” </a>
          requisito final para obtenção do Grau de 
          {(defenseInfo.type == 'DISSERTACAO') ? (
              ' Mestrado '
            ) : (' Doutorado ')} 
          em Engenharia Mecânica, na área de concentração "{`${defenseInfo.searchArea}`}” e, após dar
           conhecimento aos presentes o teor das normas regulamentares do trabalho final, passou 
           a palavra ao candidato(a) para apresentação de seu trabalho. Seguiu-se a arguição pelos 
           examinadores com a respectiva defesa do candidato. Após a defesa, os membros da Banca 
           Examinadora realizaram a avaliação, por meio eletrônico, do trabalho sem a presença do 
           candidato, para julgamento e expedição do resultado final. Foi atribuída a seguinte 
           indicação: o candidato foi considerado <a className="pdfSummary-studentName">{`${defenseInfo.aprovad}`}</a>, por unanimidade. O resultado final foi
          comunicado ao candidato pelo Senhor Presidente da Banca Examinadora. Nada mais havendo 
          a tratar, lavrou-se a presente Ata que será assinada eletronicamente pelos membros da Banca.
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

const CompleteAtaPDF = (props) => {
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

export default CompleteAtaPDF;
