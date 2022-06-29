import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckboxFormGroup from "../CheckboxFormGroup/CheckboxFormGroup";
import ListOfRemovedStrings from "../ListOfRemovedStrings/ListOfRemovedStrings";
import LoadingSpinner from "../LoadingSpinner.component";

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
    console.log(customStrings)
    if(customStrings.includes(customString)){
      console.log('whatds')
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
    <div className=" col-lg-4 h-50 d-flex justify-content-center  m-5">
      {error && <p className="text-danger">{error.message}</p>}
      <div className="col-lg-12">
        <h2 className="text-center mb-3">File Upload</h2>
        <form onSubmit={handleSubmit} ref={formRef} className="bg-white rounded p-5 shadow">
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="files">
              Select up to 100 file(s):
            </label>
            <input
              className="form-control"
              type="file"
              id="files"
              name="files"
              accept="audio/*"
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
          <ListOfRemovedStrings
            customStrings={customStrings}
            setCustomStrings={setCustomStrings}
          />
          <div className="text-center">
            <button className="btn btn-lg btn-success col-6 fw-bold" type="submit">TAG MY TUNES</button>
          </div>
        </form>
        {loading && <LoadingSpinner />}
        {blob && (
          <a onClick={() => setBlob(null)} href={blob}>
            Download ZIP FILE
          </a>
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;
