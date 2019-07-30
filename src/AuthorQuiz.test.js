import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books : ['2 State','3 idiots','Ignited Mind','Wings Of Fire','India 2020'],
    authors: {
      name : 'Dr. A.P.J. Kalam',
      imageUrl : 'images/authors/Dr-A-P-J-abdul-Kalam.jpg',
      imageSource : 'Google',
      books : ['Ignited Mind','Wings Of Fire','India 2020']
    },
  },
  highlight: 'none'
}


describe("Author Quiz", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected= {() => {} } />, div);
  });

  describe("When no answer has been selected", ()=> {
    let wrapper;
    beforeAll(()=> {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected= {()=> {}} />);
    });

    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });
  });  
  
  describe('When the wrong answer has been selected', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'})) } onAnswerSelected= {() => {}} />
      );
    });
      
    it ('should have a red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });

  describe('When the correct answer has been selected', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'})) } onAnswerSelected= {() => {}} />
      );
    });
      
    it ('should have a red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
    });
  });
  
  describe("When the first answer is selected", ()=> {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(()=> {
      wrapper = mount (
        <AuthorQuiz {...state} onAnswerSelected = {handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');  
      });

      it("onAnswerSelected should be called", ()=> {
        expect(handleAnswerSelected).toHaveBeenCalled();
      });

      it("should receive 2 State", ()=> {
        expect(handleAnswerSelected).toHaveBeenCalledWith("2 State");
      });
  });

});
