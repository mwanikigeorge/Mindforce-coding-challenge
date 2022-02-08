import "./App.css";
import { useFetch } from "./useFetch";
import { useState } from "react";

const InLineEdit = ({ title, setTitle }) => {
  const [editingValue, setEditingValue] = useState(title);

  const onChange = (e) => {
    setEditingValue(e.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setTitle(title);
    } else {
      setTitle(event.target.value);
    }
  };

  return (
    <input
      type="text"
      className="w-full hover:bg-slate-100 hover:border-dashed hover:border-y hover:border-slate-200"
      aria-label="Title field"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

function PhotoList(props) {
  const [title, setTitle] = useState("");

  const listPhotos = props.photos.map((photo) => (
    <li
      key={photo.id}
      className="bg-white w-full flex shadow-sm even:bg-slate-50 ring-1 ring-slate-200"
    >
      <img className="h-full" src={photo.thumbnailUrl} alt={photo.title} />
      <div className="w-full py-2 px-2">
        <InLineEdit title={photo.title} setTitle={setTitle} />
        <div>{Date.now()}</div>
      </div>
    </li>
  ));

  return <ul className="flex flex-wrap flex-column">{listPhotos}</ul>;
}

function App() {
  console.log("App rendering ...");
  const { data } = useFetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=100"
  );

  console.log(data);
  return (
    <div className="bg-slate-100">
      <header className="App-header w-full py-7 text-center text-2xl">
        100 photos from jsonplaceholder
      </header>
      <main className="container mx-auto">
        {data ? <PhotoList photos={data} /> : "Loading..."}
      </main>
    </div>
  );
}

export default App;
