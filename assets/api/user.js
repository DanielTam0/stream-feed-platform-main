var scholarly = require("scholarly");
var wf = require('word-freq');
const cheerio = require("cheerio");
const unirest = require("unirest");
var fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const { response } = require("express");
const basePath = path.join(__dirname, '../../')
app.use(express.static(basePath));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(basePath));

const getAuthorProfileData = async (user_id) => {
  try {
    // Get the research URLs using the getResearchData() function
    const research_url = await getResearchData(user_id);

    // Define the profile array to store the results
    var profile = [];

    // Add the researcher image and name to the profile array
    profile[0] = research_url[0];
    profile[1] = research_url[1];

    // Remove the researcher image, name, and page numbers from the research_url array
    research_url.splice(0, 4);

    // Scrape the abstracts for each research article and store them in an array
    var abstract_array = [];
    for (var i = 0; i < research_url.length; i++) {
      abstract_array[i] = await unirest.get(research_url[i])
        .headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        })
        .then((response) => {
          var $ = cheerio.load(response.body);
          var abstract = "";
          abstract = $(".gsh_csp").text();

          return abstract;
        })
        .catch(e => {
          console.log(e);
        })
    }

    // Convert the abstracts to a string and replace hyphens with a special string to avoid errors with the word-freq library
    var abstract_str = abstract_array.toString();
    //abstract_str = abstract_str.replace(/-/g,'_hyphen_');

    //console.log(abstract_str);
    // Get the most frequent words from the abstracts
    var freq = wf.freq(abstract_str, true, false);
    function maxValues(o, n) {
      // Get object values and sort descending
      const values = Object.values(o).sort((a, b) => b - a);

      // Check if more values exist than number required
      if (values.length <= n) return o;

      // Find nth maximum value
      const maxN = values[n - 1];

      // Filter object to return only key/value pairs where value >= maxN
      return Object.entries(o)
        .reduce((o, [k, v]) => v >= maxN ? { ...o, [k]: v } : o, {});
    }

    // Get the 20 most frequent words and add them to the profile array
    const most_freq_vals = maxValues(freq, 20);
    var ObjToArr = [];
    for (var most_freq_val in most_freq_vals) {
      if (most_freq_vals.hasOwnProperty(most_freq_val)) {
        ObjToArr.push(most_freq_val.replaceAll("_hyphen_", "-"));
      }
    }
    profile = profile.concat(ObjToArr);

    // Return the profile array
    return await profile;

  } catch (e) {
    console.log(e);
  }
};

async function getResearchData(user_id) {
  try {
    const url = "https://scholar.google.com/citations?hl=en&user=" + user_id + "&pagesize=20";
    try {
      const response = await unirest.get(url)
        .headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        });
      if (response.statusCode !== 200) {
        throw new Error(`Invalid response status code: ${response.statusCode}`);
      }
      const $ = cheerio.load(response.body);
      const research_results = [];
      const researcher = []; //0: img_url, 1: name
      researcher[0] = $("#gsc_prf_pup-img").attr("src");
      researcher[1] = $("#gsc_prf_in").text();
      research_results.push(researcher[0]);
      research_results.push(researcher[1]);
      $(".gsc_a_t").each((i, el) => {
        const article_url = "https://scholar.google.com" + $(el).find(".gsc_a_t a").attr("href");
        research_results.push(article_url);
      });
      return await research_results;
    } catch (error) {
      console.error(`Error while fetching data from Google Scholar: ${error}`);
      throw error; // re-throw the error so it can be caught by the outer try-catch block
    }
  } catch (e) {
    console.log(e);
  }
}


module.exports = { getAuthorProfileData };
