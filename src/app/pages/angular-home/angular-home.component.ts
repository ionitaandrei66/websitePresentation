import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-angular-home',
  templateUrl: './angular-home.component.html',
  styleUrls: ['./angular-home.component.scss'],
  animations: [
    trigger('flyBall', [
      state(
          'small',
          style({ transform: 'scale(0.5)', opacity: 0.5 })
      ),
      state('normal', style({ transform: 'scale(1)', opacity: 1 })),
      transition('small <=> normal', animate('200ms ease-out')),
    ]),
  ],
})
export class AngularHomeComponent implements OnInit,AfterViewInit{
  ballPositionX = 0;
  ballPositionY = 0;
  ballDirectionX = 1;
  ballDirectionY = 1;
  ballDragged = false;
  ballSizeState = 'normal';
  ballSpeed = 5; // Change this value to adjust speed

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  // Start dragging the ball
  startDragging(event: MouseEvent) {
    this.ballDragged = true;
    document.addEventListener('mousemove', this.dragBall);
  }

  // Stop dragging the ball
  stopDragging() {
    this.ballDragged = false;
    document.removeEventListener('mousemove', this.dragBall);
  }

  // Drag the ball based on mouse movement
  dragBall = (event: MouseEvent) => {
    this.ballPositionX = event.clientX;
    this.ballPositionY = event.clientY;
  };
  moveBall() {
    if (!this.ballDragged) {
      this.ngZone.run(() => {
        this.ballPositionX += this.ballSpeed * this.ballDirectionX;
        this.ballPositionY += this.ballSpeed * this.ballDirectionY;

        // Check for collision with walls
        if (this.ballPositionX < 0 || this.ballPositionX > window.innerWidth) {
          this.ballDirectionX *= -1;
        }
        if (this.ballPositionY < 0 || this.ballPositionY > window.innerHeight) {
          this.ballDirectionY *= -1;
        }
      });
    }
  }

// In ngOnInit or appropriate lifecycle hook, start the ball movement loop
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.ngZone.run(() => {
          this.moveBall();
        });
      }, 16); // 16ms ~ 60fps
    });
  }
}
