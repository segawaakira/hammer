window.onload = function () {

  var canvas = new fabric.Canvas('canvas');
  canvas.setWidth(1000);
  canvas.setHeight(1000);
  fabric.Image.fromURL('./sample.png', function (oImg) {
    canvas.add(oImg)
  })
  canvas.renderAll();


    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);
    let stage = canvas.upperCanvasEl;
    
    let mc = new Hammer.Manager(stage);
    let pan = new Hammer.Pan();
    let rotate = new Hammer.Rotate();
    let pinch = new Hammer.Pinch();
    
    mc.add([pan, pinch, rotate]);
    mc.get('pinch').set({ enable: true });
    mc.get('rotate').set({ enable: true });
    
    let adjustDeltaX = 0;
    let adjustDeltaY = 0;
    let adjustScale = 1;
    let adjustRotation = 0;
    
    let currentDeltaX = null;
    let currentDeltaY = null;
    let currentScale = null;
    let currentRotation = null;
    
    mc.on("panstart pinchstart rotatestart", function(e) {
      adjustRotation -= e.rotation;
    });
    
    mc.on("panmove pinchmove rotatemove", function(e) {
      currentRotation = adjustRotation + e.rotation;
      currentScale = adjustScale * e.scale;
      currentDeltaX = adjustDeltaX + (e.deltaX / currentScale);
      currentDeltaY = adjustDeltaY + (e.deltaY / currentScale);

      const activeObject = canvas.getActiveObject()
      activeObject.angle = Math.round(currentRotation) 
      activeObject.scaleX = currentScale
      activeObject.scaleY = currentScale
    });
    
    mc.on("panend pinchend rotateend", function(e) {
      adjustScale = currentScale;
      adjustRotation = currentRotation;
      adjustDeltaX = currentDeltaX;
      adjustDeltaY = currentDeltaY;
    });


  }