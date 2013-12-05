#Developer bookmarklets for SharePoint 2013

Some helpful browser [bookmarklets](http://en.wikipedia.org/wiki/Bookmarklet) you can use while developing with SharePoint 2013.

##Getting Started

If you want to just use the generated bookmarklets right away you can find all the compiled .js files in the /bin folder. Just find the bookmarklet you want to leverage, copy its contents into your browser bookmark URL and you're all set. NOTE: Some older browsers have URL character limits so bookmarklets longer than 2000 characters can be problematic depending on your browser. For these more complex bookmarklets you will need to use a browser that supports longer URL lengths for bookmark URLs. The compilation process if you're modifying the source will warn you if your bookmarklet exceeds 2000 characters, but this will not prevent its compilation. You can ignore this warning if you're working with a relatively new browser that has longer URL limits.

Refer to Build Instructions in this README for details on how to modify and compile the bookmarklet source files.

## Build Instructions

1. Install [NodeJS](http://nodejs.org/).

2. Install Grunt and Grunt CLI.

        npm -g install grunt grunt-cli
3. Run `npm install` from command line at root project folder.
    This will read the *package.json* file and pull in all required node modules and put into a directory called *node_modules*. This directory is generated so it can be deleted and should not be checked into source control. If deleted running `npm install` will re-create it.
4. Use `grunt` command to build bookmarklets. This will clear out all existing .bookmarklet.js files in the bin folder, run jshint on your src files, and then generate the new .bookmarklet.js files.


## Bookmarklets

### Login as a Different User ([source](src/login-different-user.js) / [bookmarklet](bin/login-different-user.bookmarklet.js))

This bookmarklet is a handy quick link to force logging in as a different user. Since SP 2013 obscured this functionality this makes it a lot easier than logging out and opening a new browser instance.

### REST API Endpoints ([source](src/rest-endpoints.js) / [bookmarklet](bin/rest-endpoints.bookmarklet.js))

Will bring up a modal dialog with a list of popular REST API endpoints. Just click one and it will open in a new window/tab. Easier than having to memorize all the endpoints or keep external or individual bookmarks to them somewhere. There is also a checkbox to scope the links to the current site collection. By default they are all relative to your current site.

### Property Bag ([source](src/property-bag.js) / [bookmarklet](bin/property-bag.bookmarklet.js)

Shows a list of all properties in the current web's property bag.

## Support

If you have a bug, or a feature request, please post in the [issue tracker](https://github.com/habaneroconsulting/sp2013-developer-bookmarklets/issues). If you logging in reference to a specific bookmarklet please reference it in your issue title.
	
## License

Copyright (c) 2013 Habanero Consulting Group

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.