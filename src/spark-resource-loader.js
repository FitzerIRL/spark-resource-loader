const loaderUtils = require("loader-utils");

module.exports = function(source, map) {

    const options = loaderUtils.getOptions(this);

    console.log("SPARK RESOURCE LOADER: " + JSON.stringify(options) + "\n");

    var newSource = source; // copy to modify

    newSource = parseImages(options.base, newSource); // modifies string

    // console.log("\n\n");
    // console.log("############################################");
    // console.log("\n"+newSource+"\n");
    // console.log("############################################");
    // console.log("\n\n");

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
    var key    = match[1];

   // console.log("## >> match: ["+match+"]  key: [" + key +"]    str: [" + str + "]");

    var reQuote = /.*(["']+).*/;
    var quote   = reQuote.exec(myStr);

    if( quote && myStr.endsWith(quote[1]) == false)
    {
        myStr += quote[1]; // append missing quote...   BAD RegEx :(
    }

    if(match && base[key])
    {
        var name = quote[1] + base[key] + quote[1];

        return myStr.replace(key, name);
    }

    return str; // Not Found
}


function parseImages(base, str)
{
    // There are 2 cases ... 'url' appears *BEFORE* 't:image|imageResource' and vice-versa..
    //
    var reUrlType = /.*\.create\s*\(\s*\{[^t:]+?url:([a-zA-Z0-9.+'"/ ]*)[\S\s]+?t:\s*['"]+[image|imageResource][\s\S]+?}\).*\s*/g;
    var reTypeUrl = /.*\.create\s*\(\s*\{[^url:]*?t:\s*['"]+[image|imageResource]+['"]+(?:[\s\S])*?url:([a-zA-Z0-9.+'"/ ]*).*\s*/g;

    var matcher = [ reUrlType, reTypeUrl ]

    var myStr = str;// to modify param

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var matches = [];

    matcher.map( (re, index) =>
    {
        do
        {
            var m = re.exec(myStr);
            if (m)
            {
                // console.log("## >> HERE:  MATCH: >>" + m[1] + "<<" );

                var finalname = resolveBase(base, m[1]);

                myStr = myStr.replace(m[0], m[0] + "\n" + "require(" + finalname +") // ## __spark-resource-loader__ ## \n");
                matches.push(finalname)
            }
            //break;
        } while (m);
    });

//    console.log(" Found: " + matches.length);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return myStr;
}
