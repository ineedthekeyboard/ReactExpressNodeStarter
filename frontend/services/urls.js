const URLS = {
    Users: {
        POST: "/users",
        GET: "/users/:email",
        UPDATE: "/users/:email",
        DELETE: "/users/:email",
        login: "/users/login",
        register: "/users/register"
    }
};

function getUrl(urlSelection) {
    urlSelection = urlSelection.split(".");
    let url = URLS;
    for (let prop in urlSelection) {
        url = url[urlSelection[prop]];
    }
    return url;
}
function replaceParams(url, params) {
    for (let param in params) {
        url = url.replace(param, params[param]);
    }
    return url;
}
export default function (urlSelection, params) {
    let url = getUrl(urlSelection);
    if (params) {
        url = replaceParams(url, params);
    }
    return url;
}
