import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommonSuffixesListToggle from "../CommonSuffixesListToggle/CommonSuffixesListToggle.component";
import FormGroup from "../FormGroup/FormGroup";
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
  const [ error, setError ] = useState(null);

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
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        setBlob(url);
        setLoading(false);
      })
      .catch((err) => setError(err));
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
    <div>
    {error && <p className="error-mssg">{error.message}</p>}
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="files">Select up to 100 file(s):</label>
          <input
            type="file"
            id="files"
            name="files"
            accept="audio/*"
            multiple
            required
          />
        </div>
        <FormGroup
          type={"checkbox"}
          value={options.removeCommonSuffixes}
          name={"remove-common-suffixes"}
          handleChange={handleChangeCommonSuffixes}
          labelText={"Remove Common Suffixes"}
        />
        <CommonSuffixesListToggle />
        <FormGroup
          type={"checkbox"}
          value={options.y2mate}
          name={"remove-y2mate-string"}
          handleChange={handleChangeY2Mate}
          labelText={"Remove Y2Mate Code"}
        />
        <Y2MateDescriptionToggle />
        <FormGroup
          type={"text"}
          value={customString}
          name={"remove-custom-strings"}
          handleChange={handleChangeCustomString}
          labelText={"Custom text to remove:"}
        />
        <button onClick={handleSubmitString}>Add text</button>
        <ListOfRemovedStrings
          customStrings={customStrings}
          setCustomStrings={setCustomStrings}
        />
        <input type="submit" value="Submit" />
      </form>
      {loading && <LoadingSpinner />}
      {blob && (
        <a onClick={() => setBlob(null)} href={blob}>
          Download ZIP FILE
        </a>
      )}
    </div>
  );
};

export default FileUploadForm;
