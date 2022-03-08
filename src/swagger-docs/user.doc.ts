
const userPaths = {
    "/users/login": {
        post: {
            tags: [ 'blog' ],
            summary: "login user",
            description: "this handler is for logging users in",
            parameters: [
                {
                    in: "body",
                    name: "credentials",
                    description: "this credential contains necesarry information for logging a user in",
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string",
                                required: true,
                            },

                            password: {
                                type: "string",
                                required: true,
                            },
                        }
                    }
                }
            ],

            responses: {
                200: {
                    description: "Ok/logedIn",
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                            },

                            status: {
                                type: "integer"
                            },

                            body: {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: {
                                            type: "string",
                                        },
                                        f_name: {
                                            type: "string",
                                        },
                                        l_name: {
                                            type: "string",
                                        }
                                    }
                                }
                            },
                        }
                    }
                },

                400: {
                    description: "Failure",
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                            },

                            status: {
                                type: "integer"
                            },

                            error: {
                                type: "string",
                            },
                        }
                    }
                }
            }
        }
    },

    "/users/me": {
        get: {
            tags: [ "User" ],
            summary: "get self",
            description: "handler for getting one self data from app",

            parameters: [
                {
                    name: "x-auth-token",
                    required: true,
                    type: "string",
                    in: "header"
                },
                {
                    name: "x-refresh-token",
                    required: true,
                    type: "string",
                    in: "header"
                }
            ]
        }
    },

    "/users/register": {
        post: {
            tags: [ "User" ],
            description: "route handler for registering a new user",
            summary: "create a new user",

            parameters: [
                {
                    name: "userObject",
                    in: "body",
                    required: true,
                    description: "the user object with which a new user will be created",

                    schema: {
                        type: "object",
                        properties: {
                            f_name: {
                                type: "string",
                                required: true,
                            },

                            l_name: {
                                type: "string",
                                required: true,
                            },

                            age: {
                                type: "integer",
                                required: true,
                            },

                            email: {
                                type: "string",
                                required: true,
                            },

                            password: {
                                type: "string",
                                required: true,
                            }
                        }
                    }
                }
            ],

            responses: {
                200: {
                    description: "success",
                    schema: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                            status: { type: "integer" },
                            data: {
                                type: "object",
                                schema: {
                                    f_name: { type: "string" },
                                    l_name: {type: "string" },
                                    age: { type: "integer" },
                                    email: { type: "string" },
                                    password: { type: "string" }
                                }
                            },
                        }
                    }
                },

                400: {
                    description: "failure",
                    schema: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                            status: { type: "integer" },
                            error: { type: "string" },
                        }
                    }
                },
            }
        }
    },

    "/users/logout/": {
        delete: {
            tags: [ "User" ],
            description: "this route handler logs user out by making the session invalid",
            summary: "log current user out",

            parameters: [
                {
                    name: "x-auth-token",
                    in: "header",
                    required: true,
                    type: "string",
                },

                {
                    name: "x-refresh-token",
                    in: "header",
                    required: true,
                    type: "string",
                }
            ],

            responses: {
                200: {
                    description: "Success",
                    type: "string"
                }
            }
        }
    },

    "/users/all": {
        get: {
            tags: [ "Users" ],
            summary: "get all user",
            description: "route handler to get all the users in the application",
            parameters: [
                {
                    name: "q",
                    in: "query",
                    type: "integer",
                    required: true,
                    enum: [ 1, 2, 3, 4 ]
                }
            ],

            responses: {
                200: {
                    description: "Ok/success",
                    schema: {
                        type: "array",
                        items: {
                            schema: {
                                type: "object",
                                properties: {
                                    f_name: {
                                        type: "string",
                                    },
                                    l_name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/users/{ userId }": {
        get: {
            tags: [ "Users" ],
            description: "route handler for getting a single user",
            summary: "get user by id",
            parameters: [
                {
                    name: "userId",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "the id the server will use to find the user"
                }
            ],

            responses: {
                200: {
                    description: "Ok",
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                            },

                            status: {
                                type: "integer"
                            },

                            body: {
                                schema: {
                                    type: "object",
                                    properties: {
                                        f_name: {
                                            type: "string",
                                        },
                                        l_name: {
                                            type: "string",
                                        }
                                    }
                                }
                            },
                        }
                    }
                },

                404: {
                    description: "User not found",
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                            },

                            status: {
                                type: "integer"
                            },

                            error: {
                                type: "string",
                            },
                        }
                    }
                }
            }
        }
    }
}

export default userPaths;