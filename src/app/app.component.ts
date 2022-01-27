import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch';


  min: any = '00';
  sec: any = '00';
  milli: any = '00';

  @Input() start!: boolean;
  @Input() showTimerControls!: boolean;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    }
    else{
      this.clearTimer();
    }
  }

  counter!: number;
  timerRef!: number;
  running: boolean = false;
  startText = 'Start';

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milli = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.min = Math.floor(this.counter / 60000);
        this.sec = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
      
        if (Number(this.min) < 10) {
          this.min = '0' + this.min;
        } else {
          this.min = '' + this.min;
        }
        if (Number(this.milli) < 10) {
          this.milli = '0' + this.milli;
        } else {
          this.milli = '' + this.milli;
        }
        if (Number(this.sec) < 10) {
          this.sec = '0' + this.sec;
        } else {
          this.sec = '' + this.sec;
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }


  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = 0;
    this.milli = '00',
    this.sec = '00',
    this.min = '00';
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
  ngOnInit() {
  }

}
