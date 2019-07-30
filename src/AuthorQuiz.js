import React from 'react';
import { connect } from 'react-redux'; 
import './App.css';
import './bootstrap.min.css';
import Header from './component/Header';
import Book from './component/Books';
import Footer from './component/Footer';

const Turn = ({author, books, highlight, onAnswerSelected}) => {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }


  return (
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
      </div>
    </div>
  );
}

const Continue = ({ show, onContinue }) => {
  return (
    <div className="row continue">
    { show
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue} >Continue</button>
        </div>
    : null }
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAnswerSelected: (answer) => {
      dispatch({type: 'ANSWER_SELECTED', answer});
    },
    onContinue: () => {
      dispatch({type: 'CONTINUE' });
    }
  };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps) (function ({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className = "container-fluid">
        <Header />
        <Turn {...turnData} highlight = {highlight} onAnswerSelected= {onAnswerSelected} />
        <Continue show={highlight === 'correct' } onContinue={onContinue} />
        <Footer />
      </div>
    );
  
});

export default AuthorQuiz;
