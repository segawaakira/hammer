document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);
let stage = document.getElementById('stage');

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

  let transforms = ['scale(' + currentScale + ')'];
  transforms.push('translate(' + currentDeltaX + 'px,' + currentDeltaY + 'px)');
  transforms.push('rotate(' + Math.round(currentRotation) + 'deg)');
  stage.style.transform = transforms.join(' ');
});

mc.on("panend pinchend rotateend", function(e) {
  adjustScale = currentScale;
  adjustRotation = currentRotation;
  adjustDeltaX = currentDeltaX;
  adjustDeltaY = currentDeltaY;
});



window.onload = function () {
  var canvas = new fabric.Canvas('canvas');
  canvas.add(new fabric.Rect({
      left: 100,
      top: 100,
      width: 75,
      height: 50,
      fill: 'green',
      padding: 10
    }));

    // ４辺の真ん中のハンドル非表示
    canvas.item(0)['setControlVisible']('mb', false);
    canvas.item(0)['setControlVisible']('mt', false);
    canvas.item(0)['setControlVisible']('ml', false);
    canvas.item(0)['setControlVisible']('mr', false);

    canvas.renderAll();
}