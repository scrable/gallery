
exports.list = function(req, res){
     var heights = [];
     var widths = [];
     var fs = require('fs');
     var files = fs.readdirSync("public/images");

     console.log("total files:", files.length, files)

     var sizeOf = require('image-size');


          function getsizes(path){
               var y = sizeOf(path)

               if(parseInt(y.orientation) === 6)
               {
                    widths.push(JSON.parse(JSON.stringify(y.height)))
                    heights.push(JSON.parse(JSON.stringify(y.width)))
               }
               else {
                    heights.push(JSON.parse(JSON.stringify(y.height)))
                    widths.push(JSON.parse(JSON.stringify(y.width)))
               }
          }

          for(var i = 0; i < files.length; i++) {
               getsizes('public/images/' + files[i])
          }

     res.render('homePage', {data: files, heights: heights, widths: widths})
};