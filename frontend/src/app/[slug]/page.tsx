// app/[slug]/page.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'

export default function RedirectSlug({ params }: { params: { slug: string } }) {
	const router = useRouter()

	useEffect(() => {
		axios.get(`http://localhost:8000/${params.slug}`)
			.then(res => {
				window.location.href = res.data.original_url
			})
			.catch(() => {
				alert('Short URL not found.')
				router.push('/')
			})
	}, [params.slug, router])

	return <p>Redirecting...</p>
}
