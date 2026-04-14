import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", "https://www.youtube.com"], 
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        upgradeInsecureRequests: []
      }
    },

    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    },

    frameguard: { action: 'deny' },

    hidePoweredBy: true,

    noSniff: true,

    dnsPrefetchControl: { allow: false },

    ieNoOpen: true,

    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })
);

app.use((req, res, next) => {
 
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );
  next();
});


app.get('/', (req, res) => {
  res.send('<h1>Secure Application</h1>');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Protected API endpoint' });
});


export default app;