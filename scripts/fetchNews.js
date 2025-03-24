const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Free crypto news API
const CRYPTO_PANIC_API = 'https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_FREE_API_KEY&kind=news';

async function fetchNews() {
    try {
        const response = await axios.get(CRYPTO_PANIC_API);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

async function generateSummary(text) {
    // In a production environment, you would use a model API here
    // For now, we'll just return a simple summary
    return text.slice(0, 200) + '...';
}

async function analyzeSentiment(text) {
    // In a production environment, you would use a model API here
    // For now, we'll return a random sentiment
    const sentiments = ['positive', 'neutral', 'negative'];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
}

async function main() {
    const articles = await fetchNews();
    const processedArticles = await Promise.all(
        articles.slice(0, 5).map(async (article) => ({
            title: article.title,
            url: article.url,
            summary: await generateSummary(article.title + ' ' + article.description),
            sentiment: await analyzeSentiment(article.title + ' ' + article.description)
        }))
    );

    const newsData = {
        date: new Date().toISOString(),
        articles: processedArticles
    };

    const dataDir = path.join(process.cwd(), 'app', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(
        path.join(dataDir, 'news.json'),
        JSON.stringify(newsData, null, 2)
    );
}

main().catch(console.error); 