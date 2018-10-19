import Colors from './colors';

const apiUrl = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes/';
const ul = document.getElementById('quotes');
const btnNew = document.getElementById('newQuote');

let newNode = el => document.createElement(el);
let append = (parent, el) => parent.append(el);

let generateQuote = () => {

  fetch(apiUrl)
    .then(res => res.json())
    .then(quotes => {

      quotes.forEach(quote => {
        let li = newNode('li');
        let bq = newNode('blockquote');
        let q = newNode('q');
        let cite = newNode('cite');

        q.innerHTML = quote.quote;
        cite.innerHTML = quote.author;

        append(bq, q);
        append(bq, cite);
        append(li, bq);
        append(ul, li);
      })
    })
};

generateQuote();

btnNew.addEventListener('click', () => generateQuote());