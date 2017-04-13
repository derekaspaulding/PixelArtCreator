'use strict';
var ColorPicker = function() {
	var self = this;
	//elements
	self.modalElt;
	self.colorPreview;
	self.rgbFields
	self.hexField

	self.currentColor = 'rgba(255,255,255,1)';
	
	self.constructor = function() {
		self.modalElt = document.querySelector('#color-picker-modal');
		self.colorPreview = document.querySelector('#color-preview');
		self.hexField = document.querySelector('#hex-input');
		self.rgbFields = {
			redField: document.querySelector('#rgb-input-red'),
			blueField: document.querySelector('#rgb-input-blue'),
			greenField: document.querySelector('#rgb-input-green'),
		}
	}

	self.toggleModalVisibility = function() {
		self.modalElt.classList.toggle('hidden');
	}

	self.getColorRGB = function() {
		var r = parseInt(self.rgbFields.redField.value);
		var g = parseInt(self.rgbFields.greenField.value);
		var b = parseInt(self.rgbFields.blueField.value);
		var a = 1; //TODO Add alpha field to color picker
		//Bound value in [0,255]
		r = r > 255 ? 255 : (r < 0 ? 0 : (r ? r : 0));
		g = g > 255 ? 255 : (g < 0 ? 0 : (g ? g : 0));
		b = b > 255 ? 255 : (b < 0 ? 0 : (b ? b : 0));
		a = a ? (a < 0 ? 0 : (a > 1 ? 1 : a)) : 1;

		var rgbaString = "rgba(" + r + "," + g + "," + b + "," + a + ")";

		return {red: r, green: g, blue: b, alpha: a, string: rgbaString};
	}

	self.getColorHex = function() {
		var hex = self.hexField.value;
		var isValid = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i.test(hex);
		if(!isValid) 
			return false;

		hex = hex[0] === '#' ? hex.substr(1) : hex;

		if(hex.length === 3) {
			hex = hex.substr(0,1) + hex[0] + hex.substr(1,1) + hex[1] + hex.substr(2,1) + hex[2];
		}

		var r = parseInt(hex.substr(0,2), 16);
		var g = parseInt(hex.substr(2,2), 16);
		var b = parseInt(hex.substr(4,2), 16);
		var a = 1;

		var rgbaString = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		return {red: r, green: g, blue: b, alpha: a, string: rgbaString};
	}

	self.updateHexField = function(r,g,b) {
		var rHexVal = r.toString(16);
		var gHexVal = g.toString(16);
		var bHexVal = b.toString(16);

		if(rHexVal.length === 1)
			rHexVal = "0" + rHexVal;
		if(gHexVal.length === 1)
			gHexVal = "0" + gHexVal;
		if(bHexVal.length === 1)
			bHexVal = "0" + bHexVal;

		var hexString = rHexVal + gHexVal + bHexVal;
		self.hexField.value = hexString;
	}

	self.updateRGBFields = function(r,g,b) {
		self.rgbFields.redField.value = r;
		self.rgbFields.greenField.value = g;
		self.rgbFields.blueField.value = b;
	}

	self.updateColor = function(color) {
		//TODO: validate color.
		self.currentColor = color;
		self.updateColorPreview(color);
	}

	self.updateColorPreview = function(color) {
		self.colorPreview.style.backgroundColor = color;
	}

	self.constructor();
}
