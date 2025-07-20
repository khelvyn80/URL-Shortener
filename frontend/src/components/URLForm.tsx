import axios from "axios"
import { useState } from "react"

export default function URLForm() {
	const [url, setUrl] = useState("")
	const [shortCode, setShortCode] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await axios.post("http://localhost:8000/shorten", { original_url: url })
			setShortCode(res.data.short_code)
		} catch (err) {
			alert("Failed to shorten URL")
		}
	}

	return (
		<div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
			<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">🔗 URL Shortener</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="Enter your long URL"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
				>
					Shorten URL
				</button>
			</form>

			{shortCode && (
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600 mb-2">Your short URL:</p>
					<a
						href={`/${shortCode}`}
						className="text-blue-600 text-lg font-semibold hover:underline break-all"
					>
						{`${window.location.origin}/${shortCode}`}
					</a>
				</div>
			)}
		</div>
	)
}
