import './App.css'
import Tabs from './component/Tabs';

const tabs = [
  { label: 'Tab 1', content: <div>Content of Tab 1</div> },
  { label: 'Tab 2', content: <div>Content of Tab 2</div> },
  { label: 'Tab 3', content: <div>Content of Tab 3</div> },
];

function App() {
  return (
    <div className='app'>
      <h1>Tabs Component</h1>
      <Tabs tabs={tabs} />
    </div>
  )
}

export default App
