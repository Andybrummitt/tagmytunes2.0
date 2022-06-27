import { useState } from "react";
import "./y2MateDescriptionToggle.scss";

const Y2MateDescriptionToggle = () => {
  const [showY2MateDescription, setShowY2MateDescription] = useState(false);

  return (
    <div>
      <p className="blue-underline" onClick={() => setShowY2MateDescription(!showY2MateDescription)}>
        What is Y2Mate Code?
      </p>
      {showY2MateDescription && (
        <p>
          The Y2Mate code is a common suffix that adds a long alphanumeric code
          at the end of the file name. Checking this box will remove the code.
        </p>
      )}
    </div>
  );
};

export default Y2MateDescriptionToggle;
