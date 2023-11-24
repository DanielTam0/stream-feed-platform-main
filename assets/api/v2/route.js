const express = require('express');
const path = require('path');
const cronjob = require('cron');

const userProfile = require("./userprofile.js");
const rss = require("./rss.js");
const service = require("./service.js");

const route = express();
const DEBUG = true;

const job = new cronjob.CronJob(
    '00 04 * * * *',
    async () => {
        rss.updateFeeds();
    },
    null,
    true,
    'Asia/Taipei'
);

route.use(express.static(path.join(__dirname, '../../../')));

// user-profile route
route.get('/userprofile', userProfile.getUserProfile);

route.put("/userprofile", userProfile.scanUserProfile);

route.get('/userprofile/keywords', userProfile.getKeywords);

route.post('/userprofile/keywords', userProfile.postKeywords);

route.put('/userprofile/keyword/:keyword', userProfile.putKeyword);

route.delete('/userprofile/keyword/:keyword', userProfile.deleteKeyword);

// mainpage route
route.get('/mainpage', async (req, res) => {
    let keywords = await service.getKeywords();
    if (Object.keys(keywords).length == 0) {
        res.redirect("/v2/userprofile");
        return;
    }

    let forceUpdate = req.query.forceUpdate == "true";
    if (forceUpdate) {
        service.setPendingJournalIds([]);
        res.redirect("/v2/mainpage");
        return;
    }
    res.render("v2/mainpage", { organizers: rss.ORGANIZER });
});

route.get('/mainpage/journals', async (req, res) => {
    let type = req.query.type;
    let journals = null;
    let journalIds = null;
    let journalIdSet = null;
    switch (type) {
        case "pending":
            journalIds = await rss.getPendingJournalIds();
            journals = await rss.getJournalsByIds(journalIds);
            break
        case "bookmark":
            journalIdSet = await service.getBookmarkedJournalIds();
            journalIds = Array.from(journalIdSet);
            journals = await rss.getJournalsByIds(journalIds);
            break;
        case "history":
            journalIdSet = await service.getHistoryJournalIds();
            journalIds = Array.from(journalIdSet);
            journalIds.reverse();
            journals = await rss.getJournalsByIds(journalIds);
            break;
    }

    res.send(journals);
});

route.get('/mainpage/journal/:id', async (req, res) => {
    let id = req.params.id;
    let feed = await service.getJournal(id);
    res.send(feed);
});

route.get('/mainpage/journal/:id/status', async (req, res) => {
    let id = req.params.id;
    let bookmarkedJournalIds = await service.getBookmarkedJournalIds();
    let bookmarked = bookmarkedJournalIds.has(id);
    let historyJournalIds = await service.getHistoryJournalIds();
    let history = historyJournalIds.has(id);
    res.send( {bookmarked, history} );
});

route.put('/mainpage/journal/:id/bookmark', async (req, res) => {
    let id = req.params.id;
    let journalIdSet = await service.getBookmarkedJournalIds();
    if (journalIdSet.has(id)) {
        journalIdSet.delete(id);
    } else {
        journalIdSet.add(id);
    }
    
    service.setBookmarkedJournalIds(journalIdSet);

    res.send({ status: journalIdSet.has(id) });
});

route.put('/mainpage/journal/:id/history', async (req, res) => {
    let id = req.params.id;
    let journalIdSet = await service.getHistoryJournalIds();
    journalIdSet.delete(id);
    journalIdSet.add(id);
    service.setHistoryJournalIds(journalIdSet);

    res.send({ status: true });
});

route.get('/:organizer/endpoints', async (req, res) => {
    let organizer = req.params.organizer;
    let endpoints = rss.endpointAssociateByOrganizer.get(organizer);
    let endpointStatus = await service.getEndpoints();

    let endpointStatusArray = [];
    for (let endpoint of endpoints) {
        endpointStatusArray.push({ endpoint: endpoint, status: endpointStatus.has(endpoint) });
    }

    res.send(endpointStatusArray);
});

route.get('/endpoint/:endpoint/status', async (req, res) => {
    let endpoint = req.params.endpoint;
    let endpoints = await service.getEndpoints();

    let status = endpoints.has(endpoint);
    res.send( {status} );
});

route.post('/endpoint/:endpoint/toggle', async (req, res) => {
    let endpoint = req.params.endpoint;
    let endpoints = await service.getEndpoints();

    if (endpoints.has(endpoint)) {
        endpoints.delete(endpoint);
    } else {
        endpoints.add(endpoint);
    }

    service.setEndpoints(endpoints);
    service.setPendingJournalIds([]);

    res.send({ status: endpoints.has(endpoint) });
});

route.get('/bookmark', async (req, res) => {
    res.render("v2/bookmark");
});

route.get('/history', async (req, res) => {
    res.render("v2/history");
});

// database route
if (DEBUG) {
    route.post("/database/id", (req, res) => {
        let id = req.body.id;
        service.setId(id);
        res.send("OK");
    });

    route.delete("/database/id", (req, res) => {
        service.setId(null);
        res.send("OK");
    });

    route.post("/database/userimage", (req, res) => {
        let userImage = req.body.userImage;
        service.setUserImage(userImage);
        res.send("OK");
    });

    route.delete("/database/userimage", (req, res) => {
        service.setUserImage(null);
        res.send("OK");
    });

    route.post("/database/username", (req, res) => {
        let userName = req.body.userName;
        service.setUserName(userName);
        res.send("OK");
    });

    route.delete("/database/username", (req, res) => {
        service.setUserName(null);
        res.send("OK");
    });

    route.post("/database/keywords", (req, res) => {
        let keywords = req.body.keywords;
        service.setKeywords(keywords);
        res.send("OK");
    });

    route.delete("/database/keywords", (req, res) => {
        service.setKeywords({});
        res.send("OK");
    });

    route.delete("/database/endpoints", (req, res) => {
        service.setEndpoints(new Set());
        res.send("OK");
    });

    route.delete("/database/journals", (req, res) => {
        service.setJournals([]);
        res.send("OK");
    });

    route.delete("/database/bookmarks", (req, res) => {
        service.setBookmarkedJournalIds(new Set());
        res.send("OK");
    });
}

module.exports = { route };
