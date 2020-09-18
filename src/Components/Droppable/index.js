import React from 'react';
import PropTypes from 'prop-types';

export default class Droppable extends React.Component{

    render(){
        return(
            <div id={this.props.id} onDrop={this.props.drop} onDragOver={this.props.allowDrop}>
                {this.props.children}
            </div>
        )
    }
}

Droppable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
}