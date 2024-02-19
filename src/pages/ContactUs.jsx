import React from 'react'
import ContacDetails from '../components/core/ContactUs/ContactDetails'
import ContactForm from '../components/core/ContactUs/ContactForm'

const ContactUs = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContacDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
        </div>
          
    </div>
  )
}

export default ContactUs
