'use client'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Admin = () => {

    const { admin } = useAuth()
    if (!admin) return <h1>Access Denied</h1>

    return (
        <div>
            This is admin page
        </div>
    )
}

export default Admin
