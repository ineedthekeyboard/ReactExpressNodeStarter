import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Grow from "material-ui/transitions/Grow";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    gridItem: {
        margin: "auto",
        minWidth: "350px",
        border: "1px solid black",
        boxShadow: "inset 2px 3px 0px 0px red, 2px 3px 0px 0px black"
    },
    button: {
        margin: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, ...props };
        // this.propTypes = {
        //   classes: PropTypes.object.isRequired
        // };
    }

    componentDidMount() {
        //After mount
    }
    componentWillUnmount() {
        //After Unmount
    }
    // updateField = e => {
    //   this.setState({ name: e.target.value });
    // };
    // sendUpdate = e => {
    //   this.props.fieldUpdated(this.state.name);
    // };
    handleInputChange = name => event => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: event.target.value
            }
        });
    };
    changeMode = () => {
        if (this.state.mode === "login") {
            this.setState({ mode: "register" });
        } else {
            this.setState({ mode: "login" });
        }
        // this.props.onModeChange ? this.props.onModeChange(this.state.mode) : false;
    };
    login = () => {
        console.log(this.state.user);
    };
    getMode(inverse) {
        if (inverse) {
            return this.isLoginMode() ? "Register" : "Login";
        }
        return this.isLoginMode() ? "Login" : "Register";
    }
    isLoginMode() {
        return this.state.mode === "login";
    }
    render() {
        const classes = this.props.classes;
        const user = this.state.user;
        const isRegistrationMode = !this.isLoginMode();
        return (
            <div className={classes.root}>
                <Grid container className={classes.grid}>
                    <Grid item xs={6} className={classes.gridItem}>
                        <AppBar
                            position="static"
                            color={this.isLoginMode() ? "primary" : "secondary"}
                        >
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    {this.getMode()}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper className={classes.paper} elevation={4}>
                            <form noValidate autoComplete="on">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="User ID"
                                            id="username"
                                            type="text"
                                            autoComplete="username"
                                            value={user.username}
                                            onChange={this.handleInputChange("username")}
                                            className={classes.textField}
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Password"
                                            id="password"
                                            type="password"
                                            // Just to show how to control errors
                                            error={isRegistrationMode}
                                            helperText={isRegistrationMode ? "Bad" : ""}
                                            //** */
                                            autoComplete="current-password"
                                            value={user.password}
                                            onChange={this.handleInputChange("password")}
                                            className={classes.textField}
                                            margin="dense"
                                        />
                                        {isRegistrationMode ? (
                                            // Is Register mode
                                            <Grow
                                                in={isRegistrationMode}
                                                {...(isRegistrationMode ? { timeout: 1000 } : {}) }
                                            >
                                                <div>
                                                    <TextField
                                                        label="Confirm Password"
                                                        id="confPassword"
                                                        type="password"
                                                        value={user.confPassword}
                                                        onChange={this.handleInputChange("confPassword")}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                    <TextField
                                                        label="Email"
                                                        id="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        value={user.email}
                                                        onChange={this.handleInputChange("email")}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                </div>
                                            </Grow>
                                        ) : (
                                                ""
                                            )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="raised"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={this.changeMode}
                                        >
                                            {this.getMode(true)}
                                        </Button>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            className={classes.button}
                                            onClick={this.login}
                                        >
                                            {this.getMode()}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
Login.propTypes = {
    page: PropTypes.string
};
export default withStyles(styles)(Login);