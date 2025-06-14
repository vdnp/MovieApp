import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_API_KEY;

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovies(page) {
        try {
          setLoading(true);
          setErrors("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
            { signal: signal }
          );

          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu.");
          }

          const data = await res.json();
          if (data.total_results === 0) {
            throw new Error("Film bulunamadı!");
          }

          setMovies(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        } catch (e) {
          if (e.name === "AbortError") {
            console.log("Aborted");
          } else {
            setErrors(e.message);
          }
        }
        setLoading(false);
        if (query.length < 1) {
          setMovies([]);
          setErrors("");
          return;
        }
      }
      getMovies(currentPage);

      return () => {
        controller.abort();
      };

      //First render(mount)
      // fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
      // )
      //   .then((res) => res.json())
      //   .then((data) => setMovies(data.results));
    },
    [query, currentPage]
  );

  return {
    movies,
    loading,
    errors,
    currentPage,
    totalPages,
    totalResults,
    nextPage,
    previousPage,
  };
}
