/**error400BodySchema */
/**params
/*
emptyKey : Empty value key name in request body causing error
syntaxErrorkey: Syntax error value in request causing error
syntaxErrorValue : Value use in body request for syntax error
*/

export function error400BodySchema(emptyKey: string, syntaxErrorkey: string, syntaxErrorValue: string): object {
  return (
    {
      description: `Bad Request: Bad parameters (Body,path,query string) for request.\nResponse example for these parameters => empty ${emptyKey}, and ${syntaxErrorkey} parameter syntax error with value: ${syntaxErrorValue}`,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: 'Bad Request: Bad parameters (Body,path,query string) for request'
              },
              data: {
                type: null,
                example: null
              },
              errors: {
                type: 'array',
                example: [
                  {
                    type: 'field',
                    value: '',
                    msg: `${emptyKey} is required`,
                    path: emptyKey,
                    location: 'body'
                  },
                  {
                    type: 'field',
                    value: syntaxErrorValue,
                    msg: "Please provide valid email",
                    path: syntaxErrorkey,
                    location: 'body'
                  }
                ]
              }
            }
          }
        }
      }
    }
  );
}

export const error404Schema: object = {
  description: 'Route not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error'
          },
          message: {
            type: 'string',
            example: 'Route not found'
          },
          data: {
            type: null,
            example: null
          },
          errors: {
            type: 'string',
            example: 'Route doesnt exist'
          }
        }
      }
    }
  }
};

export function error409Schema(dbEntity: string): object {
  return (
    {
      description: `Duplicate record(s) in db for ${dbEntity}`,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: `Duplicate record value(s) for ${dbEntity} field(s)`
              },
              data: {
                type: null,
                example: null
              },
              errors: {
                type: 'string',
                example: `${dbEntity} already exists in database with some unique field/record value`
              }
            }
          }
        }
      }
    }
  );
}

/* For using with path
// First parameter pathKeyValue : key use in query path (id for example)
// Second parameter dbEntity: entity value for search in db(user entity searched in db for exapmle)
// Third parameter syntaxErrorValue : Path value use in query path(id value use in query path for example)
*/

/*parameters: pathValue(optional for use with query path request error),
*/
export function error422Schema(pathKeyValue: string, dbEntity: string, pathValue?: string): object {
  return (
    {
      description: `${pathValue ?
        `No match(es) for {${pathKeyValue}} in path with ${pathKeyValue} = ${pathValue}`
        :
        `No match(es) for query string (ex: username=Johnnu,email=emma@me.fr)`
        }`,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                example: 'Error fetching data to database Error'
              },
              data: {
                type: null,
                example: null
              },
              errors: {
                type: 'string',
                example: `${pathValue ?
                  `${dbEntity} controller error (get${dbEntity[0].toUpperCase()}` + dbEntity.slice(1).toLowerCase() +
                  `By${pathKeyValue[0].toUpperCase()}` + pathKeyValue.slice(1).toLowerCase() +
                  `: No ${dbEntity} matches with ${pathKeyValue}: ${pathValue}`
                  :
                  `${dbEntity[0].toUpperCase()}${dbEntity.slice(1).toLowerCase()} controller error (get${dbEntity[0].toUpperCase()}` +
                  `${dbEntity.slice(1).toLowerCase()}` +
                  `ByQuery` + `: No user(s) match(es) with query string ,username=Johnnu,email=emma@me.fr`
                  })`
              }
            }
          }
        }
      }
    }
  );
}


export const error500Schema: object = {
  description: 'Server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error'
          },
          message: {
            type: 'string',
            example: 'Node server error'
          },
          data: {
            type: null,
            example: null
          },
          errors: {
            type: 'string',
            example: "Node error \n ${error.stack!}"
          }
        }
      }
    }
  }
};