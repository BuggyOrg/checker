/* global describe, it */

var grlib = require('graphlib')
var fs = require('fs')
var _ = require('lodash')

var graph = grlib.json.read(JSON.parse(fs.readFileSync('./test/fixtures/real_fac.graphlib')))

var expect = require('chai').expect
var checker = require('../src/checker.js')

describe('Checker', function () {
  it('Find errors in the graph', function () {
    var d = checker.check(graph)
    console.log(d)
    expect(d).to.have.length(3)
    d = _.flatten(d)
    expect(d).to.include('strToERROR')
    expect(d).to.include('error:node')
    expect(d).to.include('facERROR')
  })
})
