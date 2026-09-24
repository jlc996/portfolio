// useFetch.js

// Import React hooks
import { useState, useEffect } from "react";

// Custom hook for fetching data from an API
function useFetch(url) {

  // Store the fetched data
  const [data, setData] = useState([]);

  // Track loading state
  const [isLoading, setIsLoading] = useState(true);

  // Track errors
  const [error, setError] = useState(null);

  // Fetch data whenever the URL changes
  useEffect(() => {

    // Prevent state updates if the component unmounts
    let isMounted = true;

    // Asynchronous function to fetch data
    async function fetchData() {

      try {

        // Begin loading
        setIsLoading(true);

        // Request data from the API
        const response = await fetch(url);

        // Throw an error if the request fails
        if (!response.ok) {
          throw new Error("Unable to retrieve data.");
        }

        // Convert the response to JSON
        const result = await response.json();

        // Update state if the component is still mounted
        if (isMounted) {
          setData(result);
          setError(null);
        }

      } catch (err) {

        // Save the error message
        if (isMounted) {
          setError(err.message);
        }

      } finally {

        // Stop loading
        if (isMounted) {
          setIsLoading(false);
        }

      }

    }

    // Call the fetch function
    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };

  }, [url]);

  // Return the state values
  return {
    data,
    isLoading,
    error,
  };

}

// Export the hook
export default useFetch;