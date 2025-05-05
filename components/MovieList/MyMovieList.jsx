import MyListMovie from "./MyListMovie";

export default function MyMovieList({ selectedMovieList, onDeleteFromList }) {
  return selectedMovieList.map((seleceted) => (
    <MyListMovie
      seleceted={seleceted}
      key={seleceted.id}
      onDeleteFromList={onDeleteFromList}
    />
  ));
}
