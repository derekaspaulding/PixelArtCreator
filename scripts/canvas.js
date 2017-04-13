'use strict'

var Canvas = function(pixelSize, width, height) {
	var self = this;
	self.grid = [];
	self.undoStack = [];
	self.redoStack = [];
	self.pixelSize;
	self.gridWidth;
	self.gridHeight;
	self.canvasElt = document.getElementById('canvas');
	self.ctx = self.canvasElt.getContext('2d');
	self.showCoords = false;
	self.tools = {};
	self.currentTool;

	self.constructor = function(pixelSize, width, height) {
		self.pixelSize = pixelSize ? pixelSize : 25;
		self.gridWidth = width ? width : 25;
		self.gridHeight = height ? height : 25;

		self.tools.paintBrush = new PaintBrushTool();
		self.tools.eraser = new EraserTool();
		self.tools.paintBucket = new PaintBucketTool();
		self.currentTool = self.tools.paintBrush;

		for(var x = 0; x < self.gridWidth; x++) {
			var column = []
			for(var y = 0; y < self.gridHeight; y++) {
				var newPixel = {
					path: new Path2D(),
					x: x,
					y: y,
					color: 'rgba(0,0,0,0.25)',
					empty: true,
				}
				column.push(newPixel);
				newPixel.path.rect(newPixel.x * self.pixelSize, newPixel.y * self.pixelSize, self.pixelSize, self.pixelSize);
			}
			self.grid.push(column);
		}
		self.undoStack.push(self.copyGrid(self.grid));

		self.canvasElt.width = (self.gridWidth * self.pixelSize) + ((self.ctx.lineWidth * self.gridHeight) + self.ctx.lineWidth);
		self.canvasElt.height = (self.gridHeight * self.pixelSize) + ((self.ctx.lineWidth * self.gridHeight) + self.ctx.lineWidth);
	}

	self.drawGrid = function() {
		self.ctx.clearRect(0, 0, self.canvasElt.width, self.canvasElt.height)
		for(var x = 0; x < self.grid.length; x++) {
			for(var y = 0; y < self.grid[x].length; y++) {
				// self.ctx.fillStyle = 'rgb(' + ((x + y) / 50) * 255 + ',' + ((x + y) / 50) * 255 + ',' + ((x + y) / 50) * 255 + ')';
				self.ctx.fillStyle = self.grid[x][y].color;
				self.ctx.stroke(self.grid[x][y].path);
				self.ctx.fill(self.grid[x][y].path);
				if(self.showCoords) {
					self.ctx.fillStyle = 'rgb(255,255,255)';
					self.ctx.fillText("(" + self.grid[x][y].x + ", " + self.grid[x][y].y + ")", self.grid[x][y].x * self.pixelSize + 5, self.grid[x][y].y * self.pixelSize + 15);
				}
			}
		}
	}

	self.apply = function(x,y,color) {
		self.redoStack = [];
		self.undoStack.push(self.copyGrid(self.grid));
		self.currentTool.apply(self.grid, x, y, color);
		self.drawGrid();
	}

	self.undo = function() {
		if(self.undoStack.length > 0) {
			self.redoStack.push(self.copyGrid(self.grid));
			self.grid = self.undoStack.pop();
			self.drawGrid();
		}
	}

	self.redo = function() {
		if(self.redoStack.length > 0) {
			self.undoStack.push(self.copyGrid(self.grid));
			self.grid = self.redoStack.pop();
			self.drawGrid();
		}
	}

	self.copyGrid = function(oldGrid) {
		var copy = [];
		for(var x = 0; x < oldGrid.length; x++) {
			var column = [];
			for(var y = 0; y < oldGrid[x].length; y++) {
				var newPixel = {
					path: new Path2D(),
					x: oldGrid[x][y].x,
					y: oldGrid[x][y].y,
					color: oldGrid[x][y].color,
					empty: oldGrid[x][y].empty,
				}
				column.push(newPixel);
				newPixel.path.rect(newPixel.x * self.pixelSize, newPixel.y * self.pixelSize, self.pixelSize, self.pixelSize);
			}
			copy.push(column);
		}

		return copy
	}

	self.constructor(pixelSize, width, height);
}
