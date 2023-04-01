import React from "react";

const Poem = ({ poem, img }) => {

  const synth = window.speechSynthesis;

  function voice(e) {
      if (e.target.name === "speak" && synth.paused === true){
        synth.resume();
      } else if (e.target.name === "pause"){
        synth.pause()
      } else {
        readText(poem.text);
      }
  }

  function readText(text){

    const voices = synth.getVoices();
    const v = voices.filter(voice => voice.lang.includes(poem.lang));
    
    const msg = new SpeechSynthesisUtterance(text);

    if(v.length !== 0){
      msg.voice = v[0];
    } else {
      msg.voice = voices[0];
    }

    msg.voice = v[0];

    msg.rate = 1;

    synth.speak(msg);
    synth.resume();
  }

  return (
    <div>
      <section className="generate-poem text-center" id="poem">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-lg-6">
              <h2 className="text-white mb-4">Your poem</h2>
              <button className="btn btn-dark" name="speak" onClick={voice}>
                <i className="bi bi-play-circle-fill"></i>
              </button>
              <button className="btn btn-dark" name="pause" onClick={voice}>
                <i className="bi bi-pause-circle-fill"></i>
              </button>
              <div className="poem">
                {poem.splitText.map((lyric, i) => (
                  <p key={i}>
                    {lyric} <br />
                  </p>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <img src={img.url} className="img-fluid" alt={img.alt} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Poem;
