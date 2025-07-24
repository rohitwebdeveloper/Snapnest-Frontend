import React, { useEffect, useRef } from 'react'

const ClickOutsideWrapper = ({ children, visible, setvisible }) => {
    const wrapperRef = useRef(null)

    useEffect(() => {
        const handleclickoutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setvisible(false)
            }
        }
        if (visible) {
            document.addEventListener('mousedown', handleclickoutside)
        }
        return () => document.removeEventListener('mousedown', handleclickoutside)
    }, [setvisible, visible])

    if (!visible) return null;

    return (
        <div ref={wrapperRef}>
            {children}
        </div>
    )
}

export default ClickOutsideWrapper