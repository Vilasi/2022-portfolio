//Saving comments for future tinkering of this script.

class TxtType {
  // The below is our single call
  // TxtType(<p class='typewrite'...</p>, JSON.parse('Array of things to say'), 2000)
  constructor(el, scrollingText, period) {
    this.el = el;
    this.scrollingText = scrollingText;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    //Calls .tick() upon new TxtType instantiation
    this.tick();
    this.isDeleting = false;
    this.counter = 0;
  }
  tick() {
    //[0] is initial value
    //This cycles from 0, scrollingText.length - 1. The value of loopNum increases forever, but scrollingText.length always stays the same
    let i = this.loopNum % this.scrollingText.length;
    // console.log(i);
    //on first invocation, fullTxt = TxtType.scrollingText[0]
    let fullTxt = this.scrollingText[i];

    if (this.isDeleting) {
      //on each tick() call, this.txt = fullTxt with one letter cut off the end, until it equals 0
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      //on first invocation, this.txt = ''
      //txt.length = 0 to start, so fullTxt.substring(0, 1)
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Set element.innerHTML to the below
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    //Randomizes the time between keystroke - more natural potentially. Think about re-adding
    // let delta = 200 - Math.random() * 250;
    let delta = 75;

    //Function happens twice as fast per tick then deleting
    if (this.isDeleting) {
      delta /= 2;
    }

    //period between starting/deleting new scrollingText
    //when this.text === fullTxt set the setTimeout function ms to 2000ms (period variable, as grabbed from the html attribute)
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      //The pause between full deleting and starting the next word = 500ms
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    //this.tick() is going to keep getting called recursively forever
    setTimeout(() => {
      this.tick();
    }, delta);
  }
}

window.onload = function () {
  const domElements = document.getElementsByClassName('typewrite');

  for (let i = 0; i < domElements.length; i++) {
    let scrollingText = domElements[i].getAttribute('data-type');
    let period = domElements[i].getAttribute('data-period');

    if (scrollingText) {
      //TxtType(<p class='typewrite'...</p>, JSON.parseArray of things to say'), 2000)
      new TxtType(domElements[i], JSON.parse(scrollingText), period);
    }
  }
  // INJECT CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  // css.innerHTML = '.typewrite';
  document.body.appendChild(css);
};
