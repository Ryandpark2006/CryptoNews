import React from 'react'
import { format } from 'date-fns'

async function getNewsData() {
    // In production, this will read from the generated JSON file
    const dummyData = {
        date: new Date().toISOString(),
        articles: [
            {
                title: "Welcome to Crypto News",
                summary: "This is a placeholder article. Real news will be automatically generated daily.",
                sentiment: "neutral",
                url: "#"
            }
        ]
    }
    return dummyData
}

export default async function Home() {
    const newsData = await getNewsData();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Welcome to Daily Crypto News
                    </h1>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Latest Updates */}
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Updates</h2>
                            {newsData.articles.map((article, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-medium text-gray-800">{article.title}</h3>
                                    <p className="text-gray-600 mt-1">{article.summary}</p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-sm text-gray-500">Sentiment: {article.sentiment}</span>
                                        <a href={article.url} className="ml-auto text-blue-600 hover:text-blue-800 text-sm">Read more →</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Market Overview */}
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Overview</h2>
                            <p className="text-gray-600">
                                Track the latest market trends and cryptocurrency prices.
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                Last updated: {new Date(newsData.date).toLocaleString()}
                            </p>
                        </div>

                        {/* Trending Topics */}
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Trending Topics</h2>
                            <p className="text-gray-600">
                                Discover what's trending in the crypto world today.
                            </p>
                            <div className="mt-4">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                                    #Bitcoin
                                </span>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                                    #Ethereum
                                </span>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                                    #DeFi
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 