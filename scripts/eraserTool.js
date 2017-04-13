'use strict';
var EraserTool = function() {
	var self = this;

	self.apply = function(grid, x, y, color) {
		grid[x][y].empty = true;
		grid[x][y].color = 'rgba(0,0,0,0.25)';
	}
}
