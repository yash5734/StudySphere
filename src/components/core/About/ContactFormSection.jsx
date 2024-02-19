import React from 'react'
import ContactUsForm from '../ContactUs/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <h1 className='text-4xl font-inter text-center text-richblack-25'>Get in touch</h1>
      <p className='text-richblack-300'>We'd love to here for you, Please fill out this form.</p>
      <ContactUsForm/>
    </div>
  )
}

export default ContactFormSection
