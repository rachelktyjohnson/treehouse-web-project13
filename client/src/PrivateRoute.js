import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default function PrivateRoute ({ component: Component, ...rest }){
    return (
        //This wraps the component with the requirement that a request must come with authentication
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }} />
                    )
                    }
                />
            )}
        </Consumer>
    );
};
