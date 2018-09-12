

   var logoRes  = scene.create({ t: "imageResource", url: base + '/images/comcast-logo-white.svg' });



// Neat lines
var img1 = scene.create({ t: 'imageResource', url: base + '/images/logoImg1.svg' });
var img2 = scene.create({ t: 'image', parent: pp, sx: res_sx, sy: res_sy, url: base + '/images/logoImg2.jpg' });

// Neat lines (re-order)
var img3 = scene.create({ url: base + '/images/logoImg3.svg', t: 'imageResource' });
var img4 = scene.create({ url: base + '/images/logoImg4.jpg', parent: pp, t: 'image', sx: res_sx, sy: res_sy });

// Messy lines
var img5 = scene.create({  url: base + '/images/logoImg5.jpg',
w: 200,  t: 'imageResource', h: 300});

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

