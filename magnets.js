var ANIMATION_PERIOD = 800;
var FRAME_PERIOD = 40;

/**
 * This class manages a single "refrigerator" which can have many magnets.
 * @param firebaseURL
 * @constructor
 */
function Refrigerator(firebaseURL, container) {
  this.magnets = [];
  this.root = new Firebase(firebaseURL);

  //Load the magnets.
  this.root.on("child_added", function (snapshot) {
    this.magnets.push(new SingleMagnet(snapshot, container));
  }, this);
}

Refrigerator.prototype.close = function () {
  for (var i = 0; i < this.magnets.length; i++) {
    this.magnets[i].remove();
  }
  this.root.off();
}

/**
 * This class manages a single magnet on a refrigerator
 * @param snap
 * @constructor
 */
function SingleMagnet(snap, container) {
  this.myPosRef = snap.child("pos").ref();

  this.guiObj = $("<div class='magnet'>" + snap.child("text").val() + "</div>");
  container.append(this.guiObj);

  var self = this;
  this.guiObj.draggable({
    containment:container,
    stop:function () {
      self.myPosRef.set(self.getCurrentPos());
    }
  });
  
  var pos = snap.child('pos').val();
  self.guiObj.css({
    left:(pos && pos.l) ? pos.l : 0,
    top:(pos && pos.t) ? pos.t : 0
  });
  this.myPosRef.on("value", this.updatePos, this);
}

SingleMagnet.prototype.updatePos = function (snapshot) {
  var inf = snapshot.val();

  //Now animate the transition
  this.desiredLeft = (inf && inf.l) ? inf.l : 0;
  this.desiredTop = (inf && inf.t) ? inf.t : 0;
  this.framesRemaining = ANIMATION_PERIOD / FRAME_PERIOD;

  if (!this.interval) {
    var self = this;
    this.interval = setInterval(function () {
      var curPos = self.getCurrentPos();
      //If we're done, kill the timer
      if (self.framesRemaining <= 0 || (curPos.l == self.desiredLeft && curPos.t == self.desiredTop)) {
        clearInterval(self.interval);
        delete self.interval;
      } else {
        self.guiObj.css({
          left:curPos.l + (self.desiredLeft - curPos.l) / self.framesRemaining,
          top:curPos.t + (self.desiredTop - curPos.t) / self.framesRemaining
        });
        self.framesRemaining--;
      }
    }, FRAME_PERIOD);
  }
}

SingleMagnet.prototype.getCurrentPos = function () {
  var left = this.guiObj.position().left;
  var top = this.guiObj.position().top;
  return {l:left, t:top};
}

SingleMagnet.prototype.remove = function () {
  this.myPosRef.off();
}