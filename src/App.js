import "./App.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  updateById,
  updateAll,
  resetAll,
  updateEditing,
} from "./redux/dataSlice";

// Create inline editable input for every title
const InLineEdit = ({ title, id }) => {
  const [editingTitle, setEditingTitle] = useState(title);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditingTitle(title);
  }, [title]);

  const onChange = (e) => {
    setEditingTitle(e.target.value);
    // update editing redux state
    dispatch(updateEditing(true));
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    setEditingTitle(title);
    dispatch(updateById({ title: editingTitle, id: id }));
  };

  return (
    <input
      type="text"
      className="w-full capitalize hover:bg-slate-100 hover:border-dashed hover:border-y hover:border-slate-200"
      aria-label="Title field"
      value={editingTitle}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

// List component
function PhotoList(props) {
  // Get data from redux store
  const { data } = useSelector((state) => state.data);
  // create a list of photos
  const listPhotos = data.map((photo) => (
    <li
      key={photo.id}
      className="bg-white w-full flex shadow-sm even:bg-slate-50 ring-1 ring-slate-200"
    >
      <img className="h-full" src={photo.thumbnailUrl} alt={photo.title} />
      <div className="w-full py-2 px-2">
        <InLineEdit title={photo.title} id={photo.id} />
        <div className="ml-2">{Date.now()}</div>
      </div>
    </li>
  ));

  return <ul className="flex flex-wrap flex-column">{listPhotos}</ul>;
}

// Main app component
function App() {
  const dispatch = useDispatch();

  //fetch data once from server and update state§
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleReset = (e) => {
    dispatch(resetAll());
  };

  //Get statuses from redux store
  const { loading, editing } = useSelector((state) => state.data);

  return (
    <div className="bg-slate-100">
      <header className="App-header items-center container mx-auto justify-items-center w-full py-7 justify-between flex text-2xl">
        100 photos from jsonplaceholder
        <div>
          <button
            className="bg-blue-600 transition-all hover:bg-blue-700 mr-4 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400"
            disabled={!editing ? true : false}
            onClick={() => dispatch(updateAll())}
          >
            Update
          </button>
          <button
            className="bg-red-300 transition-all hover:bg-red-400 text-white font-bold py-2 px-4 rounded disabled:bg-slate-300 disabled:text-slate-600"
            disabled={!editing ? true : false}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </header>
      <main className="container mx-auto">
        {loading ? (
          <div className="w-full text-center text-xl">Loading...</div>
        ) : (
          <PhotoList />
        )}
      </main>
    </div>
  );
}

export default App;
