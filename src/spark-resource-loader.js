const loaderUtils = require("loader-utils");

module.exports = function(source, map) {

    const options = loaderUtils.getOptions(this);

    console.log("SPARK RESOURCE LOADER: " + JSON.stringify(options) + "\n");

    var newSource = source; // copy to modify

    newSource = parseImages(options.base, newSource); // modifies string

   // console.log("## newSource:  " + newSource + " <<");

    this.callback(
        null,
        newSource,
        map
    );
};

function resolveBase(base, str)
{
    var myStr = str;
    var reBase = /\s*([^ +]*)\s*\+/;
    var match  = reBase.exec(myStr);
    var key    = "(none)"

    //console.log("## >> match: ["+match+"]  key: [" + key +"]    str: [" + str + "]");

    if(match)
    {
        key = match[1];

        var reQuote = /.*(["']+).*/;
        var quote   = reQuote.exec(myStr);

        if(match && base[key])
        {
            var name = quote[1] + base[key] + quote[1];

            return myStr.replace(key, name);
        }
    }

    return str; // Not Found
}


function parseImages(base, str)
{
    var reJson        = /.*\.create\s*\(\s*\{([^}]*)\}\s*\).*/g;
    var reIsImageType = /.*\b[imageResource|image|image9]+\b.*/;
    var reIsImageFile = /.*\.[jpg|png|svg]+.*/;

    var myStr = str;// to modify param

//    var matches = [];

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var m = null;

    do
    {
        m = reJson.exec(myStr);
        if (m !== null)
        {
            try
            {
                var props = m[1].split(',');
                var obj   = {};

                // Parse JSON (ish) string to Object
                props.map(p =>
                {
                    var tup = p.split(':');

                    if(tup && tup.length == 2)
                    {
                        var key = tup[0].replace(/^\s+|\s+$/g, "");
                        var val = tup[1].replace(/^\s+|\s+$/g, "");

                        key = key.replace(/,/g, "");
                        val = val.replace(/,/g, "");

                        obj[key] = val;
                    }
                    // else
                    // {
                    //     console.log("## props >> props: " + props.length);
                    //     props.map( (pp, i) => { console.log("## props >> pp["+i+"]: " + pp);})
                    //     console.log("## BAD >> m[1]: " + m[1]);
                    // }
                });

                props = null;

                if(typeof(obj.t) !== 'undefined')
                {
                    if( reIsImageType.exec(obj.t) !== null)
                    {
                        if(reIsImageFile.exec(obj.url))
                        {
                            var finalname = resolveBase(base, obj.url);

                            myStr = myStr.replace(m[0], m[0] + "\n" + "require(" + finalname +") // ## __spark-resource-loader__ ## \n");

                            //console.log("## >> HERE:  m[0] : >>" + m[0]  + "<<" );
                            //  matches.push(finalname)
                        }
                    }
                }
                else
                {
                    console.log("## Invalid  call to \"create({ ... })\"  ... no 't:' property found ! ");
                }
            }
            catch(e)
            {
                console.log( "## FATAL:  Parse failed 123 ! - "+ m.length + "\n" +
//                +"\n  Line m: ["+ JSON.stringify(m)+"] "+
//                +"\n  Line m[1]: ["+ m[1] +"] "+
                +"\n Error: [" + e + "]" );
            }
        }
    } while (m);

//    console.log(" Found: " + matches.length);

//console.log(" --------DONE");

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return myStr;
}
