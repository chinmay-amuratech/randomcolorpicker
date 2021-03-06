var doTheMagic = function() {
  if(document.globalFlag) {
    document.globalFlag = false;
    $(".welcome-message-container").hide();
  }

  $(".single-color-awesomeness").removeClass("invisible").addClass("visible");

  var awesomeColor = color();
  var awesomeContrastColor = invertColor(awesomeColor);

  if( awesomeColor != undefined || awesomeContrastColor != undefined ) {
    setColors(awesomeColor, awesomeContrastColor);
  } else {
    $(".welcome-message-container").show();
    $(".single-color-awesomeness").removeClass("visible").addClass("invisible");
    $(document).attr("title", "Random color generator");
    $(".color-input-control").val("#ffffff");
  }
}

var setColors = function(awesomeColor, awesomeContrastColor) {
  $(".change-background").css("background-color", awesomeColor);
  $(".color-name").css("color", awesomeContrastColor);
  $(".changed-hex").text(awesomeColor);
  $(".color-input-control").val(awesomeColor);
  $(document).attr("title", awesomeColor);
}

var color = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var colorFader = function(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) { hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]; }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}

var invertColor = function(hex) {
  if(hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  var r = parseInt(hex.slice(0, 2), 16);
  var g = parseInt(hex.slice(2, 4), 16);
  var b = parseInt(hex.slice(4, 6), 16);

  return ( (r * 0.299 + g * 0.587 + b * 0.114) > 186 ) ? '#000000' : '#FFFFFF';
}

var updateTextAndColor = function(color) {
  var awesomeContrastColor = invertColor(color);
  $(".change-background").css("background-color", color);
  $(".color-name").css("color", awesomeContrastColor);
  $(".changed-hex").text(color);
  $(".color-input-control").val(color);
  $(document).attr("title", color);
}

var setMessageDefault = function() {
  $(".double-click-to-copy").removeClass("blink");
  $(".double-click-to-copy").text("double click anywhere to copy the color");
}
