import React from 'react'
import { format } from 'date-fns'
import fs from 'fs/promises'
import path from 'path'

interface Article {
    title: string;
    summary: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    url: string;
}

interface NewsData {
    date: string;
    articles: Article[];
}

async function getNewsData(): Promise<NewsData> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'news.json')
        const jsonData = await fs.readFile(filePath, 'utf8')
        return JSON.parse(jsonData)
    } catch (error) {
        // Fallback to dummy data if file doesn't exist
        return {
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
    }
}

export default async function Home() {
    const newsData = await getNewsData();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Daily Crypto News
                    </h1>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Latest Updates */}
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Updates</h2>
                            {newsData.articles.map((article, index) => (
                                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium text-gray-800">{article.title}</h3>
                                    <p className="text-gray-600 mt-1 text-sm">{article.summary}</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`text-sm px-2 py-1 rounded ${article.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                                            article.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {article.sentiment}
                                        </span>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-auto text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Read more →
                                        </a>
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
                                Last updated: {format(new Date(newsData.date), 'PPpp')}
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