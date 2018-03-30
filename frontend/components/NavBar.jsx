import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Menu, { MenuItem } from "material-ui/Menu";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom:'0.5rem'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    fabPlacement: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3
    },
    a: {
        textDecoration: 'none',
        color: 'inherit'
    },
    icon: {
        height: '40px'
    }
});

class MenuAppBar extends React.Component {
    state = {
        auth: false,
        anchorEl: null
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    renderLoggedInButtons = () => {
        const { classes } = this.props;
        const {  anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
                <div>
                    <Tooltip id="tooltip-alerts" title="Alerts">
                        <IconButton
                            color="inherit"
                            className={classes.button}
                            aria-label="Add an alarm"
                        >
                            <Icon>alarm</Icon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip id="tooltip-alerts" title="Ticker Charts">
                        <IconButton
                            color="inherit"
                            className={classes.button}
                            aria-label="Ticker Charts"
                        >
                            <Icon>timeline</Icon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip id="tooltip-alerts" title="User Info">
                        <IconButton
                            aria-owns={open ? "menu-appbar" : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                        <Icon>account_circle</Icon>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={open}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            );
    }
    renderPublicButtons = () => {
        const { classes } = this.props;
        return (
                <div>
                <Link to="/login" className={classes.a}>
                        <Tooltip id="tooltip-alerts" title="Login">
                            <IconButton
                                color="inherit"
                                className={classes.button}
                                aria-label="Add an alarm"
                            >
                                <Icon>launch</Icon>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
            );
    }
    render() {
        const { classes } = this.props;
        const { auth } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" elevation={0}>
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            <Link to="/" className={classes.a}>
                                React Demo
                            </Link>
                        </Typography>
                        {auth && this.renderLoggedInButtons()}
                        {!auth && this.renderPublicButtons()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);