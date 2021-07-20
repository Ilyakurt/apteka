import React, { useState } from 'react';
import './App.css';
import ShopHeader from './components/ShopHeader';
import ShopBody from './components/ShopBody';
import ReactDOM from 'react-dom'

function App() {
  const [items, setItems] = useState([]);

  return (
    <div>
      <ShopHeader />
      <ShopBody items={items} setItems={setItems} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
