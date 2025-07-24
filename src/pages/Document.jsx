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
    <main className='w-full h-[calc(100vh_-_76px)] overflow-auto  relative'>
      <div className='flex justify-between items-center border-b py-3 px-5 bg-white dark:bg-gray-900 border-gray-400 dark:border-gray-600 sticky top-0 right-0 z-20'>
        <h2 className='text-xl md:text-2xl'>Document</h2>
      </div>
      <section className='grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8 justify-start  p-5'>
        {documentCategories.map((items, i) => {
          return <Link key={i} to={`/document/${items.categoryName}`} > <DocumentCard key={i} imgurl={items.imgUrl} documentname={items.categoryName} /> </Link>
        })}
      </section>
    </main>
  )
}

export default Document