
import { Request } from "express";
import { Prisma } from "@prisma/client";

function extractEntityFromRequest(req: Request): Partial<Uncapitalize<Prisma.ModelName>> | null {
  let match;
  console.log('original URL', req.originalUrl);
  console.log("count '/'", (req.originalUrl.match(/\//g) || []).length as number);

  // For request to Entity by id uses method DEL, PUT, GET (/api/users/{id})
  const countBackslash = (req.originalUrl.match(/\//g) || []).length;
  if (countBackslash > 2) {
    // Create a regular expression pattern using the string(word) "/api" and char "/"
    console.log('in with id path request');
    const regex = /api\/([^\/]*)\//;

    // Find matches in the input string
    match = regex.exec(req.originalUrl);
  } // For request to Entity by query string uses method GET
  else if (req.originalUrl.includes('/') && req.originalUrl.includes('?')) {
    // Create a regular expression pattern using the string(word) "/api" and char "?"
    console.log('in with query string request');
    console.log('/ & ?');
    const regex = /api\/([^?]*)\?/;
    match = regex.exec(req.originalUrl);
  }// For request Entity with method Post: ex=>create user in User entity) or method GET: ex=>get all users in User entity
  else {
    // Replace 'api/' by '', place in array index 1 for same logic as regex result
    console.log('in query with simple /api/ENTITY ');
    match = ['none', req.originalUrl.replace('/api/', '')];
  }
  // If match is found, return the response without 's' to match with db entity
  match ? console.log('Entity in extract', match![1].trim().slice(0, -1)) : console.log('Entity failure', match);
  return match ? match[1].trim().slice(0, -1) as unknown as Partial<Uncapitalize<Prisma.ModelName>> : null;
}

export default extractEntityFromRequest;