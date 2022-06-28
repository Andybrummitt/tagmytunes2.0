import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommonSuffixesListToggle from "../CommonSuffixesListToggle/CommonSuffixesListToggle.component";
import CheckboxFormGroup from "../CheckboxFormGroup/CheckboxFormGroup";
import ListOfRemovedStrings from "../ListOfRemovedStrings/ListOfRemovedStrings";
import LoadingSpinner from "../LoadingSpinner.component";
import Y2MateDescriptionToggle from "../Y2MateDescriptionToggle/Y2MateDescriptionToggle.component";

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
    if (customString) {
      setCustomStrings([...customStrings, customString]);
      setCustomString("");
    }
  };

  return (
    <div className="container-lg d-flex justify-content-center">
      {error && <p className="text-danger">{error.message}</p>}
      <div className="col-lg-6">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label className="form-label" htmlFor="files">
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
          <div className="form-control">
            <label htmlFor="remove-custom-string" className="mr-1">Custom text to remove:</label>
            <div className="input-group mb-3">
            <input
              type="text"
              value={customString}
              name="remove-custom-strings"
              id="remove-custom-strings"
              onChange={handleChangeCustomString}
            />
            <button className="btn btn-outline-secondary" onClick={handleSubmitString}>Add text</button>
            </div>
          </div>
          <ListOfRemovedStrings
            customStrings={customStrings}
            setCustomStrings={setCustomStrings}
          />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <Y2MateDescriptionToggle />
        <CommonSuffixesListToggle />
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
