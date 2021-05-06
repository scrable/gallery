
exports.list = function(req, res){
     let heights = [];
     let widths = [];
     const fs = require('fs');
     const files = fs.readdirSync("public/images");
     files.sort(function(a, b) {
          return fs.statSync('public/images/' + a).mtime.getTime() -
              fs.statSync('public/images/' + b).mtime.getTime();
     });
     const isImage = require('is-image');

     for(i = 0; i < files.length; i++){
          if(!isImage(files[i])){
               files.splice(i, 1)
          }
     }

     var sizeOf = require('image-size');

          function getsizes(path){
               if(isImage(path)) {
                    var y = sizeOf(path)

                    if (parseInt(y.orientation) === 6) {
                         widths.push(JSON.parse(JSON.stringify(y.height)))
                         heights.push(JSON.parse(JSON.stringify(y.width)))
                    } else {
                         heights.push(JSON.parse(JSON.stringify(y.height)))
                         widths.push(JSON.parse(JSON.stringify(y.width)))
                    }
               }
          }

          for(var i = 0; i < files.length; i++) {
               getsizes('public/images/' + files[i])
          }

     res.render('homePage', {data: files, heights: heights, widths: widths})
};