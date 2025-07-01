import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to UKAY2 – your trusted online destination for quality second-hand fashion.</p>
          <p>At UKAY2, we believe that style doesn’t have to come at a high cost. Our store is built on the idea of making fashion affordable, sustainable, and accessible for everyone. We carefully curate a wide range of pre-loved clothing, allowing our customers to discover unique pieces while making environmentally conscious choices.</p>
          <p>Whether you're shopping for everyday essentials, vintage finds, or trendy outfits, UKAY2 offers something special for every style and personality. Each item in our collection is handpicked and quality-checked to ensure it meets our standards.</p>
          <p>Thank you for supporting UKAY2 — where fashion meets sustainability.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to give clothes a second life and help you express your individuality without breaking the bank.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>At UKAY2, we are committed to delivering only the best pre-loved fashion. Every item in our collection goes through a careful inspection process to ensure it meets our high standards for quality, cleanliness, and authenticity.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Shopping with UKAY2 is designed to be simple, fast, and hassle-free. We understand that your time is valuable, so we’ve made every step — from browsing to checkout — as smooth as possible.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>At UKAY2, our commitment to excellent customer service is at the heart of everything we do. Whether you have a question about a product, need help with an order, or simply want style advice, our dedicated support team is here to help—friendly, responsive, and always ready to assist. We believe that shopping should be a smooth and enjoyable experience from start to finish, and we're always just a message away to ensure your satisfaction.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
