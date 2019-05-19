class Timer {
  constructor(id) {
    this.id = id;
    this.timerDiv = document.getElementById(id);
    this.timerDiv.innerHTML = "00:00:00";
    this.seconds = 0;
  }

  setTime() {
    this.seconds += 1;
    let hour = Math.floor(this.seconds / 3600);
    let minute = Math.floor(this.seconds / 60);
    let sec = this.seconds % 60;
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    this.timerDiv.innerHTML = hour + ":" + minute + ":" + sec;
  }
  start() {
    setInterval(() => this.setTime(), 1000);
  }
}
