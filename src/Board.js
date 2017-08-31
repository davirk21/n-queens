// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    conflictCheck: function (array) {
      var sum = array.reduce(function(a, el) {
        return a + el;
        
      });
      return sum > 1 ? true : false;
    },
    

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) { 
      return this.conflictCheck(this.get(rowIndex));
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.get('n');
      //console.log(this.get('n'));
      for (var i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //console.log(this.get(colIndex));
      var currentCol = [];
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        currentCol.push(this.get(i)[colIndex]);
      }
      return this.conflictCheck(currentCol);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() { 
      var temp = [];
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        temp.push(this.hasColConflictAt(i));
      }
      return !(_.every(temp, function(el) {
        return el === false;
      }));
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var colCount =  majorDiagonalColumnIndexAtFirstRow;
      var rowCount;
      
      
      var temp = [];
      //console.log("this is n", this.get("n"));
      //console.log("this is the begining",majorDiagonalColumnIndexAtFirstRow);
      var n = this.get("n");
      for (var i = 0; i < n; i++) {
        rowcount = i;
        if (this._isInBounds(rowcount, colCount)) {
          temp.push(this.get(rowcount)[colCount]);
          colCount++;
            
        }
          
      }
      if (temp.length > 0) {
        return this.conflictCheck(temp);
      }
      //console.log(temp);
      //input: the column index at first row so for a board with {n:4}, it could be 0, 1, 2, or 3.
      //output: boolean to see if count is bigger than 1
      //since we know which column index we are at by doign a major diagonal we know where to look next with a math formula
      //the next instance we can see if count will increase is at (column-1, row + 1).  we do this until we are at either
      // one of the following (column === last column || row === last row);
      //if we see more than 2 1's in those respective indexes of rows/columns we can see a conflict and return are true, 
      //else we will return false as there are no conflicts.
      

      //return false; // fixme



    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //For this to run correctly we want to make sure every instance of a major diagonal is accounted for.  we sould run the previous helper
      //method on the entire column on the first row.  then we would move over to the next row until we reach the end.
      //edge cases for major diagonal is the bottow left sqaure and top right square as they are the only item.


      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //input: columnIndex at first row.
      //output: boolean.
      //It starts out again at the first row meaning its always starting at the 0 index of the initial first row
      //check the entire first row then you will need to traverse the bottom row (n) and continue to do so until you reach the end of the 
      //bottom array.(also it stop adding to count once the row index hits n) math pattern for next comparison to check if element === 1 
      // is (col + 1, row + 1) where we will stop making when we reach etiher (col === last col || row === last row);


      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //what i described previous is here.  the previous is to start at the columnIndex at the first row. then use the math equation pattern
      // to continous count the amount of times 1 apears until we reach the corner of the board. return a boolean if more than 1 is seen.
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
