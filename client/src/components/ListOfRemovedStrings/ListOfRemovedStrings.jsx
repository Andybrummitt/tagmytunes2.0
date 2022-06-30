import { v4 as uuidv4 } from "uuid";

const ListOfRemovedStrings = ({ customStrings, setCustomStrings }) => {
  const handleRemove = (string) => {
    setCustomStrings((prevStrings) =>
      [...prevStrings].filter((prevStr) => prevStr !== string)
    );
  };

  return (
    <div className="container mt-3 mb-3">
    <h5 className="text-center">{customStrings.length > 0 && 'List of removed custom text'}</h5>
    <ol className="list-group list-group-numbered">
        {customStrings.map((string) => (
          <li className="list-group-item d-flex align-items-start" key={uuidv4()}>
            <span className="ms-3 fw-bold">{string}</span>
            <button className="btn btn-sm btn-danger ms-auto" onClick={() => handleRemove(string)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListOfRemovedStrings;
