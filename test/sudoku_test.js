/* jshint node:true, mocha: true */

'use strict';
var sudoku = require('../index');
var expect = require('chai').expect;

var cells = [ '1', '5', '8',  '.', '2', '.',  '.', '6', '.',
              '2', '.', '.',  '.', '8', '.',  '.', '9', '.',
              '.', '3', '.',  '.', '7', '.',  '8', '.', '2',

              '.', '6', '.',  '7', '4', '.',  '.', '.', '.',
              '.', '.', '4',  '.', '6', '.',  '7', '.', '.',
              '.', '.', '.',  '.', '1', '9',  '.', '5', '.',

              '4', '.', '9',  '.', '3', '.',  '.', '2', '.',
              '.', '2', '.',  '.', '5', '.',  '.', '.', '8',
              '.', '7', '.',  '.', '9', '.',  '4', '1', '3' ];
describe('break a board into rows', function() {
  it('builds an array of arrays', function() {
    var matrix = [
      [ '1', '5', '8', '.', '2', '.', '.', '6', '.'],
      [ '2', '.', '.', '.', '8', '.', '.', '9', '.'],
      [ '.', '3', '.', '.', '7', '.', '8', '.', '2'],
      [ '.', '6', '.', '7', '4', '.', '.', '.', '.'],
      [ '.', '.', '4', '.', '6', '.', '7', '.', '.'],
      [ '.', '.', '.', '.', '1', '9', '.', '5', '.'],
      [ '4', '.', '9', '.', '3', '.', '.', '2', '.'],
      [ '.', '2', '.', '.', '5', '.', '.', '.', '8'],
      [ '.', '7', '.', '.', '9', '.', '4', '1', '3']
    ];

    expect(sudoku.buildRows(cells)).to.eql(matrix);
  });
});

describe('break a board into columns', function() {
  it('builds an array of arrays', function() {
    var matrix = [
      [ '1', '2', '.', '.', '.', '.', '4', '.', '.' ],
      [ '5', '.', '3', '6', '.', '.', '.', '2', '7' ],
      [ '8', '.', '.', '.', '4', '.', '9', '.', '.' ],
      [ '.', '.', '.', '7', '.', '.', '.', '.', '.' ],
      [ '2', '8', '7', '4', '6', '1', '3', '5', '9' ],
      [ '.', '.', '.', '.', '.', '9', '.', '.', '.' ],
      [ '.', '.', '8', '.', '7', '.', '.', '.', '4' ],
      [ '6', '9', '.', '.', '.', '5', '2', '.', '1' ],
      [ '.', '.', '2', '.', '.', '.', '.', '8', '3' ]
    ];


    expect(sudoku.buildColumns(cells)).to.eql(matrix);
  });
});

describe('break a board into groups', function() {
  it('builds an array of arrays', function() {
    var matrix = [
      [ '1', '5', '8', '2', '.', '.', '.', '3', '.' ],
      [ '.', '2', '.', '.', '8', '.', '.', '7', '.' ],
      [ '.', '6', '.', '.', '9', '.', '8', '.', '2' ],
      [ '.', '6', '.', '.', '.', '4', '.', '.', '.' ],
      [ '7', '4', '.', '.', '6', '.', '.', '1', '9' ],
      [ '.', '.', '.', '7', '.', '.', '.', '5', '.' ],
      [ '4', '.', '9', '.', '2', '.', '.', '7', '.' ],
      [ '.', '3', '.', '.', '5', '.', '.', '9', '.' ],
      [ '.', '2', '.', '.', '.', '8', '4', '1', '3' ]
    ];

    expect(sudoku.buildGroups(cells)).to.eql(matrix);
  });
});
