'use strict'

var Controller = function() {
	var self = this;
	self.canvas = new Canvas();
	self.colorPicker = new ColorPicker();
	self.currentToolButton;

	self.constructor = function() {
		// Begin document selectors
		var themeToggleButton = document.querySelector('#theme-toggle-button');

		var colorPickerButton = document.querySelector('#color-picker-button');
		var colorPickerRGBInputRed = document.querySelector('#rgb-input-red');
		var colorPickerRGBInputGreen = document.querySelector('#rgb-input-green');
		var colorPickerRGBInputBlue = document.querySelector('#rgb-input-blue');
		var colorPickerHexInput = document.querySelector('#hex-input');
		var colorPickerSelectButton = document.querySelector('#color-picker-select');

		var undoButton = document.querySelector('#undo-button');
		var redoButton = document.querySelector('#redo-button');

		var paintBrushToolButton = document.querySelector('#paintbrush-tool-button');
		var eraserToolButton = document.querySelector('#eraser-tool-button');
		var paintBucketToolButton = document.querySelector('#paintbucket-tool-button');

		self.currentToolButton = paintBrushToolButton

		themeToggleButton.addEventListener('click', function(e) {
			var body = document.querySelector('body');
			body.classList.toggle('light');
			body.classList.toggle('dark');
		});

		self.canvas.canvasElt.addEventListener('click', function(e) {
			var canvasBounds = self.canvas.canvasElt.getBoundingClientRect();
			var xOffset = canvasBounds.left + window.scrollX;
			var yOffset = canvasBounds.top + window.scrollY;
			var x = Math.floor((e.pageX - xOffset) / self.canvas.pixelSize);
			var y = Math.floor((e.pageY - yOffset) / self.canvas.pixelSize);
			self.canvas.apply(x, y, self.colorPicker.currentColor);
		});

		colorPickerButton.addEventListener('click', function(e) {
			self.colorPicker.toggleModalVisibility();
		});

		colorPickerRGBInputRed.addEventListener('input', function(e) {
			var color = self.colorPicker.getColorRGB();
			self.colorPicker.updateColorPreview(color.string)
			self.colorPicker.updateHexField(color.red, color.green, color.blue);
		});

		colorPickerRGBInputGreen.addEventListener('input', function(e) {
			var color = self.colorPicker.getColorRGB();
			self.colorPicker.updateColorPreview(color.string)
			self.colorPicker.updateHexField(color.red, color.green, color.blue);
		});

		colorPickerRGBInputBlue.addEventListener('input', function(e) {
			var color = self.colorPicker.getColorRGB();
			self.colorPicker.updateColorPreview(color.string)
			self.colorPicker.updateHexField(color.red, color.green, color.blue);
		});

		colorPickerHexInput.addEventListener('input', function(e) {
			// console.log('here');
			var color = self.colorPicker.getColorHex();
			if(color) {
				self.colorPicker.updateColorPreview(color.string);
				self.colorPicker.updateRGBFields(color.red, color.green, color.blue);
			}
		});

		colorPickerSelectButton.addEventListener('click', function(e) {
			var color = self.colorPicker.getColorRGB();
			self.colorPicker.updateColor(color.string);
			self.colorPicker.toggleModalVisibility();
		});

		undoButton.addEventListener('click', function(e) {
			self.canvas.undo();
		});

		redoButton.addEventListener('click', function(e) {
			self.canvas.redo();
		});

		paintBrushToolButton.addEventListener('click', function(e) {
			self.canvas.currentTool = self.canvas.tools.paintBrush;
			self.currentToolButton.classList.remove('selected-tool');
			self.currentToolButton = paintBrushToolButton;
			paintBrushToolButton.classList.add('selected-tool');
		});

		eraserToolButton.addEventListener('click', function(e) {
			self.canvas.currentTool = self.canvas.tools.eraser;
			self.currentToolButton.classList.remove('selected-tool');
			self.currentToolButton = eraserToolButton;
			eraserToolButton.classList.add('selected-tool');
		});

		paintBucketToolButton.addEventListener('click', function(e) {
			self.canvas.currentTool = self.canvas.tools.paintBucket;
			self.currentToolButton.classList.remove('selected-tool');
			self.currentToolButton = paintBucketToolButton;
			paintBucketToolButton.classList.add('selected-tool');
		});

		self.canvas.drawGrid();
	}

	self.constructor();
}

var ctl = new Controller();
