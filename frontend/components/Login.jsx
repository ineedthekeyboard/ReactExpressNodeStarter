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

import { Redirect } from 'react-router';

import { API, Endpoints } from "../services/index";

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
        border: "1px solid " + theme.palette.primary.main
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
        this.state = { mode: 'login', user: {}, ...props };
    }

    async componentDidMount() {
        //After mount
    }
    componentWillUnmount() {
        //After Unmount
    }
    handleInputChange = name => event => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: event.target.value
            }
        });
    }
    changeMode = () => {
        if (this.state.mode === "login") {
            this.setState({ mode: "register" });
        } else {
            this.setState({ mode: "login" });
        }
    }
    mainButton = async () => {
        let user;
        if (this.isLoginMode()) {
            user = await this.login();
        } else {
            user = await this.register();
        }
        if (user) { 
            this.setState({'userInformation': user });
            this.props.stateUpdater({ user: user });
            <Redirect to="/" />
        } else {
            console.log("login or register error");
        }
    }
    login = async () => {
        try {
            let loggedInData = await API.post(Endpoints('Users.login'), {
                email: this.state.user.email,
                password: this.state.user.password
            });
            return loggedInData.user;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    register = async () => {
        try {
            let loggedInData = await API.post(Endpoints('Users.register'), this.state.user);
            return loggedInData.user;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
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
        const isRegistrationMode = !this.isLoginMode();
        return (
            <div className={classes.root}>
                <Grid container className={classes.grid}>
                    <Grid item sm={6} xs={11} className={classes.gridItem}>
                        <AppBar
                            position="static"
                            elevation={1}
                            color={this.isLoginMode() ? "primary" : "secondary"}
                        >
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    {this.getMode()}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper className={classes.paper} elevation={1}>
                            <form noValidate autoComplete="on">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth={true}
                                            required
                                            label="Email"
                                            id="email"
                                            type="email"
                                            autoComplete="username"
                                            onChange={this.handleInputChange("email")}
                                            className={classes.textField}
                                            margin="dense"
                                        />
                                        <TextField
                                            label="Password"
                                            id="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
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
                                                        onChange={this.handleInputChange("confPassword")}
                                                        className={classes.textField}
                                                        margin="dense"
                                                    />
                                                    <TextField
                                                        label="User ID"
                                                        id="username"
                                                        type="text"
                                                        onChange={this.handleInputChange("username")}
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
                                            onClick={this.mainButton}
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
