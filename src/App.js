
import './App.css';
import '../src/i18next/config';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import { PageRouter } from './Router/PageRouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {motion} from 'framer-motion';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <motion.div className='Header'
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.8
        }}
        >
          <div className='Container'>
            <Header/>
          </div>
        </motion.div>
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
