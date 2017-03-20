/**
 * Created by xujian1 on 20/03/2017.
 */
var argv = require('argv')
var path = require('path')

var compiler = require('./lib/compile')

var args = argv.option({
    name: 'globalSass',
    type: 'boolean',
    description: 'If use global node-sass lib to parse sass file.'
}).run()

var inputFile = args.targets[0],
    outputFile = args.targets[1]
var ifile = path.parse(inputFile)
var isSass = !!ifile.ext.match(/\.(sass|scss)/i)

if (!outputFile) {
    outputFile = path.join(ifile.dir, ifile.name + '.js')
}

if (isSass) {
    if (args.options.globalSass) {
        compiler.parseSCSSGlobally(inputFile, outputFile, errorFn)
    } else {
        compiler.parseSCSSLocally(inputFile, outputFile, errorFn)
    }
} else {
    compiler.parseCSS(inputFile, outputFile, errorFn)
}

function errorFn(err) {
    console.error(err)
}
