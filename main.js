var refrigerators = {
  hn1:{
    name:"Hacker News 1",
    firebaseURL:"https://magnets-hn1.firebaseio.com"
  },
  hn2:{
    name:"Hacker News 2",
    firebaseURL:"https://magnets-hn2.firebaseio.com"
  },
  hn3:{
    name:"Hacker News 3",
    firebaseURL:"https://magnets-hn3.firebaseio.com"
  },
  hn4:{
    name:"Hacker News 4",
    firebaseURL:"https://magnets-hn4.firebaseio.com"
  },
  programming:{
    name:"Programming",
    firebaseURL:"https://magnets-programming.firebaseio.com"
  },
  startups:{
    name:"Startups",
    firebaseURL:"https://magnets-startups.firebaseio.com"
  },
  sf:{
    name:"San Francisco",
    firebaseURL:"https://magnets-sf.firebaseio.com"
  },
  nyc:{
    name:"New York",
    firebaseURL:"https://magnets-nyc.firebaseio.com"
  },
  firebase:{
    name:"Firebase",
    firebaseURL:"https://magnets-firebase.firebaseio.com"
  }
};

function getRandomPage() {
  var defaultOptions = [
    "hn1", "hn2", "hn3", "hn4"
  ];
  return defaultOptions[Math.floor(Math.random() * defaultOptions.length)];
}

function setupSidebar(current) {
  $("#refrigList").empty();
  
  for(var name in refrigerators) {
    var displayName = refrigerators[name].name;
    var sidebar = $("#refrigList");
    if(name == current) {
      $("<div><b>" + displayName + "</b></div>").appendTo(sidebar)
    } else {
      $("<div><a href='#" + name + "'>" + displayName + "</a></div>").appendTo(sidebar);
    }
  }
}

var AppRouter = Backbone.Router.extend({
  routes:{
    ":refrig":"loadRefrig",
    '':'defaultRoute'
  },

  defaultRoute:function () {
    this.navigate(getRandomPage(), {trigger:true});
  }
});

//when the page is ready...
$(document).ready(function () {
  //Set up the router
  var router = new AppRouter;

  var currentRefrig = null;
  var container = $("#refrigerator");
  router.on("route:loadRefrig", function (refrig) {
    var refrigData = refrigerators[refrig];
    if (!refrigData) {
      router.navigate(getRandomPage(), {trigger:true});
    } else {
      if (currentRefrig) {
        currentRefrig.close();
      }
      container.empty();
      setupSidebar(refrig);
      currentRefrig = new Refrigerator(refrigData.firebaseURL, container);
    }
  });
  Backbone.history.start();
});