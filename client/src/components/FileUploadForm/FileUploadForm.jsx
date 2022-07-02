import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckboxFormGroup from "../CheckboxFormGroup/CheckboxFormGroup";
import ListOfRemovedStrings from "../ListOfRemovedStrings/ListOfRemovedStrings";
import LoadingSpinner from "../LoadingSpinner.component";
import "./file-upload-form.scss";

const FileUploadForm = () => {
  const formRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [options, setOptions] = useState({
    removeCommonSuffixes: false,
    y2mate: false,
  });
  const [customString, setCustomString] = useState("");
  const [customStrings, setCustomStrings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customTextError, setCustomTextError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(formRef.current);
    const uuid = uuidv4();
    formData.append("custom-strings", customStrings);
    setLoading(true);
    setBlob(null);
    fetch(`/upload/${uuid}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((json) => {
            throw new Error(json);
          });
        }
        return res.blob();
      })
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        setBlob(url);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const handleChangeCommonSuffixes = (e) =>
    setOptions({ ...options, removeCommonSuffixes: e.target.checked });
  const handleChangeY2Mate = (e) =>
    setOptions({ ...options, y2mate: e.target.checked });
  const handleChangeCustomString = (e) => setCustomString(e.target.value);

  const handleSubmitString = (e) => {
    e.preventDefault();
    if(customStrings.length >= 10){
      setCustomTextError('You can only remove up to 10 custom texts at a time.')
      return;
    }
    if(customStrings.includes(customString)){
      setCustomTextError('You\'ve already included that text');
      return;
    }
    if (customString) {
      setCustomStrings([...customStrings, customString]);
      setCustomString("");
      setCustomTextError(null);
    }
  }

  return (
    <div className="col-xl-4 col-md-6 d-flex justify-content-center align-items-center flex-column h-100 mb-5" id="form-container">
    <div className="d-flex">
      {loading && (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p id="loading-text" className="text-center fw-bold text-white">Tagging your tunes...</p>
        <LoadingSpinner />
      </div> 
      )}
      {blob && (
        <div className="d-flex flex-column">
          <a className="btn btn-lg btn-success align-self-center" onClick={() => setBlob(null)} href={blob}>
            Download Your Tunes and Return to File Upload
          </a>
          <button className="btn btn-md btn-danger align-self-center mt-3" onClick={() => setBlob(null)}>
            Return to File Upload Without Downloading
          </button>
        </div>    
        )}
    </div>
    {(!loading && !blob) && (
      <div className="col-12">
        <h2 className="text-center mb-3 text-white">File Upload</h2>
        {error && <h5 className="text-danger text-center">{error.message}</h5>}
        <form onSubmit={handleSubmit} ref={formRef} className="bg-white rounded p-3 shadow">
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="files">
              Select up to 100 file(s):
            </label>
            <input
              className="form-control"
              type="file"
              id="files"
              name="files"
              accept=".mp3"
              multiple
              required
            />
          </div>
          <ul className="list-group mt-3">
            <CheckboxFormGroup
              value={options.removeCommonSuffixes}
              name={"remove-common-suffixes"}
              handleChange={handleChangeCommonSuffixes}
              labelText={"Remove Common Suffixes"}
            />
            <CheckboxFormGroup
              value={options.y2mate}
              name={"remove-y2mate-string"}
              handleChange={handleChangeY2Mate}
              labelText={"Remove Y2Mate Code"}
            />
          </ul>
          <div className="form-control mt-3">
            <label htmlFor="remove-custom-string" className="mr-1">Custom text to remove:</label>
            <div className="input-group mb-3">
            <input
              className="p-2"
              type="text"
              value={customString}
              name="remove-custom-strings"
              id="remove-custom-strings"
              maxLength="40"
              onChange={handleChangeCustomString}
              style={{ width: '75%' }}
            />
            <button className="btn btn-outline-primary" onClick={handleSubmitString} style={{ width: '25%' }}>Add text</button>
            {customTextError && <p className="text-danger">{customTextError}</p>} 
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-lg btn-success col-12 fw-bold" type="submit">TAG MY TUNES</button>
          </div>
          <ListOfRemovedStrings
            customStrings={customStrings}
            setCustomStrings={setCustomStrings}
          />
        </form>
      </div>
    )}  
    </div>
  );
};

export default FileUploadForm;
