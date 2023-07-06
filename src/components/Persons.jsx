import PropTypes from "prop-types";
const Persons = (props) => {
  const { filteredPersons, persons, filtered, deleteContact} = props;

  return (
    <>
      <ul>
        {!filteredPersons
          ? persons.map((person) => (
              <li key={person.id}>
                {person.name} {person.number} <button onClick={()=>deleteContact(person.id)}>delete</button>
              </li>
            ))
          : filtered.length > 0
          ? filtered
          : "not exists 😟"}
      </ul>
    </>
  );
};

// Typechecking With PropTypes
Persons.propTypes = {
  filteredPersons: PropTypes.arrayOf(PropTypes.object),
  // persons: PropTypes.arrayOf(PropTypes.object),
  persons: PropTypes.array,
  filtered: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func
};

export default Persons;
