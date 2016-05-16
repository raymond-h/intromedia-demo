import React from 'react';

import Container from '../components/container';

class Index extends React.Component {
    render() {
        return <html>
            <head>
                <title>Cool!!</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.js"></script>
            </head>
            <body style={ { margin: 0, padding: 0 } }>
                <Container width={1200} />
                <script src="index.js"></script>
            </body>
        </html>;
    }
}

module.exports = Index;
