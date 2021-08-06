import React, { useState } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import UploadInput from '../../components/UploadInput';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ThesesPost.scss';
import RightPanel from '../../components/Menu/RightPanel';
import * as managerService from '../../services/manager/managerService';

function ThesesPost() {
  const [expandRightPanel, setExpandRightPanel] = useState(true);
  const [files, setFiles] = useState([]);
  const [studentName, setStudentName] = useState('');
  function StudentName(e) {
    setStudentName(e.target.value);
  }
  const formsFile = ['Insira o arquivo aqui'];
  const handleClick = async (e) => {
    e.preventDefault();
    files.forEach(async (file) => {
      const data = new FormData();
      data.append('file', file.file);
      // await managerService (função de upload file)
    });
    await managerService.getStudents(studentName);
  };

  const inputProps = [
    {
      text: 'Página principal',
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

  return (
    <div className="thesesPost-root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="thesesPost-content">
        <RightPanel inputProps={inputProps} expandRightPanel={expandRightPanel} />
        <div className="thesesPost-grid">
          <h5>Teses</h5>
          <div className="post-Content">
            <div className="forms_line_files">
              {formsFile.map((file) => (
                <div className="forms_input_file">
                  <div className="forms_upload_text">{file}</div>
                  <UploadInput files={files} setFiles={setFiles} fileName={file} />
                </div>
              ))}
            </div>
          </div>
          <div className="studentName-grid">
            <TextField
              className="studentName"
              label="Aluno"
              id="input-with-icon-textfield"
              variant="filled"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => StudentName(e)}
            />
          </div>
          <div className="forms_divButton">
            <button type="submit" onClick={(e) => handleClick(e)}>Postar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ThesesPost;
