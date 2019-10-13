'use strict';

const fs = require('fs');
const bitmap2vector = require('bitmap2vector');
const {png2svg} = require('svg-png-converter');

(async () => {
	const result = await png2svg({
	  tracer: 'imagetracer',
	  optimize: true,
	  input: fs.readFileSync('./image2.png') ,
	  numberofcolors: 100,
	  // viewbox: true,
	  roundcoords: 100,
	  rightangleenhance: 10,
	  strokewidth: 2,
	  blurdelta: 10
	})
	console.log(result);
	fs.writeFileSync("tmp2.svg", result.content);

	// fs.writeFileSync("./tmp25.svg", outputBuffer.split('base64,')[1], 'base64');
})();
// from file input stream

