import React, {useState} from "react";

const CustomForm = ({generate, setLoader}) => {

  const [prompt, setPrompt] = useState('');

  function handleChange(e){
    setPrompt(e.target.value);
  }

  function submit(){
    setLoader(true)
    generate(prompt);
  }

  return (
    <div>
        <div>
          
          <label htmlFor="prompt" className="LabelStyle">
            <h1>OR</h1>
            <p>Write me a poem...</p>
          </label>
          <br />
          <textarea
            rows="7"
            cols="50"
            id="prompt"
            name="prompt"
            form="smart"
            className="InputStyle"
            value={prompt}
            onChange={handleChange}
          />
            
        </div>
        <div>
          <button onClick={submit} className="btn-form">
            Generate
          </button>
        </div>
    </div>
  );
};

export default CustomForm;
