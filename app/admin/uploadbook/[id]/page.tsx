'use client'
import React from 'react';
import { useParams } from 'next/navigation';

const UploadBook = () => {
    const params = useParams<{ id: string }>()
    return (
        <div>
            uplioad book {params.id}
        </div>
    )
}

export default UploadBook
