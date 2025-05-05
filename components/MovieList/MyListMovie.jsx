export default function MyListMovie({ seleceted, onDeleteFromList }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={
              seleceted.poster_path
                ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                  seleceted.poster_path
                : "/img/no-image.jpg"
            }
            alt={seleceted.title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{seleceted.title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{seleceted.vote_average}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{seleceted.runtime} dk</span>
              </p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteFromList(seleceted.id)}
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
