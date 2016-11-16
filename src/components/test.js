var arr=['1','2','3'];
// arr = arr.map((value,index)=>(value+2));
// console.log(arr)

var s = arr.splice(1,1)

// console.log(Math.floor(Math.random()*2))

function getRangeNumber(num1, num2){
	return Math.random()*(num2 - num1) + num1;
}

console.log(getRangeNumber(2,4))