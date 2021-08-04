import React, { useState } from 'react';
import './EditStudentInfo.scss';
import Header from '../../components/Navbar';
import RightPanel from '../../components/Menu/RightPanel';
import StyledInput from '../../components/StyledInput/StyledInput';
import * as managerService from '../../services/manager/managerService';
import StudEdit from '../../utils/StudentEdit_ByAdmin';
import Footer from '../../components/Footer/Footer';

function EditStudentInfo() {
  const [dados, setDados] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(true);
  const inputProps = [
    {
      text: 'Lista de estudantes',
      path: 'lista-estudantes',
    },
    {
      text: 'Criar processo seletivo',
      path: '/',
    },
    {
      text: 'Postagens de teses',
      path: '/',
    },
    {
      text: 'Cadastro de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      console.log(dados);
      await managerService.updateStudent(dados, '88dc004d-fc2d-4c51-9a74-c7a3ff4f209d');
    } catch {
      console.log('hello');
    }
  };
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  return (
    <div className="screen-ps">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="atualizationContent">
        <div className="campsContent">
          <h1> Atualização Cadastral:</h1>
          {StudEdit.map((topic) => (
            <div key={topic.title}>
              <div className="formsDI_box_title">
                <div className="formsDI_title">
                  {topic.title}
                </div>
              </div>
              {topic.lines.map((line) => (
                <div className="formsDI_line">
                  {line.items.map((item) => (
                    <div className="formsDI_input">
                      <StyledInput
                        type={item.type}
                        shrink={item.type === 'date' ? true : undefined}
                        id={item.id}
                        label={item.label}
                        width="22rem"
                        field={item.field}
                        select={item.select}
                        dados={dados}
                        setDados={handleChange}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className="Login-button1">
            <button type="submit" onClick={handleClick}>Atualizar</button>
          </div>
        </div>
        <RightPanel inputProps={inputProps} expandRightPanel={expandRightPanel} />
      </div>
      <Footer />
    </div>
  );
}

export default EditStudentInfo;
