  var TAU = Math.PI*2;
  // min value to render a line. 
  // it does not make sense to render a line of a width is not even visible
  var LINEWIDTH_MIN_VALUE = 0.05; 

  function renderPoint(ctx, st) {
    ctx.fillStyle = st['marker-fill'];
    var pixel_size = st['marker-width'];

    // render a circle

    // fill
    ctx.beginPath();
    ctx.arc(0, 0, pixel_size, 0, TAU, true, true);
    ctx.closePath();
    if (st['marker-fill']) {
      if (st['marker-fill-opacity']) {
        ctx.globalAlpha = st['marker-fill-opacity'];
      }
      ctx.fill();
    }

    // stroke
    ctx.globalAlpha = 1.0;
    if (st['line-color'] && st['line-width'] && st['line-width'] > LINEWIDTH_MIN_VALUE) {
      if (st['marker-line-opacity']) {
        ctx.globalAlpha = st['marker-line-opacity'];
      }
      if (st['line-width']) {
        ctx.lineWidth = st['line-width'];
      }
      ctx.strokeStyle = st['line-color'];

      // do not render for alpha = 0
      if (ctx.globalAlpha > 0) {
        ctx.stroke();
      }
    }
  }

  function renderRectangle(ctx, st) {
    ctx.fillStyle = st['marker-fill'];
    var pixel_size = st['marker-width'];
    var w = pixel_size * 2;

    // fill
    if (st['marker-fill'] && st['marker-fill-opacity']) {
      ctx.globalAlpha = st['marker-fill-opacity'];
    }
    ctx.fillRect(-pixel_size, -pixel_size, w, w)

    // stroke
    ctx.globalAlpha = 1.0;
    if (st['line-color'] && st['line-width']) {
      if (st['marker-line-opacity']) {
        ctx.globalAlpha = st['marker-line-opacity'];
      }
      if (st['line-width']) {
        ctx.lineWidth = st['line-width'];
      }
      ctx.strokeStyle = st['line-color'];

      // do not render for alpha = 0
      if (ctx.globalAlpha > 0) {
        ctx.strokeRect(-pixel_size, -pixel_size, w, w)
      }
    }
  }

  function renderSprite(ctx, st) {
    var img = st['point-file'] || st['marker-file'];
    var ratio = img.height/img.width;
    var w = st['marker-width'] || img.width;
    var h = st['marker-width'] || st['marker-height'] || w*ratio;
    ctx.drawImage(img, 0, 0, w, h);
  }

module.exports = {
    renderPoint: renderPoint,
    renderSprite: renderSprite,
    renderRectangle: renderRectangle
};
