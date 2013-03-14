var magnetRoot = new Firebase("https://magnets.firebaseio.com")

function SingleMagnet(ref) {
  this.myRef = ref;
  this.guiObj = $("<div></div>");
  this.guiObj.addClass("magnet");
  var self = this;
  var saveCurrentPos = function() {
    ref.update({left: self.guiObj.position().left, top: self.guiObj.position().top});
  };
  this.guiObj.draggable({
    containment: $("#refrigerator"),
    start: function() {
      ref.child("active").set(true);
    },
    stop: function() {
      saveCurrentPos();
      ref.child("active").remove();
    },
    drag: saveCurrentPos
  });
  $("#refrigerator").append(this.guiObj);
  ref.on("value", this.update, this);
}

SingleMagnet.prototype.update = function (snapshot) {
  var inf = snapshot.val();
  this.guiObj.text(snapshot.val().text);
  this.guiObj.css({
    left: inf.left ? inf.left : 0,
    top: inf.top ? inf.top : 0,
    display: 'inline-block',
    border: inf.active ? "1px solid orange" : "1px solid black"
  });
}

$(document).ready(function () {
  //Load the magnets.
  magnetRoot.on("child_added", function (snap) {
    new SingleMagnet(snap.ref());
  });
});