import React, { Component } from 'react';
import './App.css';
import ShopHeader from './components/ShopHeader';
import ShopBody from './components/ShopBody';
import ReactDOM from 'react-dom'
import {Provider} from "mobx-react";
import ItemStore from "./stores/ItemStore";




class App extends Component {

    render(){
        const store = new ItemStore();

        const stores = {
            ShopMain: store,
        }
        return (
            <Provider {...stores}>
                <div className={"App"}>
                    <ShopHeader />
                    <ShopBody />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render((
    <App />
), document.getElementById('root'));

// function App() {
//   const [items, setItems] = useState([]);
//
//   return (
//     <div>
//       <ShopHeader />
//       <ShopBody items={items} setItems={setItems} />
//     </div>
//   );
// }