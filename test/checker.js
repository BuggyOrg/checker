/* global describe, it */

var grlib = require('graphlib')
var fs = require('fs')
var _ = require('lodash')

var graph = grlib.json.read(JSON.parse(fs.readFileSync('./test/fixtures/real_fac.graphlib')))

var expect = require('chai').expect
var checker = require('../src/checker.js')

describe('Checker', function () {
  it('Find errors in the graph', function () {
    var d = checker.errors(graph)
    expect(d).to.have.length(3)
    d = _.flatten(d)
    expect(d).to.include('strToERROR')
    expect(d).to.include('error:node')
    expect(d).to.include('facERROR')
  })

  it('throws an exception if an error occurs while checking', () => {
    expect(() => checker.check(graph)).to.throw(Error)
  })

  it('returns an empty array if no errors occur', () => {
    var g = grlib.json.read(JSON.parse(fs.readFileSync('./test/fixtures/inc.json')))
    var res = checker.errors(g)
    expect(res).to.have.length(0)
  })

  it('returns the same graph if no error occurs', () => {
    var g = grlib.json.read(JSON.parse(fs.readFileSync('./test/fixtures/inc.json')))
    var newG = checker.check(g)
    expect(grlib.json.write(newG)).to.deep.equal(grlib.json.write(g))
  })
})
