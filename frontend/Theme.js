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
        },
        overrides: {
            App: {
                root: {
                    border: "1px solid black"
                }
            },
            MuiAppBar: {
                root: {
                    height: "40px",
                    minHeight:"40px",
                    fontFamily: "'Roboto Condensed', sans-serif"
                }
            },
            MuiToolbar: {
                root: {
                    height: "40px !important",
                    minHeight:"40px !important",
                    fontFamily: "'Roboto Condensed', sans-serif"
                } 
            },
            MuiTypography: {
                title: {
                    fontFamily: "'Roboto Condensed', sans-serif"
                }
            },
            MuiInput: {
                root: {
                    fontSize: "12px",
                    fontFamily: "'IBM Plex Mono', sans-serif"
                }
            },
            MuiButton: {
                label: {
                    fontFamily: "'Roboto Condensed', sans-serif"
                }
            }
        }
    });
};
