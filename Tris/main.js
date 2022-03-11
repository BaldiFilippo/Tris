window.addEventListener('load', function () {
  const cells = Array.from(document.querySelectorAll('.cell'))
  const resetButton = document.querySelector('.reset')
  const lines = Array.from(document.querySelectorAll('.line'))

  const firstDiagonal = lines[0]
  const secondDiagonal = lines[1]
  const firstHorizontal = lines[3]
  const secondHorizontal = lines[4]
  const thirdHorizontal = lines[5]
  const firstVertical = lines[7]
  const secondVertical = lines[2]
  const thirdVertical = lines[6]

  let board = ['', '', '', '', '', '', '', '', '']
  /* indexes 
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]  
    */

  currentPlayer = 'X'
  let gameIsActive = true
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const resetBoard = () => {
    lines.forEach((line) => {
      line.classList.remove('winAnimation')
    })
    board = ['', '', '', '', '', '', '', '', '']
    gameIsActive = true
    if (currentPlayer === 'O') {
      changePlayer()
    }

    cells.forEach((cell) => {
      cell.innerText = ''
      cell.classList.remove('playerX')
      cell.classList.remove('playerO')
    })
  }

  const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  }

  const updateBoard = (index) => {
    board[index] = currentPlayer
  }

  function checkMatchValidation() {
    let roundWon = false
    let checkLines = 0
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i]
      const a = board[winCondition[0]]
      const b = board[winCondition[1]]
      const c = board[winCondition[2]]
      if (a === '' || b === '' || c === '') {
        continue
      }
      if (a === b && b === c) {
        roundWon = true
        checkLines = i
        break
      }
    }
    if (roundWon) {
      gameIsActive = false
      switch (checkLines) {
        case 0:
          firstHorizontal.classList.add('winAnimation')
          break
        case 1:
          secondHorizontal.classList.add('winAnimation')
          break
        case 2:
          thirdHorizontal.classList.add('winAnimation')
          break
        case 3:
          firstVertical.classList.add('winAnimation')
          break
        case 4:
          secondVertical.classList.add('winAnimation')
          break
        case 5:
          thirdVertical.classList.add('winAnimation')
          break
        case 6:
          firstDiagonal.classList.add('winAnimation')
          break
        case 7:
          secondDiagonal.classList.add('winAnimation')
          break
      }
    }
    if (!board.includes('') && !roundWon) {
      alert('Game is a draw!')
    }
  }

  const userMove = function (cell, index) {
    if (gameIsActive && board[index] === '') {
      cell.innerText = currentPlayer
      cell.classList.add(`player${currentPlayer}`)
      updateBoard(index)
      checkMatchValidation()
      changePlayer()
    }
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => userMove(cell, index))
  })

  resetButton.addEventListener('click', resetBoard)
})
