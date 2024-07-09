'use client'
import React from 'react'

const ServerComponentProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

export default ServerComponentProvider
