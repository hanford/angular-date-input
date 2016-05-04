var StringMask = require('string-mask')

module.exports = require('angular')
  .module('angular-date-input', [])
  .directive('dateInput', dateDirective)
  .name

function dateDirective () {
  return {
    restrict: 'EA',
    require: 'ngModel',
    link: link
  }
}

function link (scope, element, attrs, ctrl) {
  var dateMask = new StringMask('00/00/0000')

  function removeNonDigits (value) {
    return value.replace(/[^0-9]/g, '')
  }

  function applyDateMask (value) {
    var formatedValue
    formatedValue = dateMask.apply(value) || ''
    return formatedValue.trim().replace(/[^0-9]$/, '')
  }

  function formatter (value) {
    if (ctrl.$isEmpty(value)) {
      return value
    }

    return applyDateMask(removeNonDigits(value))
  }

  function parser (value) {
    if (ctrl.$isEmpty(value)) {
      return value
    }

    var formatedValue = applyDateMask(removeNonDigits(value))

    if (ctrl.$viewValue !== formatedValue) {
      ctrl.$setViewValue(formatedValue)
      ctrl.$render()
    }

    return actualValue
  }

  ctrl.$formatters.push(formatter)
  ctrl.$parsers.push(parser)
}
