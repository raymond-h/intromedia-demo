import React from 'react';

import ReactiveImage from './reactive-img';

export default class Container extends React.Component {
    render() {
        const images = {
            'images/one-1024.png': 1024,
            'images/two-512.png': 512,
            'images/three-256.png': 256
        };

        const bootstrapColumns = {
            'lg': [6, 6],
            'xs': [12, 12]
        };

        return <div style={ {margin: 'auto', maxWidth: this.props.width} }>
            <ReactiveImage maxWidth={this.props.width} bootstrapColumns={bootstrapColumns} images={images} />
            <ReactiveImage maxWidth={this.props.width} bootstrapColumns={bootstrapColumns} images={images} />
        </div>;
    }
}
