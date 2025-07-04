import React from 'react'
import DocumentCard from '../components/DocumentCard'
import { Link } from 'react-router-dom';

const documentCategories = [
  {
    categoryName: 'Identity',
    imgUrl: '/payment.svg',
  },
  {
    categoryName: 'Payments',
    imgUrl: '/payment.svg',
  },
  {
    categoryName: 'Certificates',
    imgUrl: '/certificate.svg',
  },
  {
    categoryName: 'Notes',
    imgUrl: '/notes.svg',
  },
  {
    categoryName: 'Receipts',
    imgUrl: '/receipt.svg',
  },
  {
    categoryName: 'Events',
    imgUrl: '/event.svg',
  },
  {
    categoryName: 'Reports',
    imgUrl: '/report.svg',
  },
  {
    categoryName: 'Projects',
    imgUrl: '/project.svg',
  },
  {
    categoryName: 'Legal',
    imgUrl: '/legal.svg',
  },

];


const Document = () => {
  return (
    <main className='w-full '>
      <div className='flex justify-between items-center border-b py-3 px-5 border-gray-400'>
        <h2 className='text-2xl  '>Document</h2>
      </div>
      <section className='flex flex-wrap gap-8 justify-start p-5'>
        {documentCategories.map((items, i) => {
          return <Link to={`/document/${items.categoryName}`} > <DocumentCard key={i} imgurl={items.imgUrl} documentname={items.categoryName} /> </Link>
        })}
      </section>
    </main>
  )
}

export default Document