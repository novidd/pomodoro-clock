import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break: 5,
      session: 25,
      breakMin: 5,
      sessionMin: 25,
      sec: 60,
      counter: 0,
      timeOutId: undefined,
      event: "session",
      timerIsOn: false,
    };

    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }
  handleBreak(e) {
    if (!this.state.timerIsOn) {
      switch (e.target.id) {
        case "break-increment":
          if (this.state.break < 60) {
            this.setState({
              break: this.state.break + 1,
              breakMin: this.state.break + 1,
            });
          }
          if (this.state.event === "break") {
            this.setState({
              sec: 60,
            });
          }
          break;
        case "break-decrement":
          if (this.state.break > 1) {
            this.setState({
              break: this.state.break - 1,
              breakMin: this.state.break - 1,
            });
          }
          if (this.state.event === "break") {
            this.setState({
              sec: 60,
            });
          }
          break;
        default:
          return;
      }
    }
  }
  handleSession(e) {
    if (!this.state.timerIsOn) {
      switch (e.target.id) {
        case "session-increment":
          if (this.state.session < 60) {
            this.setState({
              session: this.state.session + 1,
              sessionMin: this.state.session + 1,
            });
          }
          if (this.state.event === "session") {
            this.setState({
              sec: 60,
            });
          }
          break;
        case "session-decrement":
          if (this.state.session > 1) {
            this.setState({
              session: this.state.session - 1,
              sessionMin: this.state.session - 1,
              sec: 60,
            });
          }
          if (this.state.event === "session") {
            this.setState({
              sec: 60,
            });
          }
          break;
        default:
          return;
      }
    }
  }
  resetValues() {
    clearTimeout(this.state.timeOutId);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      break: 5,
      session: 25,
      sessionMin: 25,
      breakMin: 5,
      sec: 60,
      event: "session",
      timerIsOn: false,
    });
  }
  handleTimer() {
    if (this.state.timerIsOn) {
      //Stop Timer
      this.setState({
        timerIsOn: false,
      });
      this.stopTimer();
    } else if (!this.state.timerIsOn) {
      //Start Timer
      this.setState({
        timerIsOn: true,
      });
      let timeOut = setTimeout(this.runTimer, 1000);
      this.setState({
        timeOutId: timeOut,
      });
    }
  }
  runTimer() {
    if (this.state.sessionMin === 0 && this.state.sec === 0) {
      this.setState({
        event: "break",
        sessionMin: this.state.session,
        breakMin: this.state.break,
      });
      document.getElementById("beep").play();
      let timeOut = setTimeout(this.runTimer, 1000);
      this.setState({
        timeOutId: timeOut,
      });
      return;
    } else if (this.state.breakMin === 0 && this.state.sec === 0) {
      this.setState({
        event: "session",
        sessionMin: this.state.session,
        breakMin: this.state.break,
      });
      document.getElementById("beep").play();
      let timeOut = setTimeout(this.runTimer, 1000);
      this.setState({
        timeOutId: timeOut,
      });
      return;
    }
    if (this.state.sec === 0) {
      this.setState({
        sec: 60,
      });
    }
    if (this.state.sec === 60 && this.state.event == "session") {
      this.state.sessionMin--;
    } else if (this.state.sec === 60 && this.state.event == "break") {
      this.state.breakMin--;
    }
    this.state.sec--;
    let timeOut = setTimeout(this.runTimer, 1000);
    this.setState({
      timeOutId: timeOut,
    });
  }
  stopTimer() {
    clearTimeout(this.state.timeOutId);
    this.setState({
      timerIsOn: false
    });
  }
  render() {
    return (
      <div id="clock">
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        <div id="timer-wrapper">
          <div id="labels-timer-wrapper">
            <div id="break-wrapper" className="labels-inner-wrapper">
              <h1 id="break-label">Break Length</h1>
              <div className="button-wrapper">
                <button
                  onClick={this.handleBreak}
                  className="btn"
                  id="break-increment"
                >
                  +
                </button>
                <h2 id="break-length" value="">
                  {this.state.break}
                </h2>
                <button
                  onClick={this.handleBreak}
                  className="btn"
                  id="break-decrement"
                >
                  -
                </button>
              </div>
            </div>
            <div id="session-wrapper" className="labels-inner-wrapper">
              <h1 id="session-label">Session Length</h1>
              <div className="button-wrapper">
                <button
                  onClick={this.handleSession}
                  className="btn"
                  id="session-increment"
                >
                  +
                </button>
                <h2 id="session-length">{this.state.session}</h2>
                <button
                  onClick={this.handleSession}
                  className="btn"
                  id="session-decrement"
                >
                  -
                </button>
              </div>
            </div>
            <div>
            <div id="time-wrapper">
              <h2 id="timer-label">{this.state.event}</h2>
              <h1 id="time-left">
                {this.state.event === "session" && this.state.sessionMin < 10
                  ? "0"
                  : ""}
                {this.state.event === "break" && this.state.breakMin < 10
                  ? "0"
                  : ""}
                {this.state.timerIsOn && this.state.event === "session"
                  ? this.state.sessionMin
                  : this.state.event === "session"
                  ? this.state.sessionMin
                  : ""}
                {this.state.timerIsOn && this.state.event === "break"
                  ? this.state.breakMin
                  : this.state.event === "break"
                  ? this.state.breakMin
                  : ""}
                :{this.state.sec < 10 ? "0" : ""}
                {this.state.timerIsOn && this.state.sec === 60
                  ? "00"
                  : this.state.timerIsOn
                  ? this.state.sec
                  : this.state.sec !== 60 ? this.state.sec : "00"}
              </h1>
            </div>
              <div id="timer-button-wrapper">
                <button
                  onClick={this.handleTimer}
                  className="timer-btn"
                  id="start_stop"
                >
                  {!this.state.timerIsOn && (
                    <i className="fas fa-play-circle fa-3x"></i>
                  )}
                  {this.state.timerIsOn && (
                    <i className="fas fa-pause-circle fa-3x"></i>
                  )}
                </button>
                <button onClick={this.resetValues} className="timer-btn" id="reset">
                  <i className="fas fa-undo fa-3x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
