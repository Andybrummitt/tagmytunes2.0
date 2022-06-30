import CommonSuffixesListToggle from "../CommonSuffixesListToggle/CommonSuffixesListToggle.component";
import FileNameWrongInformationToggle from "../FilenameWrongInformaitonToggle/FileNameWrongInformationToggle.component";
import Y2MateDescriptionToggle from "../Y2MateDescriptionToggle/Y2MateDescriptionToggle.component";
import "./info-description.scss"

const InfoDescription = () => {
  return (
    <div className="col-xl-3 h-100" id="info-description-container">
      <h2 className="mb-3 text-center text-white">More information</h2>
      <div className="d-flex flex-column justify-content-center align-items-center p-5 bg-white shadow rounded">
        <Y2MateDescriptionToggle />
        <CommonSuffixesListToggle />
        <FileNameWrongInformationToggle />
      </div>
    </div>
  );
};

export default InfoDescription;
