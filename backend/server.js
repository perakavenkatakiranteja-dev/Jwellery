const http = require('node:http');

const products = [
  { id: 'aurelia-solitaire', name: 'The Aurelia Solitaire', category: 'Rings', metal: 'Gold', gemstone: 'Diamond', priceINR: 185000, stockStatus: 'IN_STOCK', bespoke: false },
  { id: 'platinum-heirloom-band', name: 'Platinum Heirloom Band', category: 'Rings', metal: 'Platinum', gemstone: 'Diamond', priceINR: 78000, stockStatus: 'OUT_OF_STOCK', bespoke: true },
  { id: 'sol-pendant', name: 'The Sol Pendant', category: 'Necklaces', metal: 'Gold', gemstone: 'Diamond', priceINR: 64200, stockStatus: 'IN_STOCK', bespoke: false },
  { id: 'diamond-studs', name: 'Aurelia Diamond Studs', category: 'Earrings', metal: 'Gold', gemstone: 'Diamond', priceINR: 92500, stockStatus: 'IN_STOCK', bespoke: false },
  { id: 'rose-eternelle', name: 'Rose Éternelle', category: 'Rings', metal: 'Rose Gold', gemstone: 'Diamond', priceINR: 112000, stockStatus: 'IN_STOCK', bespoke: false },
  { id: 'celeste-pendant', name: 'Celeste Pendant', category: 'Necklaces', metal: 'Platinum', gemstone: 'Diamond', priceINR: 128000, stockStatus: 'IN_STOCK', bespoke: false }
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/health') {
    return res.writeHead(200).end(JSON.stringify({ status: 'ok', service: 'aurelia-fine-jewels-api' }));
  }
  if (req.method === 'GET' && url.pathname === '/api/products') {
    const { category, metal, gemstone } = Object.fromEntries(url.searchParams);
    const result = products.filter((p) =>
      (!category || p.category.toLowerCase() === category.toLowerCase()) &&
      (!metal || p.metal.toLowerCase() === metal.toLowerCase()) &&
      (!gemstone || p.gemstone.toLowerCase() === gemstone.toLowerCase())
    );
    return res.writeHead(200).end(JSON.stringify({ products: result }));
  }
  res.writeHead(404).end(JSON.stringify({ error: 'Not found' }));
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, '0.0.0.0', () => console.log(`Aurelia API listening on ${port}`));
