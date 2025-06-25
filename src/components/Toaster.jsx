import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToasterProvider = ({ children }) => {
    return (
        <>
            {children}
            <Toaster
                position="botton-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}

                toastOptions={{
                    duration: 5000,
                    removeDelay: 1000,

                    style: {
                        background: '#f9fafb', // gray-100
                        color: '#111827',       // gray-900
                        border: '1px solid #e5e7eb', // gray-200
                        padding: '12px 16px',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    },

                    success: {
                        duration: 3000,
                        style: {
                            background: '#ecfdf5', // green-50
                            color: '#065f46',      // green-700
                            border: '1px solid #d1fae5',
                        },
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#ffffff',
                        },
                    },

                    error: {
                        style: {
                            background: '#fef2f2', // red-50
                            color: '#991b1b',
                            border: '1px solid #fecaca',
                        },
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff',
                        },
                    },

                    loading: {
                        style: {
                            background: '#eff6ff', // blue-50
                            color: '#1e40af',
                            border: '1px solid #bfdbfe',
                        },
                        iconTheme: {
                            primary: '#3b82f6',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />
        </>
    )
}

export default ToasterProvider
