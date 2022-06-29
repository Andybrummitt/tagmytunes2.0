import FileUploadForm from "./components/FileUploadForm/FileUploadForm";
import Header from "./components/Header/Header.component";
import InfoDescription from "./components/InfoDescription/InfoDescription.component";
import Instructions from "./components/Instructions/Instructions.component";


function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Instructions />
        <FileUploadForm />
        <InfoDescription />
      </div>
    </div>
  );
}

export default App;
