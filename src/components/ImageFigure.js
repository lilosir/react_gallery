require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class ImageFigure extends React.Component {
	render() {
		var styleObj = {};
		if(this.props.attr){
			styleObj = this.props.attr.pos;
		}
		return (
			<figure className="img-figure" style={styleObj}>
				<figcaption>
					<img src={this.props.data.imageURL}
						 alt={this.props.data.title}/>
					<h2 className="img-title">
					{this.props.data.title}
					</h2>
				</figcaption>
			</figure>
		);
	}
}

export default ImageFigure;