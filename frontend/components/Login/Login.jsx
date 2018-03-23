import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './Login.scss';

class Test1 extends Component {
    render() {
        return (
            <div className="Login">
                <Card className="loginCard">
                    <CardHeader
                        title="Login"
                        subtitle="Subtitle"
                    />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="Register" />
                        <FlatButton label="Login" />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Test1;
