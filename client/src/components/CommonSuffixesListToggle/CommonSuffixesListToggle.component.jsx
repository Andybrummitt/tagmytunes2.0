import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { commonSuffixes } from "../../commonSuffixes";

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
          <h5>List of common suffixes</h5>
          <ul>
            {commonSuffixes.map((suffix) => (
              <li key={uuidv4()}>{suffix}</li>
            ))}
          </ul>
          <p className="text-warning"><strong>
            Removing common suffixes will remove both capitalized and lowercase
            suffixes.
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CommonSuffixesListToggle;
