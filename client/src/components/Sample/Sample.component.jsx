import afterSample from "../../assets/after-sample.png";
import beforeSample from "../../assets/before-sample.png";
import "./sample.styles.scss";

const Sample = () => {
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center p-1 mt-5 mb-5"
      id="sample-container"
    >
      <p className="text-center text-white">
        Organize your ID3 tags like <strong>artist</strong> and <strong>title</strong> with one click!
      </p>
      <div className="sample-img-container">
            <img
            className="col-12"
            src={beforeSample}
            alt="Before sample image"
            />
      </div>
      <div className="sample-img-container">
            <img
            className="col-12"
            src={afterSample}
            alt="After sample image"
            />
      </div>
    </div>
  );
};

export default Sample;
