import PropTypes from "prop-types";
const PersonForm = (props) => {
  const {
    formSubmit,
    newName,
    inputNameOnChange,
    newNumber,
    inputNumberOnChange,
  } = props;
  return (
    <>
      <form onSubmit={formSubmit}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={inputNameOnChange} />
          <div>
            number:{" "}
            <input
              type="tel"
              value={newNumber}
              onChange={inputNumberOnChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

// Typechecking With PropTypes
PersonForm.propTypes = {
  formSubmit: PropTypes.func,
  newName: PropTypes.string,
  inputNameOnChange: PropTypes.func,
  newNumber: PropTypes.string,
  inputNumberOnChange: PropTypes.func,
};
export default PersonForm;
