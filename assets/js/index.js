import '../css/style.scss';
import '../css/owwlyz.scss';

var InfiniteScroll = require('infinite-scroll');
var Masonry = require('masonry-layout');
var imagesLoaded = require('imagesloaded');

InfiniteScroll.imagesLoaded = imagesLoaded;

//-------------------------------------//

var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: 'none', // select none at first
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  // nicer reveal transition
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});


// initial items reveal
imagesLoaded( grid, function() {
  grid.classList.remove('are-images-unloaded');
  msnry.options.itemSelector = '.grid__item';
  var items = grid.querySelectorAll('.grid__item');
  msnry.appended( items );
  msnry.layout();
});

//-------------------------------------//
// init Infinte Scroll

var infScroll = new InfiniteScroll( grid, {
  path: '/page/{{#}}/',
  hideNav: '.pagination',
  append: '.grid__item',
  outlayer: msnry,
  status: '.page-load-status',
  debug: true,
});

 // on append event of infinite scroll
 infScroll.on( 'append', function( response, path, items ) {
      
      //When  imagesLoaded on progress -->
     //hide the next populated masonry grid until it's everything ok

      imagesLoaded( grid ).on( 'progress', function() {
        // layout Masonry after each image loads
        grid.classList.add('are-images-unloaded');
        console.log("Append Item...wait the fix before show");
      });
     
      //When images loaded done event listener
      imagesLoaded( grid ).on( 'done', function() {
        console.log("Done loading..YO!");

        //Re-apply the layout masonry setting
        msnry.layout();  //the magic 
        //Now it's fixed, so show the new (fixed) grid of masonry items 
        grid.classList.remove('are-images-unloaded');
      });

  });//append infScroll