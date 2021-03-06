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

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // iterate over the row index
      // check if it is equal to 1 or 0    
      // keep track of 1s -- flag for true or false
      // return result
      var row = this.get(rowIndex); // [0,1,0]

      var counter = 0;
      for (var i = 0; i < row.length; i++) { //iterate over the indexs in current row
        if (counter < 2) {
          if (row[i] === 1) {
            counter ++;
          } 
        } else {
          return true;
        }
      }
      return false; // fixme
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() { 
      // access the whole board
      // use board.rows -> gives us an array of arrays
      var allRows = this.rows(); // 
      // run hasRowConflictAt on every row in the array
      var flag = false;
      for (var i = 0; i < allRows.length; i++) {
        flag = this.hasRowConflictAt(i);
        if (flag === true) {
          return flag;
        }
      }
      return flag; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //access the whole board
      var allRows = this.rows();
      // // iterate over the board
      
      // // declare a counter variable
      var counter = 0;
      // for each iteration check the counter
      for (var i = 0; i < allRows.length; i++) {
        // if counter < 2 
        if (counter < 2) {
          // we check colIndex for every element of the board array
          if (allRows[i][colIndex] === 1) {
            counter ++;
          }
        } else { // if counter is >= 2 return true
          return true;
        }
      } 
      // or else return false
      return false; // fixme
    },

    // // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // access the whole board
      // use board.rows -> gives us an array of arrays
      var allRows = this.rows(); // 
      // // run hasColConflictAt on every row in the array
      var flag = false;
      for (var i = 0; i < allRows.length; i++) {
        flag = this.hasColConflictAt(i);
        // can we access counter?
        if (flag === true) {
          return flag;
        }
      }
      return flag; 
    },
    // fixme
    // return false;        
    



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowIndex, columnIndex) {
      //create the board
      var board = this.rows();
      //get length of board
      //iterate through the length of the board
      //declare a variable, counter
      //each iteration,
      //check if counter < 2
      //if counter < 2, check if the square has '1'
      //if square has '1', counter++
      //if counter > 2, return true
      //return false after the for loop

      var counter = 0;

      for (var i = columnIndex; (i < board.length) && (rowIndex < board.length); i++) {
        // increment counter if there is a piece
        if (board[rowIndex][i] === 1) {
          counter ++;
        }
        // if counter is 2 or greater, return true
        if (counter > 1) {
          return true;
        }
        rowIndex++;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //create board
      var board = this.rows();
      //declare a variable 'flag' to ctach boolean return values
      var flag = false;
      var rowIndex = 0;
      var columnIndex = 0;
      //iterate through the board length,
      //each iteration, check through one diagonal row by calling
      // hasMajorDiagonalConflictAt function, 
      //and saving the return value in 'flag'
      //inorder to account for negative inputs, we set value of 'i' accordingly
      for (var i = 0; i < board.length; i++) {
        flag = this.hasMajorDiagonalConflictAt(0, columnIndex);
        if (flag === true) {
          return flag;
        }
        columnIndex++;
      }
      for (var i = 0; i < board.length; i++) {
        flag = this.hasMajorDiagonalConflictAt(rowIndex, 0);
        if (flag === true) {
          return flag;
        }
        rowIndex++;
      }
      return flag; // fixme
    },




    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIndex, columnIndex) {
      var board = this.rows();
      var counter = 0;

      for (var i = columnIndex; (i < board.length) && (rowIndex < board.length); i--) {
        // increment counter if there is a piece
        if (board[rowIndex][i] === 1) {
          counter ++;
        }
        // if counter is 2 or greater, return true
        if (counter > 1) {
          return true;
        }
        rowIndex++;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      //declare a variable 'flag' to ctach boolean return values
      var flag = false;
      var rowIndex = 0;
      var columnIndex = board.length - 1;
      //iterate through the board length,
      //each iteration, check through one diagonal row by calling
      // hasMajorDiagonalConflictAt function, 
      //and saving the return value in 'flag'
      //inorder to account for negative inputs, we set value of 'i' accordingly
      for (var i = 0; i < board.length; i++) {
        flag = this.hasMajorDiagonalConflictAt(rowIndex, columnIndex);
        if (flag === true) {
          return flag;
        }
        columnIndex--;
      }
      for (var i = 0; i < board.length; i++) {
        flag = this.hasMajorDiagonalConflictAt(rowIndex, columnIndex);
        if (flag === true) {
          return flag;
        }
        rowIndex++;
      }
      return flag; // fixme
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
