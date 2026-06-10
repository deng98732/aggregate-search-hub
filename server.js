import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from client build
app.use(express.static(join(__dirname, 'client', 'dist')));

// Search aggregation endpoint
app.get('/api/search', async (req, res) => {
  const { q, limit = 10 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const results = await aggregateSearch(q, parseInt(limit));
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'dist', 'index.html'));
});

async function aggregateSearch(query, limit) {
  const results = [];
  
  try {
    // Search from DuckDuckGo (no API key needed)
    const ddgResults = await searchDuckDuckGo(query, limit);
    results.push(...ddgResults);
  } catch (error) {
    console.error('DuckDuckGo search error:', error.message);
  }

  try {
    // Search from Bing (using direct endpoint)
    const bingResults = await searchBing(query, limit);
    results.push(...bingResults);
  } catch (error) {
    console.error('Bing search error:', error.message);
  }

  try {
    // Search from Google (using direct endpoint)
    const googleResults = await searchGoogle(query, limit);
    results.push(...googleResults);
  } catch (error) {
    console.error('Google search error:', error.message);
  }

  // Remove duplicates and limit results
  const uniqueResults = [];
  const seenUrls = new Set();

  for (const result of results) {
    if (!seenUrls.has(result.url)) {
      seenUrls.add(result.url);
      uniqueResults.push(result);
    }
  }

  return {
    query,
    totalResults: uniqueResults.length,
    results: uniqueResults.slice(0, limit * 3),
  };
}

async function searchDuckDuckGo(query, limit) {
  try {
    const response = await axios.get('https://html.duckduckgo.com/', {
      params: {
        q: query,
        kl: 'en-us',
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 5000,
    });

    // Parse HTML to extract results
    const results = [];
    const matches = response.data.match(/<a\s+class="result__a"\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi);
    
    if (matches) {
      matches.slice(0, limit).forEach((match) => {
        const urlMatch = match.match(/href="([^"]+)"/);
        const titleMatch = match.match(/>([^<]+)<\/a>/);
        
        if (urlMatch && titleMatch) {
          results.push({
            source: 'DuckDuckGo',
            title: titleMatch[1].trim(),
            url: decodeURIComponent(urlMatch[1]),
            snippet: 'No snippet available',
          });
        }
      });
    }

    return results;
  } catch (error) {
    console.error('DuckDuckGo parsing error:', error.message);
    return [];
  }
}

async function searchBing(query, limit) {
  try {
    const response = await axios.get('https://www.bing.com/search', {
      params: {
        q: query,
        count: limit,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 5000,
    });

    const results = [];
    const matches = response.data.match(/<h2><a href="([^"]+)"[^>]*>([^<]+)<\/a><\/h2>/gi);
    
    if (matches) {
      matches.slice(0, limit).forEach((match) => {
        const urlMatch = match.match(/href="([^"]+)"/);
        const titleMatch = match.match(/>([^<]+)<\/a>/);
        
        if (urlMatch && titleMatch) {
          results.push({
            source: 'Bing',
            title: titleMatch[1].trim().replace(/<[^>]*>/g, ''),
            url: urlMatch[1].split('&').shift(),
            snippet: 'No snippet available',
          });
        }
      });
    }

    return results;
  } catch (error) {
    console.error('Bing parsing error:', error.message);
    return [];
  }
}

async function searchGoogle(query, limit) {
  try {
    const response = await axios.get('https://www.google.com/search', {
      params: {
        q: query,
        num: limit,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 5000,
    });

    const results = [];
    const matches = response.data.match(/<h3[^>]*>([^<]+)<\/h3>/gi);
    
    if (matches) {
      matches.slice(0, limit).forEach((match, index) => {
        const title = match.replace(/<[^>]*>/g, '').trim();
        if (title) {
          results.push({
            source: 'Google',
            title: title,
            url: `https://google.com/search?q=${encodeURIComponent(query)}`,
            snippet: 'Search result from Google',
          });
        }
      });
    }

    return results;
  } catch (error) {
    console.error('Google parsing error:', error.message);
    return [];
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/search?q=your+query`);
});
