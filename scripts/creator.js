'use strict'

var Canvas = function(pixelSize, width, height) {
	var self = this;
	self.grid = [];
	self.pixelSize;
	self.gridWidth;
	self.gridHeight;
	self.canvas = document.getElementById('canvas');
	self.ctx = self.canvas.getContext('2d');
	self.showCoords = false;
	self.currentColor = 'rgba(255,255,255,1)';

	self.constructor = function(pixelSize, width, height) {
		self.pixelSize = pixelSize;
		self.gridWidth = width;
		self.gridHeight = height;

		for(var x = 0; x < self.gridWidth; x++) {
			var column = []
			for(var y = 0; y < self.gridHeight; y++) {
				var newPixel = {
					path: new Path2D(),
					x: x,
					y: y,
					color: 'rgba(0,0,0,0.25)',
				}
				column.push(newPixel);
				newPixel.path.rect(newPixel.x * self.pixelSize, newPixel.y * self.pixelSize, self.pixelSize, self.pixelSize);
			}
			self.grid.push(column);
		}

		self.canvas.width = (self.gridWidth * self.pixelSize) + ((self.ctx.lineWidth * self.gridHeight) + self.ctx.lineWidth);
		self.canvas.height = (self.gridHeight * self.pixelSize) + ((self.ctx.lineWidth * self.gridHeight) + self.ctx.lineWidth);

		window.addEventListener('click', function(e) {
			var canvasBounds = self.canvas.getBoundingClientRect();
			var xOffset = canvasBounds.left + window.scrollX;
			var yOffset = canvasBounds.top + window.scrollY;
			var x = Math.floor((e.pageX - xOffset) / self.pixelSize);
			var y = Math.floor((e.pageY - yOffset) / self.pixelSize);
			self.paintPixel(x,y);
		});

		document.querySelector('#themeToggle').addEventListener('click', function(e) {
			var body = document.querySelector('body');
			body.classList.toggle('light');
			body.classList.toggle('dark');
		});
	}

	self.drawGrid = function() {
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

	self.paintPixel = function(x,y) {
		console.log("x: " + x + ", y: " + y);
		self.grid[x][y].color = self.currentColor;
		self.ctx.fillStyle = self.currentColor;
		self.ctx.fill(self.grid[x][y].path);
		self.ctx.stroke(self.grid[x][y].path);
	}

	self.constructor(pixelSize, width, height);
}

var canvas = new Canvas(25, 3, 5);
canvas.drawGrid();
