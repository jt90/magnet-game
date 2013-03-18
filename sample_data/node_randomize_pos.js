var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, data) {
  var j = JSON.parse(data);
  for(var id in j) {
    j[id].pos = {l: Math.floor(Math.random() * 800), t: Math.floor(Math.random() * 600)};
  }
  var toWrite = JSON.stringify(j, undefined, 2);
  fs.writeFile(process.argv[3], toWrite, function(err) {
    if(err) {
      console.log("write failed");
    } else {
      console.log("write success!");
    }
  });
});
