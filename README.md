# Daily Crypto News

An automated cryptocurrency news aggregator that runs entirely on GitHub Pages. Updates daily with the latest crypto news and sentiment analysis.

## Features

- Daily automated updates of cryptocurrency news
- Sentiment analysis for each news article
- Clean, modern UI built with Next.js and Tailwind CSS
- Completely free to host and run on GitHub Pages
- Automated deployment via GitHub Actions

## Setup

1. Fork this repository
2. Set up GitHub Pages:
   - Go to your repository settings
   - Under "Pages", select the "gh-pages" branch as the source
   - Set the custom domain if desired

3. Set up API Keys:
   - Sign up for a free API key at [CryptoPanic](https://cryptopanic.com/developers/api/)
   - Go to your repository settings
   - Under "Secrets and variables" > "Actions"
   - Add a new secret named `CRYPTO_PANIC_API_KEY` with your API key

4. Enable GitHub Actions:
   - Go to the "Actions" tab in your repository
   - Enable workflows if they're not already enabled
   - The site will update automatically every day at midnight UTC

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Test the news fetching script
node scripts/fetchNews.js
```

## Customization

- Edit `app/page.tsx` to modify the layout and design
- Adjust the news sources in `scripts/fetchNews.js`
- Modify the update schedule in `.github/workflows/daily-update.yml`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 