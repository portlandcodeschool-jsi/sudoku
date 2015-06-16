/* jshint node:true, mocha: true */

'use strict';
var _ = require('lodash');
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

describe('Cell', function() {
  it ('initializes its possibilities', function() {
    var cell = new sudoku.Cell('.');
    expect(cell.possibilities).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(cell.solved).to.equal(false);
    expect(cell.value).to.equal(null);
  });

  it('initializes as solved', function() {
    var cell = new sudoku.Cell('8');
    expect(cell.possibilities).to.eql([8]);
    expect(cell.solved).to.equal(true);
    expect(cell.value).to.equal(8);
  });

  describe('checkForSolved', function() {
    it('notes the cell is solved', function() {
      var cell = new sudoku.Cell('.');
      cell.possibilities = [1];
      cell.checkForSolved();
      expect(cell.solved).to.equal(true);
    });

    it('sets the value poperty', function() {
      var cell = new sudoku.Cell('.');
      cell.possibilities = [1];
      cell.checkForSolved();
      expect(cell.value).to.equal(1);
    });
  });

  describe('applyRestrictions', function() {
    beforeEach(function() {
      this.cell = new sudoku.Cell('.');
      this.cell.possibilities = [1, 2, 3];
      this.cell.row = [];
      this.cell.column = [];
      this.cell.group = [];
    });

    it('reduces possibilities based on solved cells in its row', function() {
      var otherCell = new sudoku.Cell('2');
      this.cell.row = [otherCell];

      this.cell.applyRestrictions();

      expect(this.cell.possibilities).to.eql([1, 3]);
    });

    it('reduces possibilities based on solved cells in its column', function() {
      var otherCell = new sudoku.Cell('2');
      this.cell.column = [otherCell];

      this.cell.applyRestrictions();

      expect(this.cell.possibilities).to.eql([1, 3]);
    });

    it('reduces possibilities based on solved cells in its group', function() {
      var otherCell = new sudoku.Cell('2');
      this.cell.group = [otherCell];

      this.cell.applyRestrictions();

      expect(this.cell.possibilities).to.eql([1, 3]);
    });
  });
});

describe('populateReferences', function() {
  beforeEach(function() {
    var cells = this.cells = [
      new sudoku.Cell('.'),
      new sudoku.Cell('.'),
      new sudoku.Cell('.'),
      new sudoku.Cell('.')
    ];

    var rows = this.rows = [[cells[0], cells[1]], [cells[2], cells[3]]];
    var columns = this.columns = [[cells[0], cells[2]], [cells[1], cells[3]]];
    var groups = this.groups = [[cells[0]], [cells[1]], [cells[2]], [cells[3]]];

    sudoku.populateReferences(cells, rows, columns, groups);
  });

  it('sets up circular references to the rows', function() {
    expect(this.cells[0].row).to.equal(this.rows[0]);
    expect(this.cells[1].row).to.equal(this.rows[0]);
    expect(this.cells[2].row).to.equal(this.rows[1]);
    expect(this.cells[3].row).to.equal(this.rows[1]);
  });

  it('sets up circular references to the columns', function() {
    expect(this.cells[0].column).to.equal(this.columns[0]);
    expect(this.cells[1].column).to.equal(this.columns[1]);
    expect(this.cells[2].column).to.equal(this.columns[0]);
    expect(this.cells[3].column).to.equal(this.columns[1]);
  });

  it('sets up circular references to the groups', function() {
    expect(this.cells[0].group).to.equal(this.groups[0]);
    expect(this.cells[1].group).to.equal(this.groups[1]);
    expect(this.cells[2].group).to.equal(this.groups[2]);
    expect(this.cells[3].group).to.equal(this.groups[3]);
  });
});

describe('solve', function() {
  it('solves the board', function() {
    var simpleBoard = '158.2..6.2...8..9..3..7.8.2.6.74......4.6.7......19.5.4.9.3..2..2..5...8.7..9.413';
    var solved = sudoku.solve(simpleBoard);
    expect(_.all(solved.map(function(cell) {return cell.solved;}))).to.equal(true);
  });
});

