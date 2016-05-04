## angular-date-input

[Live Demo!](https://hanford.github.io/angular-date-input)

[![NPM][star-icon]][star-url]

#### Installation  
Installation is super easy, simply add the dependencies to your build and add the ```date-input``` attribute to your input.

```
# use npm
$ npm install angular-date-input --save
```

Add angular-date-input to your dependencies

```
// your app
angular
  .module('yourApp', ['angular-date-input'])
  .controller('SampleController', function () {})
```

```
// template.html
<input ng-model="value" date-input type="text">
```

[star-icon]: https://nodei.co/npm/angular-date-input.png?downloads=true
[star-url]: https://npmjs.org/package/angular-date-input
