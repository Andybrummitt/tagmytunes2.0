import "./instructions.scss"

const Instructions = () => {
  return (
    <div className="col-xl-4 col-l-5 col-md-5 h-100 mb-5" id="instructions-container">
      <h2 className="text-center mb-3 text-white">Instructions</h2>
      <ol className="list-group list-group-numbered">
        <li className="list-group-item d-flex align-items-start">
          <p className="ms-3 fw-bold">Upload up to 100 mp3 files.</p>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <p className="ms-3">Remove common suffixes like (Official Music Video) if wanted.</p>
          <span className="badge bg-warning rounded-pill">Optional</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <p className="ms-3">Remove Y2Mate code if wanted (long random alphanumeric code at the end of filename).</p>
          <span className="badge bg-warning rounded-pill">Optional</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <p className="ms-3">Add up to 10 custom texts to remove from the filename if wanted (up to 40 characters each text).</p>
          <span className="badge bg-warning rounded-pill">Optional</span>
        </li>
        <li className="list-group-item d-flex align-items-start">
          <p className="ms-3 fw-bold">Click the 'TAG MY TUNES' button.</p>
        </li>
        <li className="list-group-item d-flex align-items-start">
          <p className="ms-3 fw-bold">Wait for your tunes to be tagged and download the .zip file when it appears.</p>
        </li>
      </ol>
    </div>
  );
};

export default Instructions;
