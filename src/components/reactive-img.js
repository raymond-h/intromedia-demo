import React from 'react';
import _ from 'lodash';

const sizes = ['xs', 'sm', 'md', 'lg'];

function fillInMissingColumnCounts(bootstrapColumns) {
    const colCounts = ['xs', 'sm', 'md', 'lg'].map(size => [size, bootstrapColumns[size]]);
    const outSizes = {};

    let lastColCount;
    for(const [size, colCount] of colCounts) {
        if(colCount != null) { lastColCount = colCount; }

        outSizes[size] = lastColCount;
    }

    return outSizes;
}

function columnsToFactor(cols) {
    return cols
        .map(col => col / 12)
        .reduce((acc, cur) => acc * cur);
}

function columnsToPercent(cols) {
    return columnsToFactor(cols) * 100 + '%';
}

function bootstrapSizeToMinWidth(size) {
    switch(size) {
        case 'lg': return 1200;
        case 'md': return 992;
        case 'sm': return 768;

        default: return 0;
    }
}

function bootstrapColumnsAsSizes(maxWidth, bootstrapColumns) {
    bootstrapColumns = fillInMissingColumnCounts(bootstrapColumns);

    const sizesMinWidths = sizes.map(size => [size, bootstrapSizeToMinWidth(size)]);

    // Assemble map that maps from breakpoints (in pixels) to matching CSS to use.
    // The CSS being: calc(factor * 100vw) or calc(factor * maxWidth)
    // 'factor' is dependent on amount of columns the image takes up
    const breakpoints = {};
    for(const [size, minWidth] of sizesMinWidths) {
        const factorMaxWidth = (minWidth < maxWidth) ? ('100vw') : (maxWidth + 'px');

        breakpoints[minWidth] = 'calc(' + columnsToFactor(bootstrapColumns[size]) + '*' + factorMaxWidth + ')';
    }

    // Add an extra breakpoint specifically for the 'maxWidth' as well
    const [tmpSize, _width] = _.findLast(sizesMinWidths, ([_, width]) => width <= maxWidth);
    breakpoints[maxWidth] = 'calc(' + columnsToFactor(bootstrapColumns[tmpSize]) + '*' + maxWidth + 'px)';

    // Convert to the final string, to set as the 'sizes' attribute
    return Object.keys(breakpoints).sort((a, b) => a - b)
        .map(breakpoint => {
            return '(min-width: ' + breakpoint + 'px) ' + breakpoints[breakpoint]
        })
        .reverse()
        .join(', ');
}

function imagesAsSrcSet(images) {
    return Object.keys(images)
        .map(url => [url, images[url]])
        .map(([url, size]) => url + '?v=' + Math.random() + ' ' + size + 'w')
        .join(', ');
}

export default class ReactiveImage extends React.Component {
    render() {
        // const btCols = fillInMissingColumnCounts(this.props.bootstrapColumns);
        const btCols = this.props.bootstrapColumns;

        return <img style={this.props.style}
            src="images/three-256.png"

            sizes={bootstrapColumnsAsSizes(this.props.maxWidth, btCols)}

            srcSet={imagesAsSrcSet(this.props.images)}
            />;
    }
}
