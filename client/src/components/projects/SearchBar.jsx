// SearchBar.jsx

// Import component styles
import styles from "../../styles/projects/SearchBar.module.css";


// Search Bar component
function SearchBar({
  value,
  onChange,
  placeholder
}) {


  return (

    <div className={styles.searchBar}>


      {/* ==========================
          Search Input
      ========================== */}

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Search portfolio projects"
      />



      {/* ==========================
          Clear Search Button
      ========================== */}

      {value && (

        <button
          type="button"
          onClick={() =>
            onChange({
              target: {
                value: ""
              }
            })
          }
          className={styles.clearSearch}
          aria-label="Clear project search"
        >

          Clear

        </button>

      )}


    </div>

  );

}


// Export component
export default SearchBar;