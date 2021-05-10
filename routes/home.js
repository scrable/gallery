
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

     var thumb = require('node-thumbnail').thumb;
     thumb({
          source: 'public/images',
          destination: 'public/thumbnails',
          concurrency: 8,
          width: 450,
          ignore: true,
          suffix: ''
     }).then (function() {
          console.log('All done!');
     }).catch(function (e){
          console.log('Error', e.toString());
     });

     const thumbs = fs.readdirSync("public/thumbnails");

     for(i = 0; i < files.length; i++){
          if(!isImage(files[i])){
               files.splice(i, 1)
          }
     }
     for(i = 0; i < thumbs.length; i++){
          if(!isImage(thumbs[i])){
               thumbs.splice(i, 1)
               console.log("deleting item from thumbs " + i)
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

     res.render('homePage', {data: files, heights: heights, widths: widths, thumbs: thumbs})
};