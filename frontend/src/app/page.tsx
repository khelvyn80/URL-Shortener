'use client'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [url, setUrl] = useState('')
    const [shortCode, setShortCode] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:8000/shorten', { original_url: url })
        setShortCode(res.data.short_code)
    }

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">🔗 URL Shortener</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter a long URL"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Shorten URL
                    </button>
                </form>
                {shortCode && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">Your short URL:</p>
                        <a
                            href={`/${shortCode}`}
                            className="text-blue-600 hover:underline break-words"
                            target="_blank"
                        >
                            {`${window.location.origin}/${shortCode}`}
                        </a>
                    </div>
                )}
            </div>
        </main>
    )
}
