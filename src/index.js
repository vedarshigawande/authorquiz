import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz.js';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const data = [
    {
        name : 'Dr. A.P.J. Kalam',
        imageUrl : 'images/authors/Dr-A-P-J-abdul-Kalam.jpg',
        books : ['Ignited Mind','Wings Of Fire','India 2020']
    },
    {
        name : 'Amish-Tripathi',
        imageUrl : 'images/authors/Amish-Tripathi.jpg',
        books : ['The Immortals of Meluha','The Secret Of Nagas','Sita: Warrior Of Mithila']
    },
    {
        name : 'Chetan-Bhagat',
        imageUrl : 'images/authors/Chetan-Bhagat.jpg',
        books : ['One Indian Girl','Half Girlfriend','2 States']
    },
    {
        name : 'Gulzar',
        imageUrl : 'images/authors/Gulzar.jpg',
        books : ['Triveni','Pluto','Kitab']
    },
    {
        name : 'Shiv-Khera',
        imageUrl : 'images/authors/Shiv-Khera.jpg',
        books : ['You Can Win','You Can Sell','You Can Achieve More']
    },
];

const getTurnData = (data) => {
    const allBooks = data.reduce(function(p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: data.find((author) =>
             author.books.some((title) => 
                title === answer))
    }
}


const reducer = (state = { data, turnData: getTurnData(data), highlight: ''}, action) => {
    switch (action.type) {
        case 'ANSWER_SELECTED':
          const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
          return Object.assign({}, state, {
              highlight: isCorrect ? 'correct' : 'wrong'
          });
        case 'CONTINUE':
          return Object.assign({}, state, {
              highlight: '',
              turnData: getTurnData(state.data)
          });
        default: return state;
          
    }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
    <BrowserRouter>
      <ReactRedux.Provider store={store} >
        <React.Fragment>
            <Route exact path="/" component = { AuthorQuiz } />
        </React.Fragment>
      </ReactRedux.Provider>
    </BrowserRouter>
    , document.getElementById('root'));

registerServiceWorker();
