"use strict";
/**error400BodySchema */
/**params
/*
emptyKey : Empty value key name in request body causing error
syntaxErrorkey: Syntax error value in request causing error
syntaxErrorValue : Value use in body request for syntax error
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.error500Schema = exports.error404Schema = void 0;
exports.error400BodySchema = error400BodySchema;
exports.error422Schema = error422Schema;
function error400BodySchema(emptyKey, syntaxErrorkey, syntaxErrorValue) {
    return ({
        description: "Bad Request: Bad body or path parameters for request.\nResponse example for these parameters => empty ".concat(emptyKey, ", and ").concat(syntaxErrorkey, " parameter syntax error with value: ").concat(syntaxErrorValue),
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
                            example: 'Bad Request: Bad body or path parameters for request'
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
                                    msg: "".concat(emptyKey, " is required"),
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
    });
}
exports.error404Schema = {
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
/* For using with path
// First parameter pathKeyValue : key use in query path (id for example)
// Second parameter dbEntity: entity value for search in db(user entity searched in db for exapmle)
// Third parameter syntaxErrorValue : Path value use in query path(id value use in query path for example)
*/
/*parameters: pathValue(optional for use with query path request error),
*/
function error422Schema(pathKeyValue, dbEntity, pathValue) {
    return ({
        description: "".concat(pathValue ?
            "No match(es) for {".concat(pathKeyValue, "} in path with ").concat(pathKeyValue, " = ").concat(pathValue)
            :
                "No match(es) for query string (ex: username=Johnnu,email=emma@me.fr)"),
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
                            example: "".concat(pathValue ?
                                "".concat(dbEntity, " controller error (get").concat(dbEntity[0].toUpperCase()) + dbEntity.slice(1).toLowerCase() +
                                    "By".concat(pathKeyValue[0].toUpperCase()) + pathKeyValue.slice(1).toLowerCase() +
                                    ": No ".concat(dbEntity, " matches with ").concat(pathKeyValue, ": ").concat(pathValue)
                                :
                                    "".concat(dbEntity[0].toUpperCase()).concat(dbEntity.slice(1).toLowerCase(), " controller error (get").concat(dbEntity[0].toUpperCase()) +
                                        "".concat(dbEntity.slice(1).toLowerCase()) +
                                        "ByQuery" + ": No user(s) match(es) with query string ,username=Johnnu,email=emma@me.fr", ")")
                        }
                    }
                }
            }
        }
    });
}
exports.error500Schema = {
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
