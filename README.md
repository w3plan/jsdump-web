## JSDump-Web

JSDump-Web is a tool to dump out the information of own and inherited properties from an object, object prototype, and object instance.

JSDump-Web helps people get the information of a JavaScript object at runtime as much as possible.

JSDump-Web requires browser supporting for ES6 (ECMAScript 2015). 
|Chrome |Firefox |Edge |Safari |Opera |
|---------|--------|-------|-------|-------|
| 51      |54      |14     | 10    | 38    |

JSDump-Web is a version of JSDump specified for web browsers. To access [JSDump repository](https://github.com/w3plan/jsdump "JSDump") for the details.


## Documentation

To see [JSDump-Web documentation](doc/document.md "JSDump-Web documentation")


## Installation

Download jsdump.js and jsdump.src.js from [JSDump-Web repository](https://github.com/w3plan/jsdump-web "JSDump-Web repository") to the directory of your web server, for example, web-root-dir/js/jsdump-dir/ or web-root-dir/jsdump-dir/

Instead of download jsdump.js, you can include it via CDN with https://cdn.jsdelivr.net/gh/w3plan/jsdump-web@master/jsdump.js

## Usage

Adding &lt;script src="https://cdn.jsdelivr.net/gh/w3plan/jsdump-web@master/jsdump.js"></script&gt; or &lt;script src="/js/jsdump-dir/jsdump.js"&gt;&lt;/script&gt; to web pages then doing:

```javascript
  // prints this message.
  jsdump.info();
  // returns an object that includes dumped out content from URL.
  jsdump.entriesObj(URL);
  
  // prints the information of URL to the console.
  jsdump.entriesPrint(URL);
  
  // writes the information of URL to a new page.
  jsdump.entriesPage(URL);
  // writes the information of URL without style to a new page.
  jsdump.entriesPage(URL, true);
  
  // prints the information of entries type with 'function' from URL to the console.
  jsdump.typeEntriesPrint(URL);
  
  // writes the serialized information of entries type with 'function' from URL to new page.
  jsdump.typeEntriesPage(URL);
  
  // prints constructor source of jsdump to the console.
  jsdump.sourcePrint(jsdump);
  // prints sourcePrint source of jsdump to the console.
  jsdump.sourcePrint(jsdump, 'sourcePrint');
  
  // writes raw constructor of jsdump to a new page.
  jsdump.sourcePage(jsdump, 'constructor', true);
  // writes sourcePrint source of jsdump to a new page.
  jsdump.sourcePage(jsdump, 'sourcePrint');

```
The APIs that write the information to a new page requires the browser to open a pop-up window, you may need to enable pop-up window in the browser setting for these APIs. 


## Tests

Accessing /test/testsuit.html from JSDump-Web on web server.


## License

MIT


## Keywords

> dump, jsdump, jsdump-web, object dump, javascript dump, runtime dump

