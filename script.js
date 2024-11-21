<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Interface</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        /* O mesmo estilo que você já forneceu */
    </style>
</head>
<body>
    <div class="container">
        <div class="left-panel">
            <div>
                <div class="button-group">
                    <button class="mode-button active" id="normalMode">Normal</button>
                    <button class="mode-button" id="autoMode">Auto</button>
                </div>
                <div class="input-group">
                    <input type="number" id="betAmount" placeholder="Quantidade">
                    <input type="number" id="betValue" placeholder="R$">
                </div>
                <div class="input-group">
                    <button id="halveBet">½</button>
                    <button id="doubleBet">2x</button>
                </div>
                <div class="input-group">
                    <input type="number" id="autoCashout" placeholder="Auto Retirar (Multiplier)">
                    <button id="clearInputs">Clear</button>
                </div>
            </div>
            <button class="start-button" id="startGame">Começar o jogo</button>
            <div class="bottom-icons">
                <i class="fas fa-expand"></i>
                <i class="fas fa-info-circle"></i>
            </div>
        </div>
        <div class="right-panel">
            <div class="game-display">
                <div class="multiplier" id="multiplierDisplay">1.00X</div>
                <div class="online-status">
                    <div class="dot"></div>
                    <span>Online</span>
                </div>
            </div>
            <div class="previous-results" id="previousResults">
                <!-- Resultados do jogo -->
            </div>
        </div>
    </div>

    <script>
        let isGameRunning = false;
        let currentMultiplier = 1;
        let crashPoint = Math.random() * 5 + 1; // Ponto de crash aleatório entre 1 e 6
        let gameInterval;

        // Elementos do DOM
        const multiplierDisplay = document.getElementById('multiplierDisplay');
        const startButton = document.getElementById('startGame');
        const previousResults = document.getElementById('previousResults');
        const betAmountInput = document.getElementById('betAmount');
        const betValueInput = document.getElementById('betValue');
        const autoCashoutInput = document.getElementById('autoCashout');

        // Começa o jogo
        startButton.addEventListener('click', () => {
            if (isGameRunning) return;
            startGame();
        });

        function startGame() {
            isGameRunning = true;
            currentMultiplier = 1;
            crashPoint = Math.random() * 5 + 1; // Gera um novo ponto de crash
            updateMultiplier();
        }

        function updateMultiplier() {
            gameInterval = setInterval(() => {
                if (currentMultiplier >= crashPoint) {
                    endGame(false); // Crash ocorreu
                } else {
                    currentMultiplier += 0.01;
                    multiplierDisplay.textContent = currentMultiplier.toFixed(2) + 'X';

                    const autoCashout = parseFloat(autoCashoutInput.value);
                    if (autoCashout && currentMultiplier >= autoCashout) {
                        endGame(true); // Auto-retirada
                    }
                }
            }, 50); // Atualiza o multiplicador a cada 50ms
        }

        function endGame(isWin) {
            clearInterval(gameInterval);
            isGameRunning = false;

            // Adiciona o resultado à lista de resultados anteriores
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');
            resultDiv.textContent = currentMultiplier.toFixed(2) + 'X';
            if (isWin) {
                resultDiv.classList.add('green');
            }
            previousResults.insertBefore(resultDiv, previousResults.firstChild);

            // Reseta o display
            multiplierDisplay.textContent = isWin ? `Retirado: ${currentMultiplier.toFixed(2)}X` : 'Crash!';
        }

        // Botões auxiliares
        document.getElementById('halveBet').addEventListener('click', () => {
            betValueInput.value = (parseFloat(betValueInput.value) / 2).toFixed(2);
        });

        document.getElementById('doubleBet').addEventListener('click', () => {
            betValueInput.value = (parseFloat(betValueInput.value) * 2).toFixed(2);
        });

        document.getElementById('clearInputs').addEventListener('click', () => {
            betAmountInput.value = '';
            betValueInput.value = '';
            autoCashoutInput.value = '';
        });
    </script>
</body>
</html>
