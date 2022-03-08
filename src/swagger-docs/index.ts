import userPaths from "./blog.doc";
import blogPaths from "./user.doc"


const mainDoc = {
    swagger: "2.0",

    info: {
        title: "Welcome blog app",
        description: "this app is used for creating blog",
        version: "1.3.7",

        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        },

        host: "localhost:3030",
        basePath: "/",

        tags: [
            {
                name: "Blogs",
                description: "the blogs created",
            },

            {
                name: "Users",
                description: "the blogs created",
            }
        ],

        schemes: [ "http" ],
        consumes: [ "application/json" ],
        produces: [ "application/json" ],

        contact: {
            email: "ademolaolutomiwa4real@gmail.com",
            name: "ademola olutomiwa",
            phone: "+2349034119761"
        }
    },

    paths: {
        ...userPaths,
        ...blogPaths,
    }
}

export default JSON.stringify(mainDoc);