import React from 'react'
import { format } from 'date-fns'
import fs from 'fs/promises'
import path from 'path'

interface Article {
    title: string;
    summary: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    url: string;
    source: string;
    published_at: string;
    currencies: string[];
    categories: string[];
}

interface NewsData {
    date: string;
    articles: Article[];
    stats: {
        total_articles: number;
        sentiment_distribution: {
            positive: number;
            neutral: number;
            negative: number;
        };
    };
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
                    url: "#",
                    source: "example.com",
                    published_at: new Date().toISOString(),
                    currencies: ["BTC", "ETH"],
                    categories: ["general"]
                }
            ],
            stats: {
                total_articles: 1,
                sentiment_distribution: {
                    positive: 0,
                    neutral: 1,
                    negative: 0
                }
            }
        }
    }
}

export default async function Home() {
    const newsData = await getNewsData();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Daily Crypto News
                    </h1>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Latest Updates */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Updates</h2>
                                <div className="space-y-6">
                                    {newsData.articles.map((article, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                            <h3 className="font-medium text-gray-800">{article.title}</h3>
                                            <p className="text-gray-600 mt-1 text-sm">{article.summary}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <span className={`text-xs px-2 py-1 rounded ${article.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                                                    article.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {article.sentiment}
                                                </span>
                                                {article.currencies.map(currency => (
                                                    <span key={currency} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                        {currency}
                                                    </span>
                                                ))}
                                                <span className="text-xs text-gray-500 ml-auto">
                                                    {format(new Date(article.published_at), 'MMM d, h:mm a')}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    Source: {article.source}
                                                </span>
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    Read more →
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Market Overview */}
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Overview</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700">Sentiment Distribution</h3>
                                        <div className="mt-2 grid grid-cols-3 gap-2">
                                            <div className="bg-green-50 p-2 rounded">
                                                <div className="text-green-800 font-medium">
                                                    {newsData.stats.sentiment_distribution.positive}
                                                </div>
                                                <div className="text-xs text-green-600">Positive</div>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded">
                                                <div className="text-gray-800 font-medium">
                                                    {newsData.stats.sentiment_distribution.neutral}
                                                </div>
                                                <div className="text-xs text-gray-600">Neutral</div>
                                            </div>
                                            <div className="bg-red-50 p-2 rounded">
                                                <div className="text-red-800 font-medium">
                                                    {newsData.stats.sentiment_distribution.negative}
                                                </div>
                                                <div className="text-xs text-red-600">Negative</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Last updated: {format(new Date(newsData.date), 'PPpp')}
                                    </p>
                                </div>
                            </div>

                            {/* Trending Topics */}
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Trending Topics</h2>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(new Set(newsData.articles.flatMap(a => a.categories))).map(category => (
                                        <span key={category} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            #{category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 