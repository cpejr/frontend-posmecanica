/*eslint-disable*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { IoMdSchool } from "react-icons/io";
import UploadInput from "../../components/UploadInput";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./ThesesPost.scss";
import RightPanel from "../../components/Menu/RightPanel";
import * as managerService from "../../services/manager/managerService";
import { useAuth } from "../../providers/auth";

function ThesesPost() {
  const { user } = useAuth();
  const history = useHistory();
  const { addToast } = useToasts();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [files, setFiles] = useState([]);
  const [thesisName, setThesisName] = useState("");
  const [buttonState, setButtonState] = useState("buttonPost");
  const [textButton, setTextButton] = useState("POSTAR");
  function ThesisName(e) {
    setThesisName(e.target.value);
  }
  const formsFile = ["Coloque sua tese aqui:"];
  const handleClick = async (e) => {
    e.preventDefault();

    if(thesisName === ""){
      addToast("Insira um título!", { appearance: "error" });
    }
    if(files.length === 0){
      addToast("Insira um arquivo!", { appearance: "error" });
    }

    files.forEach(async (file) => {
      const data = new FormData();
      data.append("file", file.file);

      const maxSize = 100 * 1024 * 1024;
      if(file.file.size > maxSize){
        addToast("Arquivo não suportado! (Máximo 100 MB)", { appearance: "error" });
        history.push("/painel/aluno");
      } else {
        try {
          setButtonState("spinerButton");
          setTextButton("");
          await managerService.uploadThesis(data, user.id, thesisName);
          addToast("Tese postada com sucesso!", { appearance: "success" });
          history.push("/painel/aluno");
        } catch {
          addToast("Falha ao postar Tese", { appearance: "error" });
          history.push("/painel/aluno");
        }
      }
    });
  };
  const inputProps = [
    {
      text: "Página Inicial",
      path: "/",
    },
    {
      text: "Notas",
      path: "/",
    },
    {
      text: "Editar Informações",
      path: "/",
    },
    {
      text: "Dúvidas",
      path: "/",
    },
    {
      text: "Redefinição de senha",
      path: "../esqueci-senha",
    },
  ];

  return (
    <div className="thesesPost-root">
      <Header
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <div className="thesesPost-content">
        <div className="thesesPost-grid">
          <h5>Postagem de Teses</h5>
          <div className="post-Content">
            <div className="forms_line_files">
              {formsFile.map((file) => (
                <div className="forms_input_file">
                  <div className="forms_upload_text">{file}</div>
                  <UploadInput files={files} setFiles={setFiles} />
                </div>
              ))}
            </div>
            <div className="studentName-grid">
              <TextField
                className="studentName"
                label="Autor(a)"
                id="filled-read-only-input"
                variant="filled"
                size="small"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdSchool size="25" style={{ marginRight: "7px" }} />
                      {user.name}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="studentName"
                label="Título da Tese"
                id="input-with-icon-textfield"
                variant="filled"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdSchool size="25" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => ThesisName(e)}
              />
              <div className="postButton">
                <button
                  className={buttonState}
                  type="submit"
                  onClick={(e) => handleClick(e)}
                >
                  {textButton}
                </button>
              </div>
            </div>
          </div>
        </div>
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
      </div>
      <Footer />
    </div>
  );
}
export default ThesesPost;
