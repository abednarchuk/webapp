import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElementChangeEvent, StripeCardElementOptions } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IACCbKvH5pODyAXigZ0QxicURdSXqARmLHv7UfY1zygrbQBlcXRuXw4xx624JsVss3RivldiGh0i0E09wQpeCXk00QRlRj6PK');

const VirtualTerminal: NextPage = () => {
  const [amount, setAmount] = useState<number>(0)
  const [cardholderName, setCardholderName] = useState<string>("")
  const [cardholderEmail, setCardholderEmail] = useState<string>("")
  const [cardError, setCardError] = useState<string>("")
  const [cardMessages, setCardMessages] = useState<string>("")
  const [processing, setProcessiong] = useState<boolean>(false)


  const stripeCardElementOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '18px',
        lineHeight: '26px'
      },
    }
  }

  function onSubmitButtonClick() {
    if (isNaN(amount)) {
      console.log('Invalid amount')
    }
    console.log(amount, cardholderName, cardholderEmail)
  }
  function onCardChange(e: StripeCardElementChangeEvent) {
    if (e.error) {
      setCardError(e.error.message)
    } else {
      setCardError("")
    }
  }
  return (
    <div className="px-3 max-w-xl mx-auto md:max-w-4xl">
      <Head>
        <title>Virtual Terminal</title>
      </Head>
      <div className="py-2">
        <h1 className="text-center text-3xl">Virtual Terminal Page</h1>
      </div>
      <hr />
      <div className={processing ? "text-center my-2" : "text-center my-2 hidden"} >
        <svg className="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
        </svg>
      </div>

      <form className="grid grid-cols-1 gap-3 my-2" noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
        <div className="block" >
          <span className="text-xl">Amount</span>
          <input type="text" className="form-input mt-1 block w-full rounded" onChange={(e) => { setAmount(parseFloat(e.target.value)) }} />
        </div>
        <div className="block" >
          <span className="text-xl">Cardholer Name</span>
          <input type="text" className="form-input mt-1 block w-full rounded" onChange={(e) => { setCardholderName(e.target.value) }} />
        </div>
        <div className="block" >
          <span className="text-xl">Cardholer Email</span>
          <input type="text" className="form-input mt-1 block w-full rounded" onChange={(e) => { setCardholderEmail(e.target.value) }} />
        </div>
        <div className="block" >
          <span className="text-xl">Card</span>
          <Elements stripe={stripePromise}>
            <CardElement onChange={onCardChange} options={stripeCardElementOptions} className='form-input mt-1 block w-full rounded' />
          </Elements>

          {cardError.length > 0 ? <div className="text-center p-1 text-white bg-red-800 text-opacity-100 rounded-b-lg"><span>{cardError}</span></div> : ""}

        </div>
        <hr />
        <button className="p-2 bg-blue-900 rounded text-white" onClick={onSubmitButtonClick}>Charge Card</button>
        <div className="text-center hidden">

        </div>
      </form>
    </div>
  )
}

export default VirtualTerminal