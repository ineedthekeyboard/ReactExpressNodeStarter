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
                    border:"2px solid",
                    fontFamily: "'Press Start 2P', cursive, sans"
                }
            },
            MuiToolbar: {
                root: {
                    height: "40px !important",
                    minHeight:"40px !important",
                    fontFamily: "'Press Start 2P', cursive, sans"
                } 
            },
            MuiTypography: {
                title: {
                    fontSize: "12px",
                    fontFamily: "'Press Start 2P', cursive, sans"
                }
            },
            MuiInput: {
                root: {
                    fontSize: "9px",
                    fontFamily: "'Press Start 2P', cursive, sans"
                }
            },
            MuiButton: {
                label: {
                    fontSize: "9px",
                    fontFamily: "'Press Start 2P', cursive, sans"
                }
            }
        }
    });
};
