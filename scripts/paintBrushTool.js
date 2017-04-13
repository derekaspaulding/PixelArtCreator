'use strict';
var PaintBrushTool = function() {
	var self = this;

	self.apply = function(grid, x, y, color) {
		grid[x][y].color = color;
		grid[x][y].empty = false;
	}
}
