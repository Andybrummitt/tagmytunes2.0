import { useState } from "react";

const Y2MateDescriptionToggle = () => {
  const [showY2MateDescription, setShowY2MateDescription] = useState(false);


  const toggleText = showY2MateDescription
  ? "Hide Y2Mate Information"
  : "What is Y2Mate Code?";

  return (
    <div>
      <p className="blue-underline" onClick={() => setShowY2MateDescription(!showY2MateDescription)}>
        {toggleText}
      </p>
      {showY2MateDescription && (
        <p>
          The Y2Mate code is a common suffix that adds a long alphanumeric code
          at the end of the file name. Checking the box will remove the code.
        </p>
      )}
    </div>
  );
};

export default Y2MateDescriptionToggle;
