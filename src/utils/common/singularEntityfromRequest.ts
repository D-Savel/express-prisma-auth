
import { Request } from "express";
import extractEntitiesFromDb from "../db/extractEntitiesFromDb.js";
import { Entity } from "../../types/Entity.js";

function singularEntityFromRequest(req: Request): Entity | null {
  let match;
  let formatedMatch;
  // For request to Entity by id uses method DEL, PATCH, GET (/api/users/{id})
  const countBackslash = (req.originalUrl.match(/\//g) || []).length;
  if (countBackslash > 2) {
    // Create a regular expression pattern using the string(word) "/api" and char "/"
    const regex = /api\/([^\/]*)\//;

    // Find matches in the input string
    match = regex.exec(req.originalUrl);
  } // For request to Entity by query string uses method GET
  else if (req.originalUrl.includes('/') && req.originalUrl.includes('?')) {
    // Create a regular expression pattern using the string(word) "/api" and char "?"
    const regex = /api\/([^?]*)\?/;
    match = regex.exec(req.originalUrl);
  }// For request Entity with method Post: ex=>create user in User entity) or method GET: ex=>get all users in User entity
  else {
    // Replace 'api/' by '', placed in array index 1 for same logic as previous regex result
    match = ['none', req.originalUrl.replace('/api/', '')];
  }
  // transform match in request path to Db entitiy
  if (match![1].endsWith('ies')) {
    formatedMatch = match![1].trim().slice(0, -3) + 'y';
  } else {
    formatedMatch = match!![1].trim().slice(0, -1);
  }
  // If match is found, return the response without 's' to match with db entity
  if (!extractEntitiesFromDb().includes(formatedMatch as Entity)) {
    throw new Error(`Error: ${match![1].trim().slice(0, -1)} => No such entity in db`);
  }
  return match ? formatedMatch as Entity : null;
}

export default singularEntityFromRequest;