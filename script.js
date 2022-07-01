// class Human {
//   constructor(props) {
//     this.name = props.name
//     this.age = props.age
//     this.country = props.country
//   }
//   intraduce() {
//     return `Hello my name is ${this.name}. I'm ${this.age} years old`
//   }
//   speakAboutSelf() {
//     const year = new Date().getFullYear() - this.age
//     return `I was born in ${this.country} in ${year}`
//   }
// }

// class Woman extends Human {
//   constructor(props) {
//     super(props)
//     this.gender = "Female"
//     this.children = props.children
//   }
//   cook(){
//     return `I'm cooking...`
//   }
// }

// const bekzod = new Human({
//   name: 'Bekzod',
//   age: 21,
//   country: 'Uzbekiston',
//   job: 'HR'
// })
// const dilshod = new Human({
//   name: 'Dilshod',
//   age: 20,
//   country: 'Uzbekiston',
// })

// class Man extends Human {
//   constructor(props) {
//     super(props)
//     this.gander = 'Male'
//     this.job = props.job
//   }
//   work() {
//     return `My is job ${this.job} adn now I working...`
//   }
// }

// const aziz = new Man({
//   name: 'Aziz',
//   age: 19,
//   country: 'Russian',
//   job: 'Front-end'
// })

// const malika = new Woman({
//   name: 'Malika',
//   age: 45,
//   country: 'China',
//   children: [bekzod, dilshod, aziz]
// })

// console.log(bekzod);
// console.log(dilshod);
// console.log(aziz);

// const el = document.querySelector('.header__content h1')
// const text = el.innerHTML
// el.innerHTML = ""

// const writeLetter = (i) => {
//   el.innerHTML += text[i]
//   if (el.innerHTML === text) return
//   setTimeout(() => writeLetter(i + 1), 200)
// }
// writeLetter(0)

class Typing {
  constructor(el, interval, delay = 0, loop = false) {
    this.el = document.querySelector(el);
    this.text = this.el.innerHTML.trim();
    this.el.innerHTML = "";
    this.interval = interval;
    this.loop = loop;

    setTimeout(() => {
      this.writeLetter(0);
    }, delay);
  }

  writeLetter(i) {
    this.el.innerHTML += this.text[i];
    if (this.el.innerHTML === this.text) {
      if (this.loop) setTimeout(() => this.rewrite(), 5000);
      return;
    }
    setTimeout(() => {
      this.writeLetter(++i);
    }, this.interval);
  }

  rewrite() {
    const text = this.el.innerHTML;
    this.el.innerHTML = text.slice(0, text.length - 1);
    if (this.el.innerHTML.length == 0) {
      setTimeout(() => this.writeLetter(0), 5000);
      return;
    }
    setTimeout(() => this.rewrite(), this.interval / 2);
  }
}


new Typing('.header__content h1', 200, 0, true)
new Typing('.header__content p', 100, 500)
new Typing('.info__scroll-desc', 50, 1000)

class Scroll {
  constructor({ selector, top, unit }) {
    this.el = document.querySelector(selector)
    this.top = top
    this.unit = unit

    this.el.style.position = 'fixed'

    this.scroll()

    window.onscroll = () => this.scroll()
  }

  scroll() {
    const scroll = this.calculateScroll()
    if (scroll - window.pageYOffset > 0) {
      this.el.style.top = `${scroll - window.pageYOffset}px`
    } else {
      this.el.style.top = `0px`
    }
  }

  calculateScroll() {
    if (this.unit === 'px') {
      return this.top > 0 ? this.top : 0
    } else {
      return (window.innerHeight / 100) * this.top - this.el.clientHeight
    }
  }
}

const navbar = new Scroll({
  selector: '.header__nav',
  top: 100,
  unit: '%',
})