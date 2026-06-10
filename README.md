# Aggregate Search Hub 🔍

A modern web application that aggregates search results from multiple search engines (DuckDuckGo, Bing, Google) into a single interface.

## Features

✨ **Multi-Engine Search**: Simultaneously search across DuckDuckGo, Bing, and Google
🎨 **Beautiful UI**: Modern, responsive design with smooth animations
🔄 **Result Aggregation**: Eliminates duplicates and presents unified results
📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices
⚡ **Fast & Lightweight**: Built with React and Express for optimal performance
🚀 **No API Keys Required**: Uses publicly available endpoints - no authentication needed

## Tech Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3

### Backend
- Node.js
- Express
- Axios
- CORS support

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/deng98732/aggregate-search-hub.git
   cd aggregate-search-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

4. **In a new terminal, start the frontend development server**
   ```bash
   npm run client
   ```
   The frontend will run on `http://localhost:5173`

5. **Open your browser**
   Visit `http://localhost:5173` and start searching!

## Usage

1. Enter your search query in the search box
2. Press Enter or click the Search button
3. Results from all search engines will appear below
4. Use filter buttons to view results from specific sources
5. Click on any result card to open it in a new tab

## Project Structure

```
aggregate-search-hub/
├── server.js              # Backend Express server
├── package.json          # Backend dependencies
├── client/               # Frontend React app
│   ├── src/
│   │   ├── main.jsx      # React entry point
│   │   ├── App.jsx       # Main App component
│   │   ├── index.css     # Global styles
│   │   └── components/   # React components
│   │       ├── SearchBox.jsx
│   │       ├── ResultCard.jsx
│   │       └── FilterButtons.jsx
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
├── .gitignore
└── README.md
```

## API Endpoints

### Search Endpoint
```
GET /api/search?q=<query>&limit=<limit>
```

**Parameters:**
- `q` (required): Search query
- `limit` (optional): Number of results per source (default: 10)

**Response:**
```json
{
  "query": "search term",
  "totalResults": 25,
  "results": [
    {
      "source": "DuckDuckGo",
      "title": "Result Title",
      "url": "https://example.com",
      "snippet": "Result description"
    },
    ...
  ]
}
```

### Health Check
```
GET /api/health
```

## Running in Production

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the backend** (production mode)
   ```bash
   npm start
   ```

The server will serve the frontend from the built files on the specified PORT (default: 5000).

## Features Overview

### Search Aggregation
- Queries multiple search engines simultaneously
- Removes duplicate results
- Returns unified results sorted by relevance

### Filter by Source
- Filter results by individual search engines
- Quick toggle between sources
- See result count per source

### Responsive Design
- Mobile-first design approach
- Optimized for all screen sizes
- Touch-friendly interface

### Error Handling
- Graceful error handling for failed requests
- User-friendly error messages
- Automatic retry logic

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Typical search response: < 3 seconds
- Page load time: < 1 second
- Mobile optimized with ~100KB bundle size

## Limitations

- Results are limited to publicly available endpoints
- Some search engines may block automated requests
- Rate limiting may apply for frequent requests

## Future Enhancements

- 📊 Advanced filters (date range, file type, etc.)
- 💾 Search history and bookmarks
- 🌙 Dark mode
- 🌐 Multi-language support
- 🔐 Safe search options
- 📈 Search statistics and analytics

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the maintainer

---

**Happy Searching!** 🚀

Built with ❤️ by deng98732
