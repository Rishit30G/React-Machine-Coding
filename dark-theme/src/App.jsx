import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import NavBar from './components/NavBar';
import { ThemeProvider } from './theme-context';

function App() {

  return (
    <ThemeProvider>
        <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </BrowserRouter>
   </ThemeProvider>
  )
}

export default App
