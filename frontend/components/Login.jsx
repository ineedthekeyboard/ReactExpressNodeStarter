import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { withRouter } from "react-router-dom";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Grow from "material-ui/transitions/Grow";


import { API, Endpoints } from "../services/index";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
    },
    gridItem: {
        margin: "auto",
        minWidth: "350px"
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
        this.state = { mode: 'login', user: {} };
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
            this.props.stateUpdater({ user: user });
            this.props.history.push("/account");
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
        const userIsLoggedIn = (this.props.user && this.props.user.token && this.props.user.token !== '') ? true : false;
        if (userIsLoggedIn) {
            // this.props.history.push("/");
            return (
                <div className={classes.root}>
                    <Grid container className={classes.grid}>
                        <Grid item sm={6} xs={11} className={classes.gridItem}>
                            <AppBar
                                position="static"
                                elevation={6}
                                color={"secondary"}
                            >
                                <Toolbar>
                                    <Typography variant="title" color="inherit">
                                        You are logged in.
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        return (
            <div className={classes.root}>
                <Grid container className={classes.grid}>
                    <Grid item sm={6} xs={11} className={classes.gridItem}>
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
                        <Paper className={classes.paper}>
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
                                        {!isRegistrationMode ? (
                                        <Button
                                            variant="raised"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={this.changeMode}
                                        >
                                            {this.getMode(true)}
                                        </Button>):("")}
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
let stylesWrap = withStyles(styles)(Login);
let routeWrap = withRouter(stylesWrap);
export default routeWrap;
