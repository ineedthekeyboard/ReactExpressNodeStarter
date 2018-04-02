import React, { Component } from 'react';
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

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
        border: "1px solid " + theme.palette.primary.main,
        textAlign: "center",
        padding: "1rem"
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

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const classes = this.props.classes;
        const { user } = this.props;
        return (
            <div className={classes.root}>
                <Grid container className={classes.grid}>
                    <Grid item sm={8} xs={11} className={classes.gridItem}>
                        <Typography variant="subheading" color="secondary">
                            This page is protected
                        </Typography>
                        <Typography variant="title" color="primary">
                            {user.email}'s Account Page
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
let stylesWrap = withStyles(styles)(Account);
export default stylesWrap;
