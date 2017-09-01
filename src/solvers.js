/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({'n': n});
  
  var temp = [0];
  

  for (var i = 0; i < n; i ++) {
    temp[i] = 1;
    board.set(i, temp);
  }
  // }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; // keeping track of solution count
  var board = new Board({n: n}); // creating the board based on n length
  
  var findSolution = function(row) {  //create recursive function, takes param of specific row
    if (row === n) {                  // BASE CASE: when count of row = n, solutionCount goes up by 1
      solutionCount++;                // return gets us out the current call stack
      return;
    }

  for (var i = 0; i < n; i++) {         
    board.togglePiece(row, i);
    if (!board.hasAnyRooksConflicts()) {
      findSolution(row + 1);
    }
    board.togglePiece(row, i);
  }
  //were gonna iterate through all the rows n, 
  //add a rook to a row at a particular index (with toggle function)
  //test if that board has any conflict;
  //if it has a conflict, recurse through the next row
  //board.toggle() to take piece away

  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

console.log(window.countNRooksSolutions(3));
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; // keeping track of solution count
  var board = new Board({n: n}); // creating the board based on n length
  
  var findSolution = function(row) {  //create recursive function, takes param of specific row
    if (row === n) {                  // BASE CASE: when count of row = n, solutionCount goes up by 1
      solutionCount++;                // return gets us out the current call stack
      return;
    }

  for (var i = 0; i < n; i++) {         
    board.togglePiece(row, i);
    if (!board.hasAnyQueensConflicts()) {
      findSolution(row + 1);
    }
    board.togglePiece(row, i);
  }
  //were gonna iterate through all the rows n, 
  //add a rook to a row at a particular index (with toggle function)
  //test if that board has any conflict;
  //if it has a conflict, recurse through the next row
  //board.toggle() to take piece away

  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
