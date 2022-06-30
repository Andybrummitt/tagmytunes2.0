import afterSample from "../../assets/after-sample.png";
import beforeSample from "../../assets/before-sample.png";
import "./sample.styles.scss";

const Sample = () => {
  return (
    <div className="container" id="sample-container">
      <div className="d-flex align-items-center inner-sample-container mt-3">
        <span className="text-white">Before:</span>
        <img src={beforeSample} alt="Before sample image" />
      </div>
      <div className="d-flex align-items-center inner-sample-container mt-3">
        <span className="text-white">After:</span>
        <img src={afterSample} alt="After sample image" />
      </div>
    </div>
  );
};

export default Sample;
