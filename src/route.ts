import { Express, Request, Response } from "express";

import { createSchema } from "./schema/user";
import requiresUser from "./middleware/requireUser";
import { createUserHandler } from "./controller/user";
import { createUserSessionSchema } from "./schema/session";
import validateRequest from "./middleware/validateRequest";
import {
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionHandler,
} from "./controller/session";

import {
    createPostHandler,
    updatePostHandler,
    deletePostHandler,
    getPostHandler,
} from "./controller/post";

import {
    createPostSchema,
    updatePostSchema,
    deletePostSchema,
} from "./schema/post";

// graphql-tools apollo-server-express graphql graphql-import-node swagger-ui-express @types/swagger-ui-express mysql2 @types/validator sequelize @types/sequelize express-fileupload @types/express-fileupload

function routes(app: Express) {
    app.get("/health", (req: Request, res: Response) => {
        // cd documents & cd new-node & cd typscript-node & cd one
        res.send("100% healthy");
    }); 

    // --------------------user and session----------------------------------//
    app.post("/api/users", validateRequest(createSchema), createUserHandler);
    app.post(                                                                
        "/api/sessions",                                                     
        validateRequest(createUserSessionSchema),                            
        createUserSessionHandler                                             
    );                                                                 
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
    app.get("/api/sessions", requiresUser, getUserSessionHandler);  

    // --------------------posts related routes ----------------------------//
    app.get(
        "/api/posts/:id", 
        requiresUser, getPostHandler
    );

    app.delete(
        "/api/posts/delete/:id", 
        [requiresUser, validateRequest(deletePostSchema)], 
        deletePostHandler
    );

    app.post(
        "/api/posts/edit/:id", 
        [requiresUser, validateRequest(updatePostSchema)], 
        updatePostHandler
    );

    app.post(
        "/api/posts/create", 
        [requiresUser, validateRequest(createPostSchema)], 
        createPostHandler
    );
}

export default routes;
