export default function SearchResultNav({ totalResults }) {
  return (
    <div className="col-4 text-end">
      <strong>{totalResults}</strong> Kayıt bulundu.
    </div>
  );
}
