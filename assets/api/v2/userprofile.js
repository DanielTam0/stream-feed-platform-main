const path = require('path');
const unirest = require("unirest");
const cheerio = require("cheerio");

const service = require("./service");
const util = require("./util");

function getUserProfile(req, res) {
    Promise.all([service.getUserImage(), service.getUserName(), service.getKeywords()]).then((values) => {
        let userImage = values[0];
        let userName = values[1];
        let keywords = values[2];

        if (keywords == null) {
            keywords = [];
        }

        res.render('v2/userprofile', { userImage, userName });
    });
}

async function getKeywords(req, res) {
    let keywords = await service.getKeywords();
    res.send(keywords);
}

async function postKeywords(req, res) {
    let newKeywords = req.body.keywords;
    let keywords = await service.getKeywords();

    Object.entries(newKeywords).forEach(([keyword, weighting]) => {
        keywords[keyword] = weighting;
    });
    service.setKeywords(keywords);
    service.setPendingJournalIds([]);

    res.send("ok");
}

async function putKeyword(req, res) {
    let keyword = req.params.keyword;
    let weighting = req.body.weighting;

    let keywords = await service.getKeywords();
    keywords[keyword] = weighting;
    service.setKeywords(keywords);
    service.setPendingJournalIds([]);

    res.send("ok");
}

async function deleteKeyword(req, res) {
    let keyword = req.params.keyword;
    let keywords = await service.getKeywords();
    delete keywords[keyword];
    service.setKeywords(keywords);
    service.setPendingJournalIds([]);

    res.send("ok");
}

function scanUserProfile(req, res) {
    let userId = req.body.userId;
    scanUserProfile_(userId).then(() => {
        service.setPendingJournalIds([]);
        res.send("");
    });
}

async function scanUserProfile_(userId) {
    let response = await getUserProfile_(userId);

    service.setUserImage(response.userImage);
    service.setUserName(response.userName);

    let requests = [];
    for (let i = 0; i < response.userArticle.length; i++) {
        requests[i] = getArticleAbstractWithRandomSleep(response.userArticle[i], 120);
    }

    let abstracts = [];
    await Promise.all(requests)
        .then(async (value) => {
            for (let i = 0; i < response.userArticle.length; i++) {
                abstracts[i] = await value[i];
            }
        })

    let joinedAbstract = abstracts.join(" ");
    let keywords = await pythonGetKeywords(joinedAbstract);
    await updateKeywords(keywords);
}

async function getUserProfile_(userId) {
    const url = "https://scholar.google.com/citations?hl=en&user=" + userId + "&pagesize=20";
    const response = await unirest.get(url)
        .headers({
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        })
        .then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(`Invalid response status code: ${response.statusCode}`);
            }
    
            const $ = cheerio.load(response.body);
            const userImage = $("#gsc_prf_pup-img").attr("src");
            const userName = $("#gsc_prf_in").text();
            
            let userArticle = [];
            $(".gsc_a_t").each((i, el) => {
                const article = "https://scholar.google.com" + $(el).find(".gsc_a_t a").attr("href");
                userArticle.push(article);
            });
    
            userArticle.splice(0, 2)
            return { userImage, userName, userArticle };
        })
        .catch((error) => {
            console.error(error);
        });
    
    return response;
}

async function getArticleAbstractWithRandomSleep(url, maxDelay) {
    let delay = Math.floor(Math.random() * maxDelay);
    await util.sleep(delay);
    return getArticleAbstract(url);
}

async function getArticleAbstract(url) {
    const response = await unirest.get(url)
        .headers({
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        })
        .then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(`Invalid response status code: ${response.statusCode}`);
            }

            const $ = cheerio.load(response.body);
            const articleAbstract = $(".gsh_csp").text();
            return articleAbstract;
        })
        .catch((error) => {
            console.error(error);
        })

    return response;
}

async function pythonGetKeywords(abstract) {
    const response = await unirest.post("http://127.0.0.1:5000/getkeywords")
        .headers({
            "Content-Type": "application/json"
        })
        .send({
            data: abstract,
            limit: 20
        })
        .then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(`Invalid response status code: ${response.statusCode}`);
            }

            return response.body; // python return [{keyword: weighting}, {...}, ... ]
        })
        .catch((error) => {
            console.error(error);
        });
    
    return response;
}

async function updateKeywords(keywords) {
    let originalKeywords = await service.getKeywords();

    keywords.forEach((keyword) => {
        Object.entries(keyword).forEach(([key, value]) => {
            originalKeywords[key] = value;
        });
    });

    service.setKeywords(originalKeywords);
}

module.exports = { getUserProfile, scanUserProfile, getKeywords, postKeywords, putKeyword, deleteKeyword }
