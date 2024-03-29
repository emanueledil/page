import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {

  cacti: { x: number }[] = [];
  isJumping = false;
  points = 0;
  intervalId!: NodeJS.Timer
  started = false;

  constructor() { }

  ngOnInit() {

    this.clearIntervalGame();
  }

  startGame(){
    this.intervalId =  setInterval(() => {
      if (Math.random() < 0.01) {
        this.cacti.push({ x: 600 });
      }

      this.cacti.forEach(cactus => {
        cactus.x -= 5;
      });
      const numberOfCactiBefore =  this.cacti.length
      this.cacti = this.cacti.filter(cactus => cactus.x > -20);
      const numberOfCactiAfter =  this.cacti.length

      if(numberOfCactiAfter<numberOfCactiBefore){
        this.points++;
      }

      if (this.isColliding()) {
        this.clearIntervalGame();
        alert('Game Over');
        this.resetGame();
      }
    }, 20);
  }

  screenClick(){
    if(this.started){
      this.jump()
    }else{
      this.startGame();
      this.started = true;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      setTimeout(() => {
        this.isJumping = false;
      }, 500);
    }
  }

  clearIntervalGame(){
    this.intervalId && clearInterval(this.intervalId)

  }

  isColliding() {
    const dinosaur = document.querySelector('.dinosaur') as HTMLElement;
    const dinosaurRect = dinosaur.getBoundingClientRect();

    const cactusElements = document.querySelectorAll('.cactus') as NodeListOf<HTMLElement>;

    for (let i = 0; i < cactusElements.length; i++) {
      const cactusRect = cactusElements[i].getBoundingClientRect();
      if (
        dinosaurRect.bottom >= cactusRect.top &&
        dinosaurRect.right >= cactusRect.left &&
        dinosaurRect.left <= cactusRect.right
      ) {
        return true;
      }
    }

    return false;
  }

  resetGame() {
    this.cacti = [];
    this.points = 0;
    this.started = false;
  }
}
