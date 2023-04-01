const {Configuration, OpenAIApi} = require("openai");
var Scraper = require('images-scraper');
var WordPOS = require('wordpos');
const LanguageDetect = require('languagedetect')

require("dotenv").config()

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});

const configuration = new Configuration({
    organization:process.env.OAI_ORGANISATION,
    apiKey: process.env.OAI_API_KEY
});

const openai = new OpenAIApi(configuration);


const lngDet = new LanguageDetect()

const wordpos = new WordPOS();


module.exports = {google, configuration, openai, lngDet, wordpos}