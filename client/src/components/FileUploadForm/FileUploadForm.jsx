import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FileUploadForm = () => {
  const formRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [options, setOptions] = useState({
    removeCommonSuffixes: false,
    y2mate: false,
  });
  const [customString, setCustomString] = useState("");
  const [customStrings, setCustomStrings] = useState([]);

  useEffect(() => {
    console.log(options.removeCommonSuffixes, 'common suffixes');
    console.log(options.y2mate, 'y2mate')
  }, [options]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const uuid = uuidv4();
    formData.append("custom-strings", customStrings);

    for (let data of formData.entries()) {
      console.log(data);
    }

    fetch(`/upload/${uuid}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => setBlob(url))
      .catch((err) => console.log(err));
  };

  const handleSubmitString = (e) => {
    e.preventDefault();
    if (customString) {
      setCustomStrings([...customStrings, customString]);
      setCustomString("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="files">Select files:</label>
        <input
          type="file"
          id="files"
          name="files"
          accept="audio/*"
          multiple
          required
        />
        <label htmlFor="remove-common-suffixes">Remove Common Suffixes</label>
        <input
          type="checkbox"
          value={options.removeCommonSuffixes}
          name="remove-common-suffixes"
          id="remove-common-suffixes"
          onChange={(e) =>
            setOptions({...options, removeCommonSuffixes: e.target.checked })
          }
        />
        <label htmlFor="remove-y2mate-string">Remove y2mate code: </label>
        <input
          type="checkbox"
          value={options.y2mate}
          name="remove-y2mate-string"
          id="remove-y2mate-string"
          onChange={(e) => setOptions({...options, y2mate: e.target.checked })}
        />
        <label htmlFor="remove-custom-strings">Custom text to remove:</label>
        <input
          type="text"
          value={customString}
          name="remove-custom-strings"
          id="remove-custom-strings"
          onChange={(e) => setCustomString(e.target.value)}
        />
        <button onClick={handleSubmitString}>Add text</button>
        <ul>
          {customStrings.map((string) => (
            <li key={uuidv4()}>{string}</li>
          ))}
        </ul>
        <input type="submit" value="Submit" />
      </form>
      {blob && (
        <a onClick={() => setBlob(null)} href={blob}>
          Download ZIP FILE
        </a>
      )}
    </div>
  );
};

export default FileUploadForm;
