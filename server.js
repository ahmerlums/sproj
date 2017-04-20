"use strict";
const express = require('express')
const app = express()

var sys = require('sys')
var fs = require('fs');
var http = require('http');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
const path = require('path')

function project(latLng1,latLng2) {
    var siny = Math.sin(latLng1 * Math.PI / 180);
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return [256 * (0.5 + latLng2 / 360), 256 * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))]

}


var walk = function(directoryName) {
  fs.readdir(directoryName, function(e, files) {
    if (e) {
      console.log('Error: ', e);
      return;
    }
    files.forEach(function(file) {
      var fullPath = path.join(directoryName,file);
      fs.stat(fullPath, function(e, f) {
        if (e) {
          console.log('Error: ', e);
          return;
        }
        if (f.isDirectory()) {
          walk(fullPath);
        } else {
          if(fullPath.slice(-3) == "jpg") {
            var x = parseInt(fullPath.split('/')[7].slice(1,7))
            var y = parseInt(fullPath.split('/')[9].slice(1,7))
            fs.copySync(path.resolve(__dirname,fullPath), "files/" +  tile2long(x,19) + "_" +tile2lat(y,19) + ".jpg");
          }
        }
      });
    });
  });
};

function tile2long(x,z) { return (x/Math.pow(2,z)*360-180); }

function tile2lat(y,z) {
    var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
    return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}


function getTileCors(latlng2,latlng1,zoom) {
  var scale = 1 << zoom;
  var worldCoordinate = project(latlng1,latlng2);

  var tileCoordinate = [
        Math.floor(worldCoordinate[0] * scale / 256),
        Math.floor(worldCoordinate[1] * scale / 256)];
  return tileCoordinate;
}


function puts(error, stdout, stderr) {
    sys.puts(stdout)
}


app.use(express.static(path.resolve(__dirname, 'client')));


const socketio = require('socket.io') 
  console.log(tile2lat(213498,19)-tile2lat(213497,19))
io.on('connection', client => {

    client.on('go', data => {
      //  console.log(walk("../../../../SASPlanet/test/"))
        var bounds = data.cor;
        var ittrNum = 0;//( ((bounds.north - bounds.south )/0.00035) * ((bounds.west-bounds.east)/0.00035) );
        var b = bounds.south;
        while (b <= bounds.north){
            var a = bounds.west
            while (a <= bounds.east){
                ittrNum += 1;
                a = a + 0.00035
            }
            b = b + 0.00035
        } 
        console.log("Imgaes Size" + ittrNum);
        client.emit("progressTarget", 0)
        console.log(data)
        console.log(getTileCors(bounds.west,bounds.north,19))
        var temp = getTileCors(bounds.west,bounds.north,19);
        console.log(tile2long(temp[0],19));
        console.log(tile2lat(temp[1],19)); 

        console.log(getTileCors(bounds.east,bounds.north,19))
        console.log(getTileCors(bounds.west,bounds.south,19))
        console.log(getTileCors(bounds.east,bounds.south,19))
        
        // exec("cd slidingwindowtest && python slidingwindow.py  " + bounds.east + " " + bounds.west + " " + bounds.north + " " + bounds.south, function(error, stdout, stderr) {
        //     if (error !== null) {
        //         console.log(error);
        //     } else {
                //console.log('stdout: ' + stdout);
             //   exec("bash asd.sh",{maxBuffer: 1024 * 1000000}, function(error1, stdout1, stderr1) {
                    // if (error1 !== null) {
                    //     console.log(error1);
                    // } else {
                   //     console.log('stdout: ' + stdout1);

                     //   console.log('stderr: ' + stderr1);

                        var  text = fs.readFileSync('parking' + ".txt", "utf-8");
                        var x1 = text.split("\n");
                        x1.splice(-1, 1)

                        // var text1 = fs.readFileSync('mosque' + ".txt", "utf-8");
                        // var x2 = text1.split("\n");
                        // x2.splice(-1, 1)

                        // var text2 = fs.readFileSync('houses' + ".txt", "utf-8");
                        // var x3 = text2.split("\n");
                        // x3.splice(-1, 1)

                        // var text3 = fs.readFileSync('ground' + ".txt", "utf-8");
                        // var x4 = text3.split("\n");
                        // x4.splice(-1, 1)

                        // var text4 = fs.readFileSync('tennis' + ".txt", "utf-8");
                        // var x5 = text4.split("\n");
                        // x5.splice(-1, 1)
                        
                        // var text5 = fs.readFileSync('grass' + ".txt", "utf-8");
                        // var x6 = text5.split("\n");
                        // x6.splice(-1, 1)
                        // var text6 = fs.readFileSync('roads' + ".txt", "utf-8");
                        // var x7 = text6.split("\n");
                        // x7.splice(-1, 1)

                        // var text7 = fs.readFileSync('ponds' + ".txt", "utf-8");
                        // var x8 = text7.split("\n");
                        // x8.splice(-1, 1)

                        // var text8 = fs.readFileSync('kiln' + ".txt", "utf-8");
                        // var x9 = text8.split("\n");
                        // x9.splice(-1, 1)

                        // var text9 = fs.readFileSync('farms' + ".txt", "utf-8");
                        // var x10 = text9.split("\n");
                        // x10.splice(-1, 1)
                        
                        // var text10 = fs.readFileSync('blackfarms' + ".txt", "utf-8");
                        // var x11 = text10.split("\n");
                        // x11.splice(-1, 1)
                        
                        // var text11 = fs.readFileSync('oiltanks' + ".txt", "utf-8");
                        // var x12 = text11.split("\n");
                        // x12.splice(-1, 1)
                        
                        // var text12 = fs.readFileSync('parks' + ".txt", "utf-8");
                        // var x13 = text12.split("\n");
                        // x13.splice(-1, 1)
                        
                        // var text13 = fs.readFileSync('densetrees' + ".txt", "utf-8");
                        // var x14 = text10.split("\n");
                        // x14.splice(-1, 1)
                        

                        client.emit("corFile", {parking:x1});

                 //   }
              //  });

                //console.log('stderr: ' + stderr);
        //    }
       // });

        // setInterval(function(){
        //     var currFiles = -1;
        //     const testFolder = 'slidingwindowtest/';
        //     const fs = require('fs');
        //     fs.readdir(testFolder, (err, files) => {
        //         currFiles = -1
        //       files.forEach(file => {
        //         currFiles += 1;
        //       });
        //     client.emit("progressTarget", (currFiles/ittrNum)*100);
        //     console.log("progressTarget: " + (currFiles))
        //     }
        //     )
            
        // },500);
        //     

        //              var msg = data.msg
        //             var msg1 =data.msg1
        //             var lat = data.lat;
        //             var lng = data.lng;
        //             var zLevel = data.zLevel;
        //              var file = fs.createWriteStream("file" + ".png");
        //             var request = http.get(msg, function(response) {
        //             response.pipe(file);
        //   setTimeout(function(){     exec("python abcd.py lat lng zLevel", 
        //   function (error, stdout, stderr) {
        //     if (error !== null) {
        //       console.log(error);
        //     } else {
        //     }
        // }
        //     );
        //         exec("bash asd.sh", function (error, stdout, stderr) {
        //     if (error !== null) {
        //       console.log(error);
        //     } else {
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //     }
        // });
        //         exec("bash test.sh " + msg1,  function (error, stdout, stderr) {
        //     if (error !== null) {
        //       console.log(error);
        //     } else {
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //     }
        // })
        // }, 3000);

        // });

    })


})

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'));

