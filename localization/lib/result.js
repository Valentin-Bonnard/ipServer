'use strict';

var _ = require('lodash');

function Result(_attrs) {
  this.attributes = _attrs || {};
}

_.extend(Result.prototype, {
  get: function(_attr) {
    return _.isFunction(this[_attr]) ? this[_attr]() : this.attributes[_attr];
  },

  streetAddress: function() {
    var arr = _.compact([this.get('streetNumber'), this.get('street')]);
    return _.isEmpty(arr) ? undefined : arr.join(' ');
  },

  address: function() {
    var arr = _.compact([this.get('streetAddress'), this.get('city'), this.get('regionCode'), this.get('postalCode'), this.get('countryCode')]);
    return _.isEmpty(arr) ? undefined: arr.join(', ');
  },

  state: function() {
    return this.get('region');
  },

  stateCode: function() {
    return this.get('regionCode');
  },

  zipCode: function() {
    return this.get('postalCode');
  }
});

module.exports = Result;