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
  var SEPARATOR = '/'
  var MM_DD_YYYY = /^\D*(\d{1,4})(\D+)?(\d{1,2})?(\D+)?(\d{1,4})?/
  var dateMask = new StringMask('00/00/0000')

  function removeNonDigits (value) {
    return value.replace(/([A-Z]|[a-z])/g, '')
  }

  function applyDateMask (value) {
    var formatedValue
    formatedValue = dateMask.apply(value) || ''
    return removeNonDigits(formatedValue.trim())
  }

  function formatter (value) {
    if (ctrl.$isEmpty(value)) {
      return value
    }

    return applyDateMask(value || '')
  }

  var parseDate = function (value) {
    var parts = value.match(MM_DD_YYYY)
    if (!parts) return []

    var month = parts[1] || ''
    var separator1 = parts[2] || ''
    var date = parts [3] || ''
    var separator2 = parts[4] || ''
    var year = parts[5] || ''

    if (year.length > 0) {
      separator2 = SEPARATOR
    } else if (separator1 === ' /') {
      month = month.substring(0, 1)
      separator1 = ''
    } else if (month.length === 2 || separator1) {
      separator1 = SEPARATOR
    } else if (month.length > 2) {
      month = month.substring(0, 2)
      separator1 = ''
    } else if (month.length === 1 && month !== '0' && month !== '1') {
      month = '0' + month
      separator1 = '/'
    } else if (date.length === 1 && date !== '0' && date !== '1' && date !== '2' && date !== '3') {
      date = '0' + date
      separator2 = '/'
    }

    if (date && parseInt(date, 10) > 31) {
      date = 31
    }

    if (month && parseInt(month, 10) > 12) {
      date = 12
    }

    var currentYear = (new Date()).getFullYear()

    if (year && parseInt(year, 10) > currentYear) {
      year = currentYear
    }

    return [
      month,
      separator1,
      date,
      separator2,
      year
    ].filter(Boolean)
  }

  var parser = function (value) {
    if (ctrl.$isEmpty(value)) {
      return value
    }

    var newValue = removeNonDigits(parseDate(value).join(''))
    var formattedValue = formatter(newValue)

    if (ctrl.$viewValue !== newValue) {
      ctrl.$setViewValue(newValue)
      ctrl.$render()
    }

    return removeNonDigits(newValue)
  }

  element.on('keydown', function (ev) {
    if (ev.keyCode === 8) {
      var parts = parseDate(ev.target.value)

      if (parts.length === 2) {
        ctrl.$setViewValue('')
        ctrl.$render()
      }
    }
  })

  ctrl.$formatters.push(formatter)
  ctrl.$parsers.push(parser)
}
