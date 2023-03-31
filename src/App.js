
import './App.css';
import '../src/i18next/config';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import { PageRouter } from './Router/PageRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import fx from 'money';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='Header'>
          <div className='Container'>
            <Header/>
          </div>
        </div>
        <div className='Content'>
            <div className='Container'>
              <PageRouter/>
            </div>  
        </div>
        <div className='Footer'>
          <div className='Container'>
            <Footer/>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
