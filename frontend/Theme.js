import createMuiTheme from "material-ui/styles/createMuiTheme";

export default (typeDef = "light") => {
    return createMuiTheme({
        palette: {
            type: typeDef,
            primary: {
                main: "#00897b",
                contrastText: "#ffffff"
            },
            secondary: {
                main: "#7b1fa2",
                contrastText: "#ffffff"
            },
            error: {
                main: "#c62828"
            }
        }
    });
};
