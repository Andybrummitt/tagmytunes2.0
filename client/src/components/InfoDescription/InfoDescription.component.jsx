import CommonSuffixesListToggle from "../CommonSuffixesListToggle/CommonSuffixesListToggle.component";
import FileNameWrongInformationToggle from "../FilenameWrongInformaitonToggle/FileNameWrongInformationToggle.component";
import Y2MateDescriptionToggle from "../Y2MateDescriptionToggle/Y2MateDescriptionToggle.component";

const InfoDescription = () => {
  return (
    <div className="m-5 col-lg-3">
      <h2 className="mb-3 text-center">More information</h2>
      <div className="d-flex flex-column justify-content-center align-items-center p-5 shadow rounded">
        <Y2MateDescriptionToggle />
        <CommonSuffixesListToggle />
        <FileNameWrongInformationToggle />
      </div>
    </div>
  );
};

export default InfoDescription;
