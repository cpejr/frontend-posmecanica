/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Declaration.scss';
import moment from 'moment';
import { FiPrinter } from 'react-icons/fi';

// eslint-disable-next-line react/prefer-stateless-function
class ComponentToPrint extends React.Component {
  render() {
    const studentProps = this.props;
    const studentInfo = studentProps.info;
    return (
      <div className="pdf-external-div">
        <div className="pdf-header">
          <div className="pdf-image">
            <img
              src="/Images/logoufmg.png"
              alt="logotipo Universidade FEderal de Minas Gerais"
            />
          </div>
          <div className="pdf-header-text">
            <p>UNIVERSIDADE FEDERAL DE MINAS GERAIS</p>
            <p>PROGRAMA DE PÓS-GRADUAÇÃO EM</p>
            <p> ENGENHARIA MECÂNICA</p>
            <p>Av. Antônio Carlos, 6627 - Campus Universitário</p>
            <p>31270-901 – Belo Horizonte – MG</p>
            <p>Tel.:+55 31 3409.5145</p>
            <p>E-mail: cpgmec@demec.ufmg.br</p>
          </div>
        </div>
        <div className="pdf-text">
          <div className="pdf-title">DECLARAÇÃO</div>
          <p className="pdf-dedicate">
            Declaro, para os devidos fins, que {`${studentInfo.name}`},
            matrícula nº {`${studentInfo.register}`}, é aluno regularmente matriculado no
            Programa de Pós-Graduação em Engenharia Mecânica, nível 
            {(studentInfo.grade == 'MESTRADO') ? (
              ' Mestrado'
            ) : (' Doutorado')},
            da Universidade Federal de Minas Gerais, frequentando regularmente
            as atividades desde {`${moment(studentInfo.inscrition).format('MMMM [de] YYYY')}`}.
            {(studentInfo.scholarship == true) ? (
              `Declaro, ainda, que o referido aluno é bolsista do Conselho 
              Nacional de Desenvolvimento Científico
              e Tecnológico (CNPq), recebendo, mensalmente, a quantia
              correspondente a ${studentInfo.amount} (uma) bolsa de doutorado, no valor de R$ ${studentInfo.value}
            (um mil, quinhentos reais), de acordo com a legislação vigente.`
            ) : ('')}
          </p>
          <p className="pdf-date">Belo Horizonte, {`${moment(studentInfo.currentDate).format('LL')}`}</p>
          <div className="pdf-coordinator">
            <p>Prof. Dr. Marco Túlio Corrêa de Faria</p>
            <p>Coordenador do Programa de Pós-Graduação</p>
            <p>em Engenharia Mecânica da UFMG</p>
          </div>
        </div>
      </div>
    );
  }
}

const PDFPage = (props) => {
  const infoStudent = props;
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
      <ComponentToPrint ref={componentRef} info={infoStudent.props[0]} />
    </div>
  );
};

export default PDFPage;
