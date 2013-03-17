var refrigerators = {
  hn1: {
    name: "Hacker News 1",
    firebaseURL: "https://magnets-hn1.firebaseio.com"
  },
  hn2: {
    name: "Hacker News 2",
    firebaseURL: "https://magnets-hn2.firebaseio.com"
  },
  hn3: {
    name: "Hacker News 3",
    firebaseURL: "https://magnets-hn3.firebaseio.com"
  },
  hn4: {
    name: "Hacker News 4",
    firebaseURL: "https://magnets-hn4.firebaseio.com"
  },
  sf: {
    name: "San Francisco",
    firebaseURL: "https://magnets-sf.firebaseio.com"
  },
  nyc: {
    name: "New York",
    firebaseURL: "https://magnets-nyc.firebaseio.com"
  },
  programming: {
    name: "Programming",
    firebaseURL: "https://magnets-hn1.firebaseio.com"
  },
  kittens: {
    name: "Startups",
    firebaseURL: "https://magnets-hn1.firebaseio.com"
  },
  firebase: {
    name: "Firebase",
    firebaseURL: "https://magnets-hn1.firebaseio.com"
  }
};

function getRandomPage() {
  var defaultOptions = [
    "hn1", "hn2", "hn3", "hn4"
  ];
}

function setupSidebar(current) {
  
}

var AppRouter = Backbone.Router.extend({
  routes:{
    ":refrig":"loadRefrig",
    '*path':'defaultRoute'
  },

  defaultRoute:function () {
    this.goToRefrig(getRandomPage())
  },

  goToRefrig: function(token) {
    this.navigate(token, {trigger: true});
  }
});

//when the page is ready...
$(document).ready(function() {
  //Set up the router
  var router = new AppRouter;
  
  var currentRefrig = null;
  var container = $("#refrigerator");
  router.on("route:loadRefrig", function(refrig) {
    if(currentRefrig) {
      currentRefrig.close();
    }  
    container.empty();
    setupSidebar(refrig);
    var refrigData = refrigerators[refrig];
    currentRefrig = new Refrigerator(refrigData.firebaseURL, container);
  });
});