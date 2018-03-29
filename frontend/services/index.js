import Endpoint from "./urls";
import API from "./api";
module.exports = {
    API: API,
    Endpoints: Endpoint
};
//Endpoints used like so Endpoints("Users.GET", { ":id": "1234" })
