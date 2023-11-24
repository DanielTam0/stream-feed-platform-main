var database = require("./database.js");
var util = require("./util.js");

const KEY_ID = "id";
const KEY_USER_IMAGE = "userImage";
const KEY_USER_NAME = "userName";
const KEY_KEYWORDS = "keywords";
const KEY_ENDPOINTS = "endpoints";
const KEY_UPDATED_ENDPOINTS = "updatedEndpoints";
const KEY_PENDING_JOURNAL_IDS = "pendingJournalIds";
const KEY_BOOKMARKED_JOURNAL_IDS = "bookmarkedJournalIds";
const KEY_HISTORY_JOURNAL_IDS = "historyJournalIds";

function setId(value) {
    database.upsert(KEY_ID, value);
}

async function getId() {
    return await database.read(KEY_ID);
}

function setUserImage(value) {
    database.upsert(KEY_USER_IMAGE, value);
}

async function getUserImage() {
    return await database.read(KEY_USER_IMAGE);
}

function setUserName(value) {
    database.upsert(KEY_USER_NAME, value);
}

async function getUserName() {
    return await database.read(KEY_USER_NAME);
}

function setKeywords(keywords) {
    database.upsert(KEY_KEYWORDS, JSON.stringify(keywords));
}

async function getKeywords() {
    let keywords = await database.read(KEY_KEYWORDS);
    if (keywords == null) {
        return {};
    }

    return JSON.parse(keywords);
}

function setEndpoints(endpoints) {
    database.upsert(KEY_ENDPOINTS, JSON.stringify(endpoints, util.setReplacer));
}

async function getEndpoints() {
    let endpoints = await database.read(KEY_ENDPOINTS);
    if (endpoints == null) {
        return new Set();
    }

    return JSON.parse(endpoints, util.setReviver);
}

function setJournal(journalId, journal) {
    database.upsert(journalId, JSON.stringify(journal));
}

async function getJournal(journalId) {
    let journal = await database.read(journalId);
    if (journal == null) {
        return null;
    }

    return JSON.parse(journal);
}

function setPendingJournalIds(journalIds) {
    database.upsert(KEY_PENDING_JOURNAL_IDS, JSON.stringify(journalIds));
}

async function getPendingJournalIds() {
    let journalIds = await database.read(KEY_PENDING_JOURNAL_IDS);
    if (journalIds == null) {
        return [];
    }

    return JSON.parse(journalIds);
}

function setBookmarkedJournalIds(journalIds) {
    database.upsert(KEY_BOOKMARKED_JOURNAL_IDS, JSON.stringify(journalIds, util.setReplacer));
}

async function getBookmarkedJournalIds() {
    let journalIds = await database.read(KEY_BOOKMARKED_JOURNAL_IDS);
    if (journalIds == null) {
        return new Set();
    }

    return JSON.parse(journalIds, util.setReviver);
}

function setHistoryJournalIds(journalIds) {
    database.upsert(KEY_HISTORY_JOURNAL_IDS, JSON.stringify(journalIds, util.setReplacer));
}

async function getHistoryJournalIds() {
    let journalIds = await database.read(KEY_HISTORY_JOURNAL_IDS);
    if (journalIds == null) {
        return new Set();
    }

    return JSON.parse(journalIds, util.setReviver);
}

module.exports = { getId, setId, getUserImage, setUserImage, getUserName, setUserName, getKeywords, setKeywords, getEndpoints, setEndpoints, setJournal, getJournal, setPendingJournalIds, getPendingJournalIds, setBookmarkedJournalIds, getBookmarkedJournalIds, setHistoryJournalIds, getHistoryJournalIds };
