const getAvarage = (array) =>
  array.reduce((sum, value) => sum + value / array.length, 0);

export default function MyListSummary({ selectedMovieList }) {
  const averageRating = getAvarage(
    selectedMovieList.map((m) => m.vote_average)
  );
  const averageDuration = getAvarage(selectedMovieList.map((m) => m.runtime));
  const avarageUserRating = getAvarage(
    selectedMovieList.map((m) => m.userRating)
  );
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listem [{selectedMovieList.length}] Film Eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{averageRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-stars text-warning me-1"></i>
            <span>{avarageUserRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass-split text-warning me-1"></i>
            <span>{averageDuration} dk</span>
          </p>
        </div>
      </div>
    </div>
  );
}
