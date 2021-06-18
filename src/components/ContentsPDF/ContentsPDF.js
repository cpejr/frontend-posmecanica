import React from 'react';
import './ContentsPDF.scss';

function ContentsPDF() {
  return (
    <div>
      <div className="pdf-external-div" id="pdf">
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
            Declaro, para os devidos fins, que ANDERSON JÚNIOR DOS SANTOS,
            matrícula nº 2018700680, é aluno regularmente matriculado no Programa
            de Pós-Graduação em Engenharia Mecânica, nível Doutorado, da
            Universidade Federal de Minas Gerais, frequentando regularmente as
            atividades desde março de 2018. Declaro, ainda, que o referido aluno é
            bolsista do Conselho Nacional de Desenvolvimento Científico e
            Tecnológico (CNPq), recebendo, mensalmente, a quantia correspondente a
            01 (uma) bolsa de doutorado, no valor de R$ 1500 (um mil, quinhentos
            reais), de acordo com a legislação vigente.
          </p>
          <p className="pdf-date">Belo Horizonte, 13 de maio de 2021</p>
          <div className="pdf-coordinator">
            <p>Prof. Dr. Marco Túlio Corrêa de Faria</p>
            <p>Coordenador do Programa de Pós-Graduação</p>
            <p>em Engenharia Mecânica da UFMG</p>
          </div>
          <p className="pdf-observation">
            OBS: Sugiro que os dados a serem preenchidos
            pela secretaria fossem os de destaque.
            Se possível o campo permitir a digitação de mais dados caso necessário.
            Os demais itens serão gerados automáticos correto?
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContentsPDF;
