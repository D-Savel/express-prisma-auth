
import { Request } from "express";
import { Entity } from "../../types/Entity.js";

function pluralEntityFromRequest(req: Request): Entity | null {
  let match;
  // For request to Entity by id uses method DEL, PATCH, GET (/api/users/{id})
  const countBackslash = (req.originalUrl.match(/\//g) || []).length;
  if (countBackslash > 2) {
    // Create a regular expression pattern using the string(word) "/api" and char "/"
    console.log('in with id path request');
    const regex = /api\/([^\/]*)\//;

    // Find matches in the input string
    match = regex.exec(req.originalUrl);
  }
  // For request to Entity by query string uses method GET
  else if (req.originalUrl.includes('/') && req.originalUrl.includes('?')) {
    // Create a regular expression pattern using the string(word) "/api" and char "?"
    console.log('PluralEntity: In with query string request');
    const regex = /api\/([^?]*)\?/;
    match = regex.exec(req.originalUrl);
  }
  // For request Entity with method Post: ex=>create user in User entity) or method GET: ex=>get all users in User entity
  else {
    // Replace 'api/' by '', placed in array index 1 for same logic as previous regex result
    console.log('PluralEntity: In query with simple /api/ENTITY ');
    match = ['none', req.originalUrl.replace('/api/', '')];
  }

  return match ? match[1].trim() as Entity : null;
}

export default pluralEntityFromRequest;