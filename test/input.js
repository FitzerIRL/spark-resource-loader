
/*

pxCore Copyright 2005-2018 John Robinson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


var baseUrl = "http://www.pxscene.org/examples/px-reference/gallery/";

px.configImport({"browser:" : /*px.getPackageBaseFilePath() + */ "browser/"});


import './browser/listbox.js'
import './browser/editbox.js'

px.import({ scene:      'px:scene.1.js',
             keys:      'px:tools.keys.js',
             ListBox: 'browser:listbox.js',
             EditBox: 'browser:editbox.js'
}).then( function importsAreReady(imports)
{  
  var url   = "";
  var helpShown = false;

  var scene = imports.scene;
  var keys  = imports.keys;
  var root  = imports.scene.root;
 
  var urlFocusColor     = 0x303030ff;
  var urlSucceededColor = 0x0c8508ff;
  var urlFailedColor    = 0xde0700ff;

  var myStretch = scene.stretch.STRETCH;

  var fontRes   = scene.create({ t: "fontResource",  url: "FreeSans.ttf" });

  var bg        = scene.create({t:"image",  parent: root, url: "./browser/images/status_bg.svg", stretchX: myStretch, stretchY: myStretch });
  var browser   = scene.create({t:"object", parent: bg} );
  var content   = scene.create({t:"scene",  parent: bg,      x:10, y:60, clip:true });

  var contentBG = scene.create({t:"rect",   parent: browser, x:10, y:60, fillColor: 0xffffffff, a: 0.05 });
  var spinner   = scene.create({t:"image",  parent: browser, url: "./browser/images/spinningball2.png",  y:-80, cx: 50, cy: 50, sx: 0.3, sy: 0.3,a:0.0 });
  var inputBox = new imports.EditBox( { parent: browser, url: "./browser/images/input2.png", x: 10, y: 10, w: 800, h: 35, pts: 24 });
  var listBox = new imports.ListBox( { parent: content, x: 950, y: 0, w: 200, h: 100, visible:false, numItems:3 });


  var appImg = scene.create( { t: "image", parent: apps, id: index, url: imgUrl, w: child_w, h: child_h,
                  stretchX: scene.stretch.STRETCH, stretchY: scene.stretch.STRETCH  });


// Neat lines
var img1 = scene.create({ t: 'imageResource', url: base + '/images/logoImg1.svg' });
var img2 = scene.create({ t: 'image', parent: pp, sx: res_sx, sy: res_sy, url: base + '/images/logoImg2.jpg' });

// Neat lines (re-order)
var img3 = scene.create({ url: base + '/images/logoImg3.svg', t: 'imageResource' });
var img4 = scene.create({ url: base + '/images/logoImg4.jpg', parent: pp, t: 'image', sx: res_sx, sy: res_sy });

// Messy lines
var img5 = scene.create({ id:"foo",  url: base + '/images/logoImg5.jpg',
 w: 200,  t: 'imageResource',
  h: 300});

var img6 = scene.create({ t: 'image', 
                    parent: pp, 
                    sx: res_sx, 
                    sy: res_sy, url: base + '/images/logoImg6.jpg' });

// T U  logoImg1.jpg
// T U  logoImg2.jpg
// U T  logoImg3.jpg
// U T  logoImg4.jpg
// U T  logoImg5.jpg
// T U  logoImg6.jpg

