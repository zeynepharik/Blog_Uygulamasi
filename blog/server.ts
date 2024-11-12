import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
const jsonServer = require('json-server'); // json-server'ı dahil ediyoruz

// Express uygulaması, sunucusuz fonksiyonlar için kullanılabilir olacak şekilde dışa aktarılıyor.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Angular SSR yapılandırması
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // /browser klasöründen statik dosyaları sun
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // Tüm düzenli yönlendirmeler Angular motorunu kullanır
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  // JSON Server API yapılandırması
  const jsonApiRouter = jsonServer.router(join(serverDistFolder, 'api/db.json')); // db.json dosyasının yolu
  const jsonApiMiddlewares = jsonServer.defaults();
  
  // JSON Server'ı /api altında dinle
  server.use('/api', jsonApiMiddlewares);
  server.use('/api', jsonApiRouter);

  return server;
}

function run(): void {
  const port = 57259; // Portu 57259 olarak ayarladık

  // Node sunucusunu başlat
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express sunucusu http://localhost:${port} adresinde dinleniyor`);
  });
}

run();
