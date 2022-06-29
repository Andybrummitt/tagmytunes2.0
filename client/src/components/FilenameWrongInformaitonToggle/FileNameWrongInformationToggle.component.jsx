import { useState } from "react";

const FileNameWrongInformationToggle = () => {
  const [showFileNameWrongInformation, setShowFileNameWrongInformation] =
    useState(false);

  const toggleText = showFileNameWrongInformation
    ? "Hide unusual filename information"
    : "Why are my new zipped filenames unusual?";

  return (
    <div>
      <p
        className="blue-underline"
        onClick={() =>
          setShowFileNameWrongInformation(!showFileNameWrongInformation)
        }
      >
        {toggleText}
      </p>
      {showFileNameWrongInformation && (
        <p>
          Depending on the text format of the filename, the algorithm used will
          not recognize the artist and title which can lead to some
          discrepancies. This is quite rare however.
        </p>
      )}
    </div>
  );
};

export default FileNameWrongInformationToggle;
