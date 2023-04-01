import React, { useState, useRef } from "react";
import { FidgetSpinner } from "react-loader-spinner";

import CustomForm from "../components/Generate.jsx/CustomForm";
import ThemeForm from "../components/Generate.jsx/ThemeForm";
import Poem from "../components/Generate.jsx/Poem";

const Generate = ({ proxy }) => {
  const [poem, setPoem] = useState({
    language: "en-US",
    text: "Here will appear the poem the we generate.",
    splitText: ["Here will apper the poem the we generate."],
  });
  const [img, setImg] = useState({
    url: "/assets/img/Fotor_AI.png",
    msg: "You will see here a generated image",
  });
  const [showLoader, setShowLoader] = useState(false);

  function generateWithParams(params) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };
    fetch(proxy + "/poem", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPoem(data);
        scrollToPoem();
      });

    getImg(params.theme);
  }

  function generateWithPrompt(prompt) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    };
    fetch(proxy + "/poem/custom", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPoem(data.poem);
        setImg(data.img);
        setShowLoader(false);
        scrollToPoem()
      });
  }

  async function getImg(theme) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t: theme }),
    };

    await fetch(proxy + "/images", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setImg(data);
        setShowLoader(false);
        scrollToPoem();
      });
  }

  const ref = useRef(null);
  
  function scrollToPoem(){
    window.scrollTo({
        top:1200,
        behavior:'smooth'
    })
  }

  return (
    <div>
      
      <header className="generate">
        <div className="text-center description">
          <h3 className="text-white-50 mx-auto mt-2 mb-5">
            With the click of a button, users can input a few keywords or
            phrases to guide the app's creative process, and within moments, the
            app generates a poem that captures the essence of their input.
          </h3>
        </div>
        <div className="container px-4 px-lg-5 d-flex align-items-center justify-content-center">
        <div className="spinner">
            <FidgetSpinner
            visible={showLoader}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor="#F4442E"
            /> 
        </div>

          <div className="text-center">

              <ThemeForm generate={generateWithParams} getImg={getImg} setLoader={setShowLoader}/>

              <CustomForm generate={generateWithPrompt} setLoader={setShowLoader}/>
          </div>
        </div>

      </header>
      <div ref={ref}>
      <Poem poem={poem} img={img} />
      </div>
    </div>
  );
};

export default Generate;
