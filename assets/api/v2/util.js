const sha256 = require("js-sha256");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

function mapReplacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries())
        };
    }
    
    return value;
}

function mapReviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    
    return value;
}

function setReplacer(key, value) {
    if (value instanceof Set) {
        return {
            dataType: 'Set',
            value: Array.from(value.keys())
        };
    }

    return value;
}

function setReviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Set') {
            return new Set(value.value);
        }
    }

    return value;
}

function max(array) {
    let result = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > result) {
            result = array[i];
        }
    }

    return result;
}

function min(array) {
    let result = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < result) {
            result = array[i];
        }
    }

    return result;
}

function hashSha256(data) {
    return sha256(data);
}

module.exports = { sleep, mapReplacer, mapReviver, setReplacer, setReviver, max, min, hashSha256 }
