import React from 'react';
import PropTypes from 'prop-types';

export default class Draggable extends React.Component{
    drag = (event) =>{
        event.dataTransfer.setData('transfer', event.target.src);
    }

    noAllowDrop = (event) =>{
        event.stopPropagation();
    }

    render(){
        return(
            <div id={this.props.id} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop} >
                {this.props.children}
            </div>
        );
    }
}

Draggable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
}