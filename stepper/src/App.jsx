import './App.css'
import CheckoutStepper from './components/CheckoutStepper';

const CHECKOUT_STEPS = [
  {
    name: "Customer Info", 
    Component: () => <div>Provide your contact details</div>
  }, 
  {
    name: "Shipping Info", 
    Component: () => <div>Provide your shipping details</div>
  },
  {
    name: "Payment Info", 
    Component: () => <div>Provide your payment details</div>
  },
  {
    name: "Delivered", 
    Component: () => <div>Review your order</div>
  }
]


function App() {

  return (
    <div>
      <h2>Checkout</h2>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS}/>
    </div>
  )
}

export default App
