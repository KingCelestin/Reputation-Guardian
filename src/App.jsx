import { useState } from 'react'
import Anthropic from '@anthropic-ai/sdk'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [rating, setRating] = useState(3)
  const [reviewText, setReviewText] = useState('')
  const [responses, setResponses] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'reputation2024') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const copyToClipboard = async (text, index) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // iOS fallback
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  const generateResponses = async () => {
    if (!reviewText.trim()) {
      setError('Please enter a review')
      return
    }

    setLoading(true)
    setError('')
    setResponses(null)

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

      if (!apiKey) {
        throw new Error('API key not configured')
      }

      const client = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      })

      const prompt = `You are a professional business reputation manager. Generate 3 different professional responses to the following ${rating}-star review. Each response should be 4-5 sentences long.

Review: "${reviewText}"

Generate responses in the following tones:
1. Apologetic - Express genuine concern and apology
2. Solution-Focused - Acknowledge the issue and offer concrete solutions
3. Empathetic - Show understanding and emotional connection

Format your response as JSON with this structure:
{
  "apologetic": "response text here",
  "solutionFocused": "response text here",
  "empathetic": "response text here"
}

Only return valid JSON, no other text.`

      const message = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })

      const responseText = message.content[0].text
      const parsedResponses = JSON.parse(responseText)

      setResponses(parsedResponses)
    } catch (err) {
      console.error('Error generating responses:', err)
      setError('Failed to generate responses. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
        <div className="bg-[#2d2d2d] p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Reputation Guardian
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[#a0a0a0] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Access App
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Reputation Guardian</h1>
          <p className="text-[#a0a0a0]">Generate professional review responses with AI</p>
        </div>

        <div className="bg-[#2d2d2d] p-6 sm:p-8 rounded-lg shadow-xl mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Star Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl sm:text-4xl transition-all ${
                    star <= rating ? 'text-yellow-400' : 'text-[#3a3a3a]'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Review Text</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[120px]"
              placeholder="Paste the customer review here..."
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={generateResponses}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Generating Responses...' : 'Generate Responses'}
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#2d2d2d] p-6 rounded-lg shadow-xl animate-pulse">
                <div className="h-6 bg-[#3a3a3a] rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-[#3a3a3a] rounded"></div>
                  <div className="h-4 bg-[#3a3a3a] rounded"></div>
                  <div className="h-4 bg-[#3a3a3a] rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {responses && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResponseCard
              title="Apologetic"
              response={responses.apologetic}
              onCopy={() => copyToClipboard(responses.apologetic, 0)}
              copied={copiedIndex === 0}
              color="blue"
            />
            <ResponseCard
              title="Solution-Focused"
              response={responses.solutionFocused}
              onCopy={() => copyToClipboard(responses.solutionFocused, 1)}
              copied={copiedIndex === 1}
              color="purple"
            />
            <ResponseCard
              title="Empathetic"
              response={responses.empathetic}
              onCopy={() => copyToClipboard(responses.empathetic, 2)}
              copied={copiedIndex === 2}
              color="indigo"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ResponseCard({ title, response, onCopy, copied, color }) {
  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    indigo: 'border-indigo-500'
  }

  return (
    <div className={`bg-[#2d2d2d] border-l-4 ${colorClasses[color]} p-6 rounded-lg shadow-xl`}>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-[#a0a0a0] leading-relaxed mb-4">{response}</p>
      <button
        onClick={onCopy}
        className={`w-full py-2 rounded-lg font-semibold transition-colors ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white'
        }`}
      >
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}

export default App
