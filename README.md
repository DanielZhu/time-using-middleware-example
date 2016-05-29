# time-using-middleware
 
 [![NPM version][npm-version-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![License][license-image]][npm-url] 

A tool to collect time cost for requests, waiting for HTML back, rendering page and etc., also it can export performance testing reports to HTML & pdf easily.

## How to run time-using-middleware-example

#### install time-using-middleware globally
`npm -i time-using-middleware -g`

#### start the node server
`node index.js`

#### visit the page

http://ip:3000/test?performance-testing

logs below when it's recording timecost

``` sh
[testDemoPage] Collected Log Records: 1
GET /test?performance-testing 200 147.827 ms - 168
GET /style.css 304 0.551 ms - -
GET /index.js 304 0.966 ms - -
POST /tu/finish 200 0.892 ms - 12
[testDemoPage] Collected Log Records: 2
GET /test?performance-testing 200 396.481 ms - 168
GET /style.css 304 0.617 ms - -
GET /index.js 304 0.801 ms - -
POST /tu/finish 200 0.961 ms - 12
[testDemoPage] Collected Log Records: 3
GET /test?performance-testing - - ms - -
```

#### Get the reports

`timeUsing -i ./log/timeUsing/ -c ./timeUsing.json `

Report in CL below:

```

-------------------------------------------------
       Time Using Middleware by Staydan.com      
                                                 
   Collect Data & Analyze Logs & Export Reports  
-------------------------------------------------


17ms -  analyzing log data finished...
contain pages counts: 2
 Analyzing For [ timeUsingTestPage ]      
validSampleCounts: 1156

20ms - assembling data...
samples counts for PAGE [ timeUsingTestPage ] : 1156 / 1156 (valid / sum)
 Analyzing For [ testDemoPage ]      
validSampleCounts: 7159

46ms - assembling data...
samples counts for PAGE [ testDemoPage ] : 7159 / 7159 (valid / sum)
0ms - preparing the table data...

------- Performance Testing Results -------

Page : timeUsingTestPage

|                 | Sample Count | average(ms) | median(ms) | min(ms) | max(ms) |
| :-------------- | :----------: | :---------: | :--------: | :-----: | :-----: |
| Test API        |     1156     |    1026.1   |   1039.5   |    7    |   2489  |
| Node All API(n) |     1156     |    1026.4   |   1039.5   |    8    |   2502  |
| FirstScreen Dom |     1156     |    1060.3   |   1072.5   |    37   |   2585  |


2ms - finish render data
0ms - preparing the table data...

------- Performance Testing Results -------

Page : testDemoPage

|                 | Sample Count | average(ms) | median(ms) | min(ms) | max(ms) |
| :-------------- | :----------: | :---------: | :--------: | :-----: | :-----: |
| Test API        |     7159     |    992.2    |     985    |    2    |   2514  |
| Node All API(n) |     7159     |    992.3    |     986    |    2    |   2522  |
| FirstScreen Dom |     7159     |    1025.8   |    1011    |    20   |   2738  |


1ms - finish render data
```

## Features

- Export Table Reports using Command Line window in Markdown format
- Recording the data of each page session
- Record pages by Regex Expression filters defined in Options
- Complete the page collect session until it recieve the COMPLETE signal by timeUsingMiddlewareCollectFinish
- Support those Pages which are consist of by both Nodejs side render and Front-end JS work. The cookie `mtKey` can tracking all of them
- All the time attributes are defined by Developers(You)

### [MIT Licensed](LICENSE) [@staydan.com](http://staydan.com) 2016

[license-image]: https://img.shields.io/npm/l/time-using-middleware.svg?maxAge=2592000&style=flat-square
[downloads-image]: https://img.shields.io/npm/dm/time-using-middleware.svg?maxAge=2592000&style=flat-square
[npm-version-image]: http://img.shields.io/npm/v/time-using-middleware.svg?maxAge=2592000&style=flat-square
[npm-url]: https://www.npmjs.com/package/time-using-middleware
