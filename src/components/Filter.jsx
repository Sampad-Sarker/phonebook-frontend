import PropTypes from "prop-types";
const Filter = (props) => {
  const { filteredValue, inputFilterOnChange } = props;
  return (
    <>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={filteredValue}
          onChange={inputFilterOnChange}
        />
      </div>
    </>
  );
};

// Typechecking With PropTypes
Filter.propTypes = {
  filteredValue: PropTypes.string,
  inputFilterOnChange: PropTypes.func,
};
export default Filter;
