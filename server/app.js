const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {google, openai, lngDet, wordpos} = require("./middleware.js");
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());

app.get("/ok", (req, res) => {
    res.json({answ:"ok"});
});

app.post("/poem", async (req, res) => {

    //FORM THE PROMPT

    const lyrics = req.body.lyrics || 2;
    const theme = req.body.theme;
    const keywords = req.body.keywords;
    const language = req.body.language;

    
    var prompt = "Write me a " + lyrics + " lyric poem";
    
    if (theme){
        prompt += " about " + theme;
    }
    
    if (keywords){
        prompt += " using the following keywords: " + '"' + keywords + '"';
    }
    
    if (language){
        prompt += " in "+ language;
    }

    //LANGUAGE RECOGNISION
    
    const lang = getLangShort(language);

    //ASK OPENAI

    const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: prompt,
        max_tokens: lyrics*50,
        temperature: 0

    });

    const choice = response.data.choices[0];

    const splitText = choice.text.split("\n")

    res.json({...choice, splitText: splitText, lang: lang})
    
});

app.post("/images", async (req, res) => {

    const query = req.body.t || "random"
    const results = await google.scrape(query, 1);
    const img = {
        url: results[0].url,
        alt: results[0].title
    };

    res.json(img)
});

app.post("/poem/custom", async (req, res)=> {

    const prompt = "Write me a poem " + req.body.prompt;

    //GETTING THE IMAGE BASED ON USER'S PROMPT

    var imageKeyWord = await getNounFrom(prompt);
    const query = imageKeyWord || "world"
    const results = await google.scrape(query, 1);
    const img = {
        url: results[0].url,
        alt: results[0].title
    };

    //GETTING CHAT-GPT'S POEM

    const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: prompt,
        max_tokens: 250,
        temperature: 0
    });
    const choice = response.data.choices[0];

    //SPLITTING EVERY ROW IN AN ARRAY
    const splitText = choice.text.split("\n");
    //RECOGNIZING LANGUAGE BASED ON CHAT GPT'S POEM
    const language = lngDet.detect(choice.text, 1)[0];
    const lang = getLangShort(language[0])

    //FORMING THE RESPONSE TO THE USER WITH -- POEM & IMAGE --
    res.json({poem: {...choice, splitText: splitText, lang: lang}, img:img})
});

//RETURNS THE FIRST NOUN DETECTED BASED ON THE USERS REQUEST
async function getNounFrom(prompt) {
    const results = await getNounsFrom(prompt);
    for (let i = 0; i < results.length; i++){
        if (results[i] !== "poem"){
            return results[i]
        }
    }
}
async function getNounsFrom(prompt) {
    return await wordpos.getNouns(prompt, function(results){});
}

//FORMATING LANGUAGE FOR LOCAL-VOICES CHOICE
function getLangShort(language){
    var lang = 'en'
    switch (language){
        case 'german':
            lang = 'de';
        case 'french':
            lang = 'fr';
        case 'spanish':
            lang = 'sp';
        case 'romana':
            lang = "ro";
    }
    return lang;
}

app.listen(3001, () => {
    console.log("Server started!");
})
