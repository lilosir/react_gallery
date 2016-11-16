require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImageFigure from './ImageFigure.js';

//get images data
let imageData = require('../data/imageData.json');


//intert URL which is convered by file name
imageData = (function getImageUri(imageDataArr){
	return imageDataArr.map(function(item){
		var imageURL = require('../images/'+ item.fileName);
		return Object.assign(item, {'imageURL': imageURL})
	})
})(imageData);

function getRangeNumber(num1, num2){
	return Math.random()*(num2 - num1) + num1;
}

class AppComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			imgPosArr: [
				/*{
					pos:{
						left: '0',
						top: '0',
					}
				}*/
			]
		}
	}

	Constant = {
		centerPos: { //center photo
			left: 0,
			top: 0
		},

		leftPos: {  //left photos
			x: [0,0],
			y: [0,0]
		},

		rightPos: {  //right photos
			x: [0,0],
			y: [0,0]
		},

		topPos: {  //top photo
			x: [0,0],
			y: [0,0]
		}
	};

	/*
	 *rearrange all the photos
	 @params: centerIndex is the index of showing in the center
	 */
	rearrange(centerIndex){
		var imgPosArr = this.state.imgPosArr;
		var constant = this.Constant;
		var	centerPos = constant.centerPos;
		var	leftPos = constant.leftPos;
		var	rightPos = constant.rightPos;
		var	topPos = constant.topPos;

		var	topImgNumber = Math.floor(Math.random()*2);

		var	imgCenterArr = imgPosArr.splice(centerIndex,1);
		
		//fix center photo position
		imgCenterArr[0].pos = centerPos;

		//fix top photo position
		var imgTopIndex =  Math.floor(Math.random(imgPosArr.length - topImgNumber));
		var imgTopPosArr = imgPosArr.splice(imgTopIndex, topImgNumber);

		imgTopPosArr.forEach((value, index)=>{
			imgTopPosArr[index].pos = {
				left: getRangeNumber(topPos.x[0], topPos.x[1]),
				top: getRangeNumber(topPos.y[0], topPos.y [1])
			}
		});

		//fix left and right section photos
		for (var i = 0, j = imgPosArr.length, k = j/2; i < j; i++) {
			if(i < k){
				imgPosArr[i].pos = {
					left: getRangeNumber(leftPos.x[0],leftPos.x[1]),
					top: getRangeNumber(leftPos.y[0],leftPos.y[1])
				}
			}else{
				imgPosArr[i].pos = {
					left: getRangeNumber(rightPos.x[0],rightPos.x[1]),
					top: getRangeNumber(rightPos.y[0],rightPos.y[1])
				}
			}
		}

		if(imgTopPosArr && imgTopPosArr[0]){
			imgPosArr.splice(imgTopIndex, 0, imgTopPosArr[0])
		}

		imgPosArr.splice(centerIndex, 0, imgCenterArr[0]);

		this.setState({
			imgPosArr: imgPosArr
		});
			
	}

	componentDidMount() {

		// get stage size
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageHeight = stageDOM.scrollHeight,
			stageWidth = stageDOM.scrollWidth,
			halfStageHeight = Math.round(stageHeight / 2),
			halfStageWidth = Math.round(stageWidth / 2);

		//get a imagefiure size
		var imageFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imageHeight = imageFigureDOM.scrollHeight,
			imageWidth = imageFigureDOM.scrollWidth,
			halfImageHeight = Math.round(imageHeight / 2),
			halfImageWidth = Math.round(imageWidth / 2);

		// center photo position
		this.Constant.centerPos = {
			left: halfStageWidth - halfImageWidth,
			top: halfStageHeight - halfImageHeight
		}


		this.Constant.leftPos.x[0] = -halfImageWidth;
		this.Constant.leftPos.x[1] = halfStageWidth - halfImageWidth * 3;

		this.Constant.leftPos.y[0] = this.Constant.rightPos.y[0] = -halfImageHeight;
		this.Constant.leftPos.y[1] = this.Constant.rightPos.y[1] = stageHeight - halfImageHeight;

		this.Constant.rightPos.x[0] = halfStageWidth + halfImageWidth;
		this.Constant.rightPos.x[1] = stageWidth - halfImageWidth;

		this.Constant.topPos.x[0] = halfStageWidth - halfImageWidth;
		this.Constant.topPos.x[1] = halfStageHeight - halfImageHeight;
		this.Constant.topPos.y[0] = -halfImageHeight;
		this.Constant.topPos.y[1] = halfStageHeight - halfImageWidth * 3;

		this.rearrange(0);
	}

	render() {

		let imgFigures = [];
		let controllerUnits = [];


		imageData.forEach(function(value, index){

			if(!this.state.imgPosArr[index]){
				this.state.imgPosArr[index]={
					pos: {
						left: 0,
						top: 0
					}
				}
			}
			return imgFigures.push(<ImageFigure key={index} data={value} ref={'imgFigure'+index} attr={this.state.imgPosArr[index]}/>)
		}.bind(this))

		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{/*
						imageData.map((item,index)=>{
							return <ImageFigure data={item}/>
						}
						)
					*/}
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;

