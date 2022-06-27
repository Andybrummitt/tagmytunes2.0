import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { commonSuffixes } from "../../commonSuffixes";
import "./commonSuffixesListToggle.scss";

const CommonSuffixesListToggle = () => {
  const [showCommonSuffixes, setShowCommonSuffixes] = useState(false);

  const toggleText = showCommonSuffixes
    ? "Hide common suffixes"
    : "What are common suffixes?";

  return (
    <div>
      <p className="blue-underline" onClick={() => setShowCommonSuffixes(!showCommonSuffixes)}>
        {toggleText}
      </p>
      {showCommonSuffixes && (
        <div className="common-suffixes-list">
          <ul>
            {commonSuffixes.map((suffix) => (
              <li key={uuidv4()}>{suffix}</li>
            ))}
          </ul>
          <p>
            Removing common suffixes will remove both capitalized and lowercase
            suffixes.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommonSuffixesListToggle;
