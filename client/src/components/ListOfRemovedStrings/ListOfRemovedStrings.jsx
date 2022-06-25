import { v4 as uuidv4 } from "uuid";

const ListOfRemovedStrings = ({ customStrings, setCustomStrings }) => {
  const handleRemove = (string) => {
    setCustomStrings((prevStrings) =>
      [...prevStrings].filter((prevStr) => prevStr !== string)
    );
  };

  return (
    <div className="container">
      <ul>
        {customStrings.map((string) => (
          <li key={uuidv4()}>
            <span>{string}</span>
            <button onClick={(e) => handleRemove(string)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfRemovedStrings;
