import React from 'react'
import DocumentCard from '../components/DocumentCard'

// const imgurls = [
//   '/identity',
//   ''
// ]

const Document = () => {
  return (
    <main className='w-full '>
        <div className='flex justify-between items-center border-b py-3 px-5 border-gray-400'>
            <h2 className='text-2xl  '>Document</h2>
        </div>
        <section className='flex flex-wrap gap-8 justify-start p-5'>
           <DocumentCard imgurl='/identity.svg' documentname='Identity' />
           <DocumentCard imgurl='/payment.svg' documentname='Payments' />
           <DocumentCard imgurl='/certificate.svg' documentname='Certificates' />
           <DocumentCard imgurl='/notes.svg' documentname='Notes' />
           <DocumentCard imgurl='/receipt.svg' documentname='Receipts' />
           <DocumentCard imgurl='/event.svg' documentname='Events' />
           <DocumentCard imgurl='/report.svg' documentname='Reports' />
           <DocumentCard imgurl='/project.svg' documentname='Projects' />
           <DocumentCard imgurl='/legal.svg' documentname='Legal' />
        </section>
    </main>
  )
}

export default Document