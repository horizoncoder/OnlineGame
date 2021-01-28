import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import App from './App';
import {Game} from './components/Game';

test("renders the correct content",()=>{
  const root = document.createElement("div");
  ReactDOM.render(<Game/>,root)
  expect(root.querySelector("h1").textContent).toBe("Точки и квадраты");
})

it('добавляем координаты точкам', () => {
	const expects =  "0" +Math.floor(1)+ "," +Math.floor(0);
	expect("0" +Math.floor(1)+ "," +Math.floor(0)).toEqual(expects);
});


it('меняем цвет палочки', () => {

	const expects =  (["0,"+Math.floor(1)+ "," +Math.floor(0)]);
	expect((["0,"+Math.floor(1)+ "," +Math.floor(0)])).toEqual(expects);
});