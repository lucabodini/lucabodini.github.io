// Basket Game Logic
class BasketGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 60;
        this.gameActive = false;
        this.timer = null;
        
        this.ball = document.getElementById('basketball');
        this.hoop = document.getElementById('hoop');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.setupBallDrag();
    }
    
    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 60;
        
        this.updateDisplay();
        this.startBtn.disabled = true;
        
        // Start timer
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    resetGame() {
        this.gameActive = false;
        this.score = 0;
        this.timeLeft = 60;
        
        clearInterval(this.timer);
        this.startBtn.disabled = false;
        
        this.resetBallPosition();
        this.updateDisplay();
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);
        this.startBtn.disabled = false;
        
        alert(`Game Over! Il tuo punteggio: ${this.score} punti`);
    }
    
    setupBallDrag() {
        let isDragging = false;
        let startX, startY;
        
        this.ball.addEventListener('mousedown', (e) => {
            if (!this.gameActive) return;
            
            isDragging = true;
            startX = e.clientX - this.ball.offsetLeft;
            startY = e.clientY - this.ball.offsetTop;
            this.ball.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !this.gameActive) return;
            
            const x = e.clientX - startX;
            const y = e.clientY - startY;
            
            // Limit drag area
            const maxX = window.innerWidth - 100;
            const maxY = 400;
            
            this.ball.style.left = Math.min(Math.max(x, 50), maxX) + 'px';
            this.ball.style.top = Math.min(Math.max(y, 50), maxY) + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging || !this.gameActive) return;
            
            isDragging = false;
            this.ball.style.cursor = 'grab';
            this.shootBall();
        });
        
        // Touch support
        this.ball.addEventListener('touchstart', (e) => {
            if (!this.gameActive) return;
            
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX - this.ball.offsetLeft;
            startY = touch.clientY - this.ball.offsetTop;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging || !this.gameActive) return;
            
            const touch = e.touches[0];
            const x = touch.clientX - startX;
            const y = touch.clientY - startY;
            
            const maxX = window.innerWidth - 100;
            const maxY = 400;
            
            this.ball.style.left = Math.min(Math.max(x, 50), maxX) + 'px';
            this.ball.style.top = Math.min(Math.max(y, 50), maxY) + 'px';
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            if (!isDragging || !this.gameActive) return;
            
            isDragging = false;
            this.shootBall();
        });
    }
    
    shootBall() {
        const ballRect = this.ball.getBoundingClientRect();
        const hoopRect = this.hoop.getBoundingClientRect();
        
        // Simple collision detection
        const ballCenterX = ballRect.left + ballRect.width / 2;
        const ballCenterY = ballRect.top + ballRect.height / 2;
        
        const hoopCenterX = hoopRect.left + hoopRect.width / 2;
        const hoopCenterY = hoopRect.top + hoopRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(ballCenterX - hoopCenterX, 2) + 
            Math.pow(ballCenterY - hoopCenterY, 2)
        );
        
        // Score if ball is close to hoop
        if (distance < 80) {
            this.addScore();
        }
        
        // Reset ball position after shot
        setTimeout(() => {
            this.resetBallPosition();
        }, 500);
    }
    
    addScore() {
        this.score += 2;
        this.scoreElement.classList.add('score-pop');
        this.updateDisplay();
        
        setTimeout(() => {
            this.scoreElement.classList.remove('score-pop');
        }, 300);
    }
    
    resetBallPosition() {
        this.ball.style.left = '200px';
        this.ball.style.top = 'auto';
        this.ball.style.bottom = '100px';
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    new BasketGame();
});