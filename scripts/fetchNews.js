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

        console.log('Fetching news from CryptoPanic...');

        // Fetch news from CryptoPanic API
        const response = await axios.get('https://cryptopanic.com/api/v1/posts/', {
            params: {
                auth_token: apiKey,
                kind: 'news',
                filter: 'hot',
                public: true,
                regions: 'en',
                currencies: 'BTC,ETH', // Focus on Bitcoin and Ethereum news
                // metadata: 'true' // Include full metadata
            }
        });

        if (!response.data || !response.data.results) {
            throw new Error('Invalid response from CryptoPanic API');
        }

        console.log(`Received ${response.data.results.length} articles`);

        // Process and format the news data
        const articles = response.data.results.map(article => {
            // Calculate sentiment based on votes and keywords
            let sentiment = 'neutral';
            if (article.votes) {
                if (article.votes.positive > article.votes.negative) {
                    sentiment = 'positive';
                } else if (article.votes.negative > article.votes.positive) {
                    sentiment = 'negative';
                }
            }

            // Extract domain from URL for source attribution
            const domain = new URL(article.url).hostname.replace('www.', '');

            return {
                title: article.title,
                summary: article.metadata?.description || article.title,
                url: article.url,
                source: domain,
                sentiment: sentiment,
                published_at: article.published_at,
                currencies: article.currencies?.map(c => c.code) || [],
                categories: article.categories || []
            };
        });

        // Sort articles by published date (newest first)
        articles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        // Create the data object with top 10 articles
        const newsData = {
            date: new Date().toISOString(),
            articles: articles.slice(0, 10),
            stats: {
                total_articles: articles.length,
                sentiment_distribution: {
                    positive: articles.filter(a => a.sentiment === 'positive').length,
                    neutral: articles.filter(a => a.sentiment === 'neutral').length,
                    negative: articles.filter(a => a.sentiment === 'negative').length
                }
            }
        };

        // Ensure the data directory exists
        const dataDir = path.join(process.cwd(), 'public', 'data');
        await fs.mkdir(dataDir, { recursive: true });

        console.log('Writing news data to file...');

        // Write to JSON file
        await fs.writeFile(
            path.join(dataDir, 'news.json'),
            JSON.stringify(newsData, null, 2)
        );

        console.log('News data successfully fetched and saved');
    } catch (error) {
        console.error('Error fetching news:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        process.exit(1);
    }
}

fetchNews(); 