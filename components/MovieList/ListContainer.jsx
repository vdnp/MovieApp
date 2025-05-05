import { useState } from "react";

export default function ListContainer({ children }) {
  const [isOpenM, setIsOpenM] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpenM((val) => !val)}
      >
        {isOpenM ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpenM && children}
    </div>
  );
}
