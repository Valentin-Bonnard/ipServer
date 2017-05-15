'use strict';

const expect = require('chai').expect,
    locate = require('../');

describe('locate.methis', function () {

    it('returns an empty Result if given no address', function (done) {
        let result = locate.methis(null, function (err, result) {
            expect(err).to.equal(null);
            expect(result.get('address')).to.equal(undefined);
            expect(result.get('streetNumber')).to.equal(undefined);
            expect(result.get('streetAddress')).to.equal(undefined);
            expect(result.get('street')).to.equal(undefined);
            expect(result.get('city')).to.equal(undefined);
            expect(result.get('region')).to.equal(undefined);
            expect(result.get('regionCode')).to.equal(undefined);
            expect(result.get('postalCode')).to.equal(undefined);
            expect(result.get('country')).to.equal(undefined);
            expect(result.get('countryCode')).to.equal(undefined);
            expect(result.get('lat')).to.equal(undefined);
            expect(result.get('lng')).to.equal(undefined);
            done();
        });
    });

    it('geolocates an IPv4 address', function (done) {
        let result = locate.methis('83.198.68.253', function (err, result) {
            expect(err).to.equal(null);
            expect(result.get('address')).to.equal('Damery, HDF, 80700, FR');
            expect(result.get('streetNumber')).to.equal(undefined);
            expect(result.get('streetAddress')).to.equal(undefined);
            expect(result.get('street')).to.equal(undefined);
            expect(result.get('city')).to.equal('Damery');
            expect(result.get('region')).to.equal('Hauts-de-France');
            expect(result.get('regionCode')).to.equal('HDF');
            expect(result.get('postalCode')).to.equal('80700');
            expect(result.get('country')).to.equal('France');
            expect(result.get('countryCode')).to.equal('FR');
            expect(result.get('lat')).to.equal(49.7144);
            expect(result.get('lng')).to.equal(2.7089);
            done();
        });
    });

    it('geolocates a postal address', function (done) {
        let result = locate.methis('Allée des Dames', function (err, result) {
            expect(err).to.equal(null);
            expect(result.get('address')).to.equal('Rue des Dames, Paris, Île-de-France, 75017, FR');
            expect(result.get('streetNumber')).to.equal(undefined);
            expect(result.get('street')).to.equal('Rue des Dames');
            expect(result.get('streetAddress')).to.equal('Rue des Dames');
            expect(result.get('city')).to.equal('Paris');
            expect(result.get('region')).to.equal('Île-de-France');
            expect(result.get('regionCode')).to.equal('Île-de-France');
            expect(result.get('postalCode')).to.equal('75017');
            expect(result.get('country')).to.equal('France');
            expect(result.get('countryCode')).to.equal('FR');
            expect(result.get('lat')).to.equal(48.8837632);
            expect(result.get('lng')).to.equal(2.3212034);
            done();
        });
    });

    it('geolocates a landmark', function (done) {
        let result = locate.methis('Tour Eiffel', function (err, result) {
            expect(err).to.equal(null);
            expect(result.get('address')).to.equal('5 Avenue Anatole France, Paris, Île-de-France, 75007, FR');
            expect(result.get('streetNumber')).to.equal('5');
            expect(result.get('street')).to.equal('Avenue Anatole France');
            expect(result.get('streetAddress')).to.equal('5 Avenue Anatole France');
            expect(result.get('city')).to.equal('Paris');
            expect(result.get('region')).to.equal('Île-de-France');
            expect(result.get('regionCode')).to.equal('Île-de-France');
            expect(result.get('postalCode')).to.equal('75007');
            expect(result.get('country')).to.equal('France');
            expect(result.get('countryCode')).to.equal('FR');
            expect(result.get('lat')).to.equal(48.85837009999999);
            expect(result.get('lng')).to.equal(2.2944813);
            done();
        });
    });
});