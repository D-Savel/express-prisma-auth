"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractEntityFromRequest(req) {
    var match;
    console.log('original URL', req.originalUrl);
    console.log("count '/'", (req.originalUrl.match(/\//g) || []).length);
    // For request to Entity by id uses method DEL, PUT, GET (/api/users/{id})
    var countBackslash = (req.originalUrl.match(/\//g) || []).length;
    if (countBackslash > 2) {
        // Create a regular expression pattern using the string(word) "/api" and char "/"
        console.log('in with id path request');
        var regex = /api\/([^\/]*)\//;
        // Find matches in the input string
        match = regex.exec(req.originalUrl);
    } // For request to Entity by query string uses method GET
    else if (req.originalUrl.includes('/') && req.originalUrl.includes('?')) {
        // Create a regular expression pattern using the string(word) "/api" and char "?"
        console.log('in with query string request');
        console.log('/ & ?');
        var regex = /api\/([^?]*)\?/;
        match = regex.exec(req.originalUrl);
    } // For request Entity with method Post: ex=>create user in User entity) or method GET: ex=>get all users in User entity
    else {
        // Replace 'api/' by '', place in array index 1 for same logic as regex result
        console.log('in query with simple /api/ENTITY ');
        match = ['none', req.originalUrl.replace('/api/', '')];
    }
    // If match is found, return the response without 's' to match with db entity
    match ? console.log('Entity in extract', match[1].trim().slice(0, -1)) : console.log('Entity failure', match);
    return match ? match[1].trim().slice(0, -1) : null;
}
exports.default = extractEntityFromRequest;
