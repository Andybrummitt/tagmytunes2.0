import FileUploadForm from "./components/FileUploadForm/FileUploadForm";
import Header from "./components/Header/Header.component";
import InfoDescription from "./components/InfoDescription/InfoDescription.component";
import Instructions from "./components/Instructions/Instructions.component";
import Sample from "./components/Sample/Sample.component";
import "./styles/index.scss";


function App() {
  return (
    <div className="App">
      <Header />
      <Sample />
      <div className="d-flex flex-column justify-content-between p-3" id="main-content-container">
        <FileUploadForm />
        <Instructions />
        <InfoDescription />
      </div>
    </div>
  );
}

export default App;
