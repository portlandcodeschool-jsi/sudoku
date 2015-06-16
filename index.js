/* jshint node:true */
'use strict';
var _ = require('lodash');

var buildColumns = module.exports.buildColumns = function(cells) {
  var i,
      j,
      matrix = [[], [], [], [], [], [], [], [], []];

  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      matrix[j][i] = cells[(i * 9) + j];
    }
  }

  return matrix;
};

var buildRows = module.exports.buildRows = function(cells) {
  var i,
      j,
      matrix = [[], [], [], [], [], [], [], [], []];
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      matrix[i][j] = cells[(i * 9) + j];
    }
  }

  return matrix;
};

var buildGroups = module.exports.buildGroups = function(cells) {
  var group,
      groupPosition,
      row,
      column,
      startRow,
      startColumn,
      matrix = [[], [], [], [], [], [], [], [], []];

  for (group = 0; group < 9; group++) {
    startRow = Math.floor(group/3) * 3;
    groupPosition = 0;
    for (row = startRow; row < startRow + 3; row++) {
      startColumn = (group % 3) * 3;
      for (column = startColumn; column < startColumn + 3; column++) {
        matrix[group][groupPosition] = cells[(row * 9) + column];
        groupPosition++;
      }
    }
  }

  return matrix;
};

var Cell = module.exports.Cell = function Cell(initial) {
  this.row = null;
  this.column = null;
  this.group = null;
  this.value = null;
  this.solved = false;
  if (isNaN(Number(initial))) {
    this.possibilities = _.range(1, 10);
  } else {
    this.possibilities = [Number(initial)];
  }
  this.checkForSolved();
};

Cell.prototype.checkForSolved = function() {
  if (this.possibilities.length === 1) {
    this.solved = true;
    this.value = this.possibilities[0];
  }
};

Cell.prototype.applyRestrictions = function() {
  var changedAnything = false;

  if (! this.solved) {
    ['row', 'column', 'group'].forEach(function(grouping) {
      this[grouping].forEach(function(otherCell) {
        if (otherCell.solved) {
          if (this.possibilities.indexOf(otherCell.value) !== -1) {
            this.possibilities.splice(this.possibilities.indexOf(otherCell.value), 1);
            this.checkForSolved();
            changedAnything = true;
          }
        }
      }.bind(this));
    }.bind(this));
  }

  return changedAnything;
};

var populateReferences = module.exports.populateReferences = function populateReferences(cells, rows, columns, groups) {
  rows.forEach(function (row) {
    row.forEach(function(cell) {
      cell.row = row;
    });
  });
  columns.forEach(function (column) {
    column.forEach(function(cell) {
      cell.column = column;
    });
  });
  groups.forEach(function (group) {
    group.forEach(function(cell) {
      cell.group = group;
    });
  });
};

module.exports.solve = function(board) {
  var cells = board.split('').map(function(initial) {return new Cell(initial);});
  var rows = buildRows(cells);
  var columns = buildColumns(cells);
  var groups = buildGroups(cells);

  populateReferences(cells, rows, columns, groups);

  var changedAnything = false;
  function applyRestrictions(cell) {
    changedAnything = (cell.applyRestrictions() || changedAnything);
  }
  do {
    changedAnything = false;
    cells.forEach(applyRestrictions);
  } while (changedAnything);

  return cells;
};
