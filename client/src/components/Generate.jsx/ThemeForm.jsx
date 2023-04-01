import React, { useState } from "react";

const ThemeForm = ({ generate, setLoader }) => {
  const [params, setParams] = useState({
    theme: "",
    language: "english",
    keywords: "",
    lyrics: 1,
  });

  function handle(e) {
    setParams((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  function submit(e) {
    setLoader(true)
    generate(params);
  }

  return (
    <div>
      <div>
        <label htmlFor="theme" className="LabelStyle">
          Theme
        </label>
        <br />
        <input
          id="theme"
          onChange={handle}
          value={params.theme}
          name="theme"
          type="text"
          className="InputStyle"
        />
      </div>
      <div>
        <label htmlFor="language" className="LabelStyle">
          Language
        </label>
        <br />
        <select
          name="language"
          value={params.language}
          onChange={handle}
          id="language"
          className="language"
        >
          <option lang="de" value="german">
            Deutsch
          </option>
          <option lang="en" value="english">
            English
          </option>
          <option lang="fr" value="french">
            Français
          </option>
          <option lang="sp" value="spanish">
            Español
          </option>
          <option lang="ro" value="romana">
            Română
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="keywords" className="LabelStyle">
          Keywords
        </label>
        <br />
        <input
          id="keyworks"
          name="keywords"
          type="text"
          value={params.keywords}
          className="InputStyle"
          onChange={handle}
        />
      </div>
      <div>
        <label htmlFor="lyrics" className="LabelStyle">
          Number of lyrics
        </label>
        <br />
        <input
          id="lyrics"
          name="lyrics"
          value={params.lyrics}
          type="number"
          className="InputStyle"
          min="1"
          max="5"
          onChange={handle}
        />
      </div>

      <button className="btn-form" onClick={submit}>
        Generate
      </button>
    </div>
  );
};

export default ThemeForm;
