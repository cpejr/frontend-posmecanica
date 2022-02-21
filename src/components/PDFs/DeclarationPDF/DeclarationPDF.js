/*eslint-disable*/
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Declaration.scss';
import moment from 'moment';
import extenso from 'extenso';
import { FiPrinter, FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

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
          <p className="text-grid">
            <p className="pdf-dedicate">
              Declaro, para os devidos fins, que {`${studentInfo.name}`},
              matrícula nº {`${studentInfo.register}`}, é aluno regularmente matriculado no
              Programa de Pós-Graduação em Engenharia Mecânica, nível
              {(studentInfo.grade == 'MESTRADO') ? (
                ' Mestrado'
              ) : (' Doutorado')},
              da Universidade Federal de Minas Gerais, frequentando regularmente
              as atividades desde {`${moment(studentInfo.inscrition).format('MMMM [de] YYYY')}`}.
            </p>
            <p className="pdf-dedicate">
              {(studentInfo.date !== '' && studentInfo.years !== '') ? (
                `Declaro, ainda, que o curso de${(studentInfo.grade == 'MESTRADO') ? (
                  ' Mestrado'
                ) : (' Doutorado')} tem duração de ${studentInfo.years} (${extenso(studentInfo.years)})  
                ${(studentInfo.years > 1) ? (
                  ' anos'
                ) : (' ano')} e que a defesa de ${(studentInfo.grade == 'MESTRADO') ? (
                  ' dissertação'
                ) : (' tese')} do referido aluno deverá ocorrer até ${moment(studentInfo.dateEnd).format('MMMM [de] YYYY')}.
              `
              ) : ('')}
            </p>
            {(studentInfo.amount !== '' && studentInfo.value !== '') ? (
              <p className="pdf-dedicate">
                {(studentInfo.scholarship == true) ? (
                  `Declaro, ainda, que o referido aluno é bolsista do Conselho 
              Nacional de Desenvolvimento Científico
              e Tecnológico (CNPq), recebendo, mensalmente, a quantia
              correspondente a ${studentInfo.amount} (${extenso(studentInfo.amount, { number: { gender: 'f' } })}) 
              ${(studentInfo.amount > 1) ? (
                    ' bolsas'
                  ) : (' bolsa')}, de ${(studentInfo.grade == 'MESTRADO') ? (
                    ' mestrado'
                  ) : (' doutorado')}, no valor de R$${studentInfo.value} (${extenso(studentInfo.value, { mode: 'currency', currency: { type: 'BRL' } })}),
              de acordo com a legislação vigente.`
                ) : ('')}
              </p>) : ('')}
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
  const history = useHistory();
  const infoStudent = props;
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
      <ComponentToPrint ref={componentRef} info={infoStudent.props[0]} />
    </div>
  );
};

export default PDFPage;