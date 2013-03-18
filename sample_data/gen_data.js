var fs = require('fs');

var outputDir = "output";

var outputFiles = [
  {
    name: "hn1.json",
    src: ["common.txt", "hn.txt"]
  },
  {
    name: "hn2.json",
    src: ["common.txt", "hn.txt"]
  },
  {
    name: "hn3.json",
    src: ["common.txt", "hn.txt"]
  },
  {
    name: "hn4.json",
    src: ["common.txt", "hn.txt"]
  },
  {
    name: "programming.json",
    src: ["common.txt", "programming.txt"]
  },
  {
    name: "startups.json",
    src: ["common.txt", "startups.txt"]
  },
  {
    name: "sf.json",
    src: ["common.txt", "sf.txt"]
  },
  {
    name: "nyc.json",
    src: ["common.txt", "nyc.txt"]
  },
  {
    name: "firebase.json",
    src: ["common.txt", "firebase.txt"]
  }
]

//Make sure the output dir exists.
fs.mkdir(outputDir, function(e) {
  start();
});

function start() {
  for(var i in outputFiles) {
    generateFile(outputFiles[i].name, outputFiles[i].src);
  }
}

function generateFile(name, sources) {
  loadAndMergeWords(sources, function (words) {
    var outData = [];
    for (var id in words) {
      outData.push({
        text:words[id],
        l:Math.floor(Math.random() * 800),
        t:Math.floor(Math.random() * 600)
      });
    }
    var toWrite = JSON.stringify(outData, undefined, 2);
    fs.writeFile(outputDir + "/" + name, toWrite, function (err) {
      if (err) {
        console.log("write failed");
      } else {
        console.log("write success");
      }
    });
  });
}

function loadAndMergeWords(sources, continuation) {
  var i = 0;
  var words = [];
  for(var x = 0; x < sources.length; x++) {
    console.log("Loading: " + sources[x]);
    fs.readFile(sources[x], 'utf8', function(err, data) {
      var j = data.split("\n");
      for(var q in j) {
        words.push(j[q]);
      }
      i++;
      if(i == sources.length) {
        continuation(words);
      }
    });
  }
}


