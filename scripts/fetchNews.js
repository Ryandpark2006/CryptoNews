const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function fetchNews() {
    try {
        // Get API key from environment variable
        const apiKey = process.env.CRYPTO_PANIC_API_KEY;
        if (!apiKey) {
            throw new Error('CRYPTO_PANIC_API_KEY environment variable is not set');
        }

        // Fetch news from CryptoPanic API
        const response = await axios.get('https://cryptopanic.com/api/v1/posts/', {
            params: {
                auth_token: apiKey,
                kind: 'news',
                filter: 'hot',
                public: true,
                regions: 'en'
            }
        });

        // Process and format the news data
        const articles = response.data.results.map(article => ({
            title: article.title,
            summary: article.metadata?.description || 'No summary available',
            url: article.url,
            sentiment: article.votes?.positive > article.votes?.negative ? 'positive' :
                article.votes?.negative > article.votes?.positive ? 'negative' : 'neutral',
            published_at: article.published_at
        }));

        // Create the data object
        const newsData = {
            date: new Date().toISOString(),
            articles: articles.slice(0, 10) // Keep only top 10 articles
        };

        // Ensure the data directory exists
        const dataDir = path.join(process.cwd(), 'public', 'data');
        await fs.mkdir(dataDir, { recursive: true });

        // Write to JSON file
        await fs.writeFile(
            path.join(dataDir, 'news.json'),
            JSON.stringify(newsData, null, 2)
        );

        console.log('News data successfully fetched and saved');
    } catch (error) {
        console.error('Error fetching news:', error);
        process.exit(1);
    }
}

fetchNews(); 