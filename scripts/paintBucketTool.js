'use strict';

var PaintBucketTool = function() {
	var self = this;

	self.apply = function(grid, x, y, color) {
		var replaceColor = grid[x][y].color;
		var pixels = [grid[x][y]];
		var gridWidth = grid.length - 1;
		var gridHeight = grid[0].length - 1;

		if(color !== replaceColor) {
			while(pixels.length > 0) {
				var currentPixel = pixels.pop();
				var currentX = currentPixel.x;
				var currentY = currentPixel.y;

				grid[currentX][currentY].color = color;

				var pixelAbove =  currentY > 0 ? grid[currentX][currentY - 1] : null;
				var pixelBelow =  currentY < gridHeight ? grid[currentX][currentY + 1] : null;
				var pixelLeft =  currentX > 0 ? grid[currentX - 1][currentY] : null;
				var pixelRight =  currentX < gridWidth ? grid[currentX + 1][currentY] : null;

				if(pixelAbove && pixelAbove.color === replaceColor)
					pixels.push(pixelAbove);
				if(pixelBelow && pixelBelow.color === replaceColor)
					pixels.push(pixelBelow);
				if(pixelLeft && pixelLeft.color === replaceColor)
					pixels.push(pixelLeft);
				if(pixelRight && pixelRight.color === replaceColor)
					pixels.push(pixelRight);
			}
		}

		console.log('done');
	}
}
