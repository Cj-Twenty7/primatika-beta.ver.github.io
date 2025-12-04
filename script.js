const defaultConfig = {
      background_color: '#1e40af',
      surface_color: '#60a5fa',
      text_color: '#ffffff',
      primary_action_color: '#1e40af',
      secondary_action_color: '#60a5fa',
      app_title: 'PriMatika',
      counting_button: 'Counting',
      solving_button: 'Solving',
      number_table_button: 'Number Table',
      inequality_button: 'Inequality'
    };


    // Counting state
    let countingDifficulty = 'easy';
    let countingSequence = [];
    let countingScore = 0;
    let countingProgress = 0;
    let totalCountingQuestions = 5;

    // Solving state
    let solvingDifficulty = 'easy';
    let solvingQuestions = [];
    let currentSolvingIndex = 0;
    let solvingScore = 0;
    let currentOperation = 'add';

    // Inequality state
    let inequalityDifficulty = 'easy';
    let inequalityQuestions = [];
    let currentInequalityIndex = 0;
    let inequalityScore = 0;

    function showPage(pageId) {
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      document.getElementById(pageId).classList.add('active');
    }
  
    function applyQuizColors() {
      const config = window.elementSdk ? window.elementSdk.config : defaultConfig;
      const surfaceColor = config.surface_color || defaultConfig.surface_color;
      const bgColor = config.background_color || defaultConfig.background_color;
      const textColor = config.text_color || defaultConfig.text_color;
      
      const progressTexts = document.querySelectorAll('.progress-text');
      progressTexts.forEach(pt => {
        pt.style.background = surfaceColor;
        pt.style.color = bgColor;
      });

      const numberButtons = document.querySelectorAll('number-btn');
      numberButtons.forEach(btn => {
        btn.style.background = surfaceColor;
        btn.style.color = bgColor;
      });

      const equationDisplay = document.getElementById('equation-display');
      if (equationDisplay) {
        equationDisplay.style.background = surfaceColor;
        equationDisplay.style.color = bgColor;
      }

      const answerInput = document.getElementById('answer-input');
      if (answerInput) {
        answerInput.style.borderColor = surfaceColor;
        answerInput.style.color = textColor;
        answerInput.style.background = 'transparent';
      }

      const checkBtn = document.getElementById('check-btn');
      if (checkBtn) {
        checkBtn.style.background = surfaceColor;
        checkBtn.style.color = bgColor;
      }

      const inequalityDisplay = document.getElementById('inequality-display');
      if (inequalityDisplay) {
        inequalityDisplay.style.background = surfaceColor;
      }

      const inequalityNumbers = document.querySelectorAll('inequality-number');
      inequalityNumbers.forEach(num => {
        num.style.color = bgColor;
      });

      const inequalitySymbol = document.querySelector('inequality-symbol');
      if (inequalitySymbol) {
        inequalitySymbol.style.color = bgColor;
      }

      const inequalityButtons = document.querySelectorAll('inequality-btn');
      inequalityButtons.forEach(btn => {
        btn.style.background = surfaceColor;
        btn.style.color = bgColor;
      });

      const scoreDisplays = document.querySelectorAll('score-display');
      scoreDisplays.forEach(sd => {
        sd.style.background = surfaceColor;
      });

      const scoreNumbers = document.querySelectorAll('score-number');
      scoreNumbers.forEach(sn => {
        sn.style.color = bgColor;
      });

      const scoreMessages = document.querySelectorAll('score-message');
      scoreMessages.forEach(sm => {
        sm.style.color = bgColor;
      });

      const tryAgainButtons = document.querySelectorAll('try-again-btn');
      tryAgainButtons.forEach(btn => {
        btn.style.background = bgColor;
        btn.style.color = textColor;
      });

      const numberCards = document.querySelectorAll('number-display-card');
      numberCards.forEach(card => {
        card.style.background = surfaceColor;
        const numberLarge = card.querySelector('.number-large');
        const wordLarge = card.querySelector('.word-large');
        if (numberLarge) numberLarge.style.color = bgColor;
        if (wordLarge) wordLarge.style.color = bgColor;
      });
    }

    // Navigation
    function showPage(pageId) {
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      document.getElementById(pageId).classList.add('active');
    }

    // Generate number table range buttons
    const numberTableRangeGrid = document.getElementById('number-table-range-grid');
    const icons = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    for (let i = 0; i < 10; i++) {
      const start = i * 10 + 1;
      const end = (i + 1) * 10;
      
      const btn = document.createElement('button');
      btn.className = 'operation-btn';
      btn.innerHTML = `
        <span class="operation-icon">${icons[i]}</span>
        <span>${start}-${end}</span>
      `;
      btn.dataset.start = start;
      btn.dataset.end = end;
      numberTableRangeGrid.appendChild(btn);
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ['app_title', config.app_title || defaultConfig.app_title],
        ['counting_button', config.counting_button || defaultConfig.counting_button],
        ['solving_button', config.solving_button || defaultConfig.solving_button],
        ['number_table_button', config.number_table_button || defaultConfig.number_table_button],
        ['inequality_button', config.inequality_button || defaultConfig.inequality_button]
      ]);
    }

   /* if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }*/

    // Main menu navigation
    document.getElementById('counting-btn').addEventListener('click', () => {
      showPage('counting-difficulty-page');
    });

    document.getElementById('solving-btn').addEventListener('click', () => {
      showPage('solving-difficulty-page');
    });

    document.getElementById('number-table-btn').addEventListener('click', () => {
      showPage('number-table-page');
    });

    document.getElementById('inequality-btn').addEventListener('click', () => {
      showPage('inequality-difficulty-page');
    });

    // Back button navigation
    document.getElementById('back-from-counting-difficulty').addEventListener('click', () => {
      showPage('main-page');
    });

    document.getElementById('back-from-counting-quiz').addEventListener('click', () => {
      showPage('counting-difficulty-page');
    });

    document.getElementById('back-from-counting-score').addEventListener('click', () => {
      showPage('counting-difficulty-page');
    });

    document.getElementById('back-from-solving-difficulty').addEventListener('click', () => {
      showPage('main-page');
    });

    document.getElementById('back-from-operation-selection').addEventListener('click', () => {
      showPage('solving-difficulty-page');
    });

    document.getElementById('back-from-solving-quiz').addEventListener('click', () => {
      showPage('operation-selection-page');
    });

    document.getElementById('back-from-solving-score').addEventListener('click', () => {
      showPage('solving-difficulty-page');
    });

    document.getElementById('back-from-number-table').addEventListener('click', () => {
      showPage('main-page');
    });

    document.getElementById('back-from-number-display').addEventListener('click', () => {
      showPage('number-table-page');
    });

    document.getElementById('back-from-inequality-difficulty').addEventListener('click', () => {
      showPage('main-page');
    });

    document.getElementById('back-from-inequality-quiz').addEventListener('click', () => {
      showPage('inequality-difficulty-page');
    });

    document.getElementById('back-from-inequality-score').addEventListener('click', () => {
      showPage('inequality-difficulty-page');
    });

    // Utility functions
    function shuffle(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    function generateSequence(start, end, difficulty) {

      let length = 5; // default = easy
      if (difficulty == "moderate" || difficulty == "hard") {
        length = 10;
  }

      const maxStart = end - 4;
      const randomStart = start + Math.floor(Math.random() * (maxStart - start + 1));
      
      const numbers = [];
      
      /*if (difficulty === 'easy') {
       for (let i = 0; i < 5; i++) {
        numbers.push(randomStart + i);
       }
      } else {
        for (let i = 0; i < 10; i++) {
        numbers.push(randomStart + i);
      }
    }
      return numbers;*/

   for (let i = 0; i < length; i++) {
    numbers.push(randomStart + i);
  }
      return numbers;
}

    function getScoreMessage(percentage) {
      if (percentage === 100) {
        return { icon: '🎉', message: 'Perfect! Amazing work!' };
      } else if (percentage >= 80) {
        return { icon: '🌟', message: 'Great job! Keep it up!' };
      } else if (percentage >= 60) {
        return { icon: '👍', message: 'Good effort! Practice more!' };
      } else if (percentage >= 40) {
        return { icon: '😊', message: 'Nice try! Keep practicing!' };
      } else {
        return { icon: '💪', message: 'Keep trying! You can do it!' };
      }
    }

    // ===== COUNTING SECTION =====
          // max mistakes depends on difficulty

// ========================
// START QUIZ
// ========================
document.getElementById('counting-easy-btn').addEventListener('click', () => {
  startCountingQuiz('easy');
});
document.getElementById('counting-moderate-btn').addEventListener('click', () => {
  startCountingQuiz('moderate');
});
document.getElementById('counting-hard-btn').addEventListener('click', () => {
  startCountingQuiz('hard');
});

function startCountingQuiz(difficulty) {
  countingDifficulty = difficulty;
  countingScore = 0;
  countingProgress = 0;

  let start, end;

  if (difficulty === 'easy') {
    totalCountingQuestions = 5;
    countingTries = 3;   // easy has 3 tries
    start = 1;
    end = 20;
  } else if (difficulty === 'moderate') {
    totalCountingQuestions = 10;
    countingTries = 5;   // moderate has 5 tries
    start = 1;
    end = 50;
  } else {
    totalCountingQuestions = 10;
    countingTries = 7;   // hard has 7 tries
    start = 1;
    end = 100;
  }

  countingSequence = generateSequence(start, end, difficulty);
  showCountingQuestion();
  showPage('counting-quiz-page');
}

// ========================
// SHOW QUESTION
// ========================
function showCountingQuestion() {
  const numberGrid = document.getElementById('counting-number-grid');
  const progressText = document.getElementById('counting-progress-text');

  progressText.textContent = `${countingProgress} / ${totalCountingQuestions}`;
  numberGrid.innerHTML = '';

  const shuffled = shuffle(countingSequence);
  shuffled.forEach((num) => {
    const btn = document.createElement('button');
    btn.className = 'number-btn';
    btn.textContent = num;
    btn.dataset.value = num;
    btn.addEventListener('click', () => handleCountingClick(btn, num));
    numberGrid.appendChild(btn);
  });

  applyQuizColors();
}

// ========================
// HANDLE NUMBER CLICK
// ========================
function handleCountingClick(button, value) {
  const expectedValue = countingSequence[countingProgress];

  if (value === expectedValue) {
    // Correct
    button.classList.add('correct');
    countingProgress++;
    countingScore++;
  } else {
    // Wrong
    button.classList.add('wrong');
    countingProgress++;
  }

  // Update progress display
  const progressText = document.getElementById('counting-progress-text');
  progressText.textContent = `${countingProgress} / ${totalCountingQuestions}`;

  // Check end conditions
  if (countingProgress === countingSequence.length) {
    // End of sequence or out of tries — show score
    setTimeout(() => showCountingScore(), 500);
    
    showPage('counting-score-page');
  }
}

// ========================
// SHOW SCORE
// ========================
function showCountingScore() {
  const totalQuestions = totalCountingQuestions;
  const percentage = (countingScore / totalQuestions) * 100;

  const scoreIcon = document.getElementById('counting-score-icon');
  const scoreNumber = document.getElementById('counting-score-number');
  const scoreMessage = document.getElementById('counting-score-message');

  const { icon, message } = getScoreMessage(percentage);

  scoreIcon.textContent = icon;
  scoreNumber.textContent = `${countingScore} / ${totalQuestions}`;
  scoreMessage.textContent = message;

  applyQuizColors();
  showPage('counting-score-page');
  showPage('countingDifficulty');
}

// ========================
// RETRY & CHANGE DIFFICULTY
// ========================
document.getElementById('counting-try-again-btn').addEventListener('click', () => {
  startCountingQuiz(countingDifficulty);
});

document.getElementById('counting-difficulty-btn').addEventListener('click', () => {
  showPage(counting-btn-page);
});

// ========================
// UTILITY FUNCTIONS
// ========================
function generateSequence(start, end, difficulty) {
  let length = (difficulty === 'easy') ? 5 : 10;

  const maxStart = end - (length - 1);
  const randomStart = start + Math.floor(Math.random() * (maxStart - start + 1));

  const numbers = [];
  for (let i = 0; i < length; i++) numbers.push(randomStart + i);
  return numbers;
}

function shuffle(arr) {
  return arr
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);
}

    // ===== SOLVING SECTION =====

    const numberImages = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🥕', '🌽', '🍒', '🍑', '🥝'];

    document.getElementById('solving-easy-btn').addEventListener('click', () => {
      solvingDifficulty = 'easy';
      showPage('operation-selection-page');
    });

    document.getElementById('solving-moderate-btn').addEventListener('click', () => {
      solvingDifficulty = 'moderate';
      showPage('operation-selection-page');
    });

    document.getElementById('solving-hard-btn').addEventListener('click', () => {
      solvingDifficulty = 'hard';
      showPage('operation-selection-page');
    });

    document.getElementById('add-operation-btn').addEventListener('click', () => {
      startSolving(solvingDifficulty, 'add');
    });

    document.getElementById('subtract-operation-btn').addEventListener('click', () => {
      startSolving(solvingDifficulty, 'subtract');
    });

    function generateEquation(start, end, operation) {
      let num1, num2, answer;
      
      if (operation === 'add') {
        num1 = start + Math.floor(Math.random() * (end - start + 1));
        const maxNum2 = end - num1;
        num2 = Math.floor(Math.random() * (maxNum2 + 1));
        answer = num1 + num2;
      } else {
        num1 = start + Math.floor(Math.random() * (end - start + 1));
        num2 = Math.floor(Math.random() * (num1 - start + 1));
        answer = num1 - num2;
      }
      
      const imageIndex = Math.floor(Math.random() * numberImages.length);
      const image = numberImages[imageIndex];
      
      return { num1, num2, answer, operation, image };
    }

    function generateImagesHTML(count, image) {
      let html = '<div class="equation-group">';
      html += '<div class="equation-images">';
      for (let i = 0; i < count; i++) {
        html += `<span class="equation-item">${image}</span>`;
      }
      html += '</div>';
      html += `<span class="equation-number">${count}</span>`;
      html += '</div>';
      return html;
    }

    function generateSolvingQuestions(difficulty, operation) {
      const questions = [];
      let count, start, end;

      if (difficulty === 'easy') {
        count = 5;
        start = 1;
        end = 10;
      } else if (difficulty === 'moderate') {
        count = 10;
        start = 1;
        end = 20;
      } else {
        count = 10;
        start = 1;
        end = 50;
      }

      for (let i = 0; i < count; i++) {
        questions.push(generateEquation(start, end, operation));
      }

      return questions;
    }

    function showSolvingQuestion() {
      const question = solvingQuestions[currentSolvingIndex];
      const equationDisplay = document.getElementById('equation-display');
      const answerInput = document.getElementById('answer-input');
      const feedbackMessage = document.getElementById('feedback-message');
      const progressText = document.getElementById('solving-progress-text');
      
      const opSymbol = question.operation === 'add' ? '+' : '−';
      
      equationDisplay.innerHTML = `
        ${generateImagesHTML(question.num1, question.image)}
        <span class="equation-operator">${opSymbol}</span>
        ${generateImagesHTML(question.num2, question.image)}
        <span class="equation-equals">=</span>
        <span class="equation-operator">?</span>
      `;
      
      answerInput.value = '';
      feedbackMessage.style.display = 'none';
      progressText.textContent = `${currentSolvingIndex + 1} / ${solvingQuestions.length}`;
      
      startSolving();
      applyQuizColors();
    }

    function startSolving(difficulty, operation) {
      solvingDifficulty = difficulty;
      currentOperation = operation;
      solvingQuestions = generateSolvingQuestions(difficulty, operation);
      currentSolvingIndex = 0;
      solvingScore = 0;

      showSolvingQuestion();
      showPage('solving-quiz-page');
    }

    document.getElementById('check-btn').addEventListener('click', () => {
      const answerInput = document.getElementById('answer-input');
      const feedbackMessage = document.getElementById('feedback-message');
      const checkBtn = document.getElementById('check-btn');
      
      const userAnswer = parseInt(answerInput.value);
      
      if (isNaN(userAnswer)) {
        return;
      }
      
      const question = solvingQuestions[currentSolvingIndex];
      checkBtn.disabled = true;
      feedbackMessage.style.display = 'block';
      
      if (userAnswer === question.answer) {
        feedbackMessage.textContent = '🎉 Correct!';
        feedbackMessage.style.background = '#10b981';
        feedbackMessage.style.color = '#ffffff';
        solvingScore++;

        setTimeout(() => {
          currentSolvingIndex++;
          checkBtn.disabled = false;
        if (currentSolvingIndex < solvingQuestions.length) {
            showSolvingQuestion();
          } else {
            showSolvingScore();
          }
        }, 800);
      } else {
        feedbackMessage.textContent = '❌ Wrong! The answer is ' + question.answer;
        feedbackMessage.style.background = '#ef4444';
        feedbackMessage.style.color = '#ffffff';

        setTimeout(() => {
          currentSolvingIndex++;
          checkBtn.disabled = false;
          if (currentSolvingIndex < solvingQuestions.length) {
            showSolvingQuestion();
          } else {
            showSolvingScore();
          }
        }, 1500);
      }
    });

    function showSolvingScore() {
      const totalQuestions = solvingQuestions.length;
      const percentage = (solvingScore / totalQuestions) * 100;
      
      const scoreIcon = document.getElementById('solving-score-icon');
      const scoreNumber = document.getElementById('solving-score-number');
      const scoreMessage = document.getElementById('solving-score-message');

      const { icon, message } = getScoreMessage(percentage);
      
      scoreIcon.textContent = icon;
      scoreNumber.textContent = `${solvingScore} / ${totalQuestions}`;
      scoreMessage.textContent = message;

      applyQuizColors();
      showPage('solving-score-page');
    }

    document.getElementById('solving-try-again-btn').addEventListener('click', () => {
      startSolving(solvingDifficulty, currentOperation);
    });

    document.getElementById('solving-difficulty-btn').addEventListener('click', () => {
      showPage('solving-difficulty-page');
    });

    // ===== NUMBER TABLE SECTION =====

    numberTableRangeGrid.addEventListener('click', (e) => {
      const rangeBtn = e.target.closest('.operation-btn');
      if (rangeBtn) {
        const start = parseInt(rangeBtn.dataset.start);
        const end = parseInt(rangeBtn.dataset.end);
        showNumberTable(start, end);
      }
    });

    function showNumberTable(start, end) {
      const numberDisplayList = document.getElementById('number-display-list');
      const numberDisplayTitle = document.getElementById('number-display-title');
      
      numberDisplayTitle.textContent = `${start}-${end}`;
      numberDisplayList.innerHTML = '';
      
      for (let num = start; num <= end; num++) {
        const card = document.createElement('div');
        card.className = 'number-display-card';
        
        const numberLarge = document.createElement('div');
        numberLarge.className = 'number-large';
        numberLarge.textContent = num;
        
        const wordLarge = document.createElement('div');
        wordLarge.className = 'word-large';
        wordLarge.textContent = numberWords[num];
        
        card.appendChild(numberLarge);
        card.appendChild(wordLarge);
        
        numberDisplayList.appendChild(card);
      }
      
      applyQuizColors();
      showPage('number-table-display-page');
    }

    // ===== INEQUALITY SECTION =====

    document.getElementById('inequality-easy-btn').addEventListener('click', () => {
      startInequalityQuiz('easy');
    });

    document.getElementById('inequality-moderate-btn').addEventListener('click', () => {
      startInequalityQuiz('moderate');
    });

    document.getElementById('inequality-hard-btn').addEventListener('click', () => {
      startInequalityQuiz('hard');
    });

    function generateInequalityQuestions(difficulty) {
      const questions = [];
      let count, minRange, maxRange;

      if (difficulty === 'easy') {
        count = 5;
        minRange = 1;
        maxRange = 9;
      } else if (difficulty === 'moderate') {
        count = 10;
        minRange = 1;
        maxRange = 99;
      } else {
        count = 10;
        minRange = 10;
        maxRange = 99;
      }

      for (let i = 0; i < count; i++) {
        let num1, num2;
        
        if (difficulty === 'moderate') {
          if (Math.random() < 0.5) {
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 90) + 10;
          } else {
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 9) + 1;
          }
        } else {
          num1 = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
          num2 = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        }

        let correctSymbol;
        if (num1 < num2) correctSymbol = '<';
        else if (num1 > num2) correctSymbol = '>';
        else correctSymbol = '=';

        questions.push({ num1, num2, correctSymbol });
      }

      return questions;
    }

    function startInequalityQuiz(difficulty) {
      inequalityDifficulty = difficulty;
      inequalityQuestions = generateInequalityQuestions(difficulty);
      currentInequalityIndex = 0;
      inequalityScore = 0;

      showInequalityQuestion();
      showPage('inequality-quiz-page');
    }

    function showInequalityQuestion() {
      const question = inequalityQuestions[currentInequalityIndex];
      const leftNum = document.getElementById('inequality-left');
      const rightNum = document.getElementById('inequality-right');
      const progressText = document.getElementById('inequality-progress-text');

      leftNum.textContent = question.num1;
      rightNum.textContent = question.num2;
      progressText.textContent = `${currentInequalityIndex + 1} / ${inequalityQuestions.length}`;

      document.querySelectorAll('.inequality-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
      });

      applyQuizColors();
    }

    function handleInequalityAnswer(selectedSymbol, button) {
      const question = inequalityQuestions[currentInequalityIndex];
      const allButtons = document.querySelectorAll('.inequality-btn');

      allButtons.forEach(btn => btn.disabled = true);

      if (selectedSymbol === question.correctSymbol) {
        button.classList.add('correct');
        inequalityScore++;

        setTimeout(() => {
          currentInequalityIndex++;
          if (currentInequalityIndex < inequalityQuestions.length) {
            showInequalityQuestion();
          } else {
            showInequalityScore();
          }
        }, 800);
      } else {
        button.classList.add('wrong');

        setTimeout(() => {
          currentInequalityIndex++;
          if (currentInequalityIndex < inequalityQuestions.length) {
            showInequalityQuestion();
          } else {
            showInequalityScore();
          }
        }, 800);
      }
    }

    function showInequalityScore() {
      const totalQuestions = inequalityQuestions.length;
      const percentage = (inequalityScore / totalQuestions) * 100;
      
      const scoreIcon = document.getElementById('inequality-score-icon');
      const scoreNumber = document.getElementById('inequality-score-number');
      const scoreMessage = document.getElementById('inequality-score-message');

      const { icon, message } = getScoreMessage(percentage);
      
      scoreIcon.textContent = icon;
      scoreNumber.textContent = `${inequalityScore} / ${totalQuestions}`;
      scoreMessage.textContent = message;

      applyQuizColors();
      showPage('inequality-score-page');
    }

    document.getElementById('inequality-options').addEventListener('click', (e) => {
      const button = e.target.closest('.inequality-btn');
      if (button && !button.disabled) {
        const selectedSymbol = button.dataset.symbol;
        handleInequalityAnswer(selectedSymbol, button);
      }
    });

    document.getElementById('inequality-try-again-btn').addEventListener('click', () => {
      startInequalityQuiz(inequalityDifficulty);
    });

    document.getElementById('inequality-change-difficulty-btn').addEventListener('click', () => {
      showPage('inequality-difficulty-page');
    });

    // Initialize
    if (window.elementSdk) {
      onConfigChange(window.elementSdk.config || defaultConfig);
    } else {
      onConfigChange(defaultConfig);
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              config.background_color = value;
              window.elementSdk.setConfig({ background_color: value });
            }
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (value) => {
              config.surface_color = value;
              window.elementSdk.setConfig({ surface_color: value });
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            }
          },
          {
            get: () => config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => {
              config.primary_action_color = value;
              window.elementSdk.setConfig({ primary_action_color: value });
            }
          },
          {
            get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
            set: (value) => {
              config.secondary_action_color = value;
              window.elementSdk.setConfig({ secondary_action_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      };
    }
    