'use client'
import React from 'react';
import { useParams } from 'next/navigation';

const EditBook = () => {
    const params = useParams<{ id: string }>()
    return (
        <div>
            This is Edit book {params.id}
        </div>
    )
}

export default EditBook
