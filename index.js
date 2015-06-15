/* jshint node:true */
'use strict';
var _ = require('lodash');

module.exports.buildColumns = function(cells) {
  var i,
      j,
      matrix = [[], [], [], [], [], [], [], [], []];

  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      matrix[j][i] = cells[(i * 9) + j];
    }
  }

  return matrix;
}

module.exports.buildRows = function(cells) {
  var i,
      j,
      matrix = [[], [], [], [], [], [], [], [], []];
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      matrix[i][j] = cells[(i * 9) + j];
    }
  }

  return matrix;
}

module.exports.buildGroups = function(cells) {
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

  // for (i = 0; i < 9; i++) {
  //   for (j = 0; j < 9; j++) {
  //     matrix[i + (j % 3)][j] = cells[(i * 9) + j];
  //   }
  // }

  return matrix;
}


module.exports.solve = function() {
  // TODO
};
