import Colors from './colors';

const apiUrl = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes/';
const ul = document.getElementById('quotes');
const btnNew = document.getElementById('newQuote');
let allQuotes = [];

let newNode = el => document.createElement(el);
let append = (parent, el) => parent.append(el);

let setQuotesHeight = () => 
  allQuotes.forEach(quote => quote.style.height = `${window.innerHeight}px`);

let randomColor = () => {
  let colors = Object.keys(Colors);
  let id = Math.round(Math.random() * colors.length);

  return colors[id];
}

let generateQuote = () => {

  fetch(apiUrl)
    .then(res => res.json())
    .then(quotes => {

      quotes.forEach(quote => {
        let li = newNode('li');
        let bq = newNode('blockquote');
        let q = newNode('p');
        let cite = newNode('cite');

        q.innerHTML = quote.quote;
        cite.innerHTML = quote.author;

        let rndClr = randomColor();
        li.style.background = Colors[rndClr][0];
        li.style.color = Colors[rndClr][1];

        append(bq, q);
        append(bq, cite);
        append(li, bq);
        append(ul, li);

        allQuotes = [...ul.getElementsByTagName('li')];
        setQuotesHeight();

        window.scrollTo(0, document.body.scrollHeight);
      })
    })
};

generateQuote();
btnNew.addEventListener('click', () => generateQuote());

window.addEventListener('resize', setQuotesHeight);