const puppeteer = require('puppeteer');
const fs = require('fs'); // Módulo que permite interagir com o sistema de arquivos (fs)

async function scrapeWebsite() {
  // Inicia um browser headless
  const browser = await puppeteer.launch();

  // Cria uma nova página
  const page = await browser.newPage();

  // Navega ao website determinado
  await page.goto('https://nimitz.atlassian.net/wiki/spaces/DPU/overview');

  // Extração de elementos de texto
	// Método para avaliar uma função no contexto da página, que nos permite extrair todo o conteúdo de texto dos elementos HTML.
  const textElements = await page.$$eval('*', elements => elements.map(element => element.textContent.trim())); 

  // Imprime os elementos extraídos ao stdout
  // textElements.forEach(text => console.log(text));

	// Adiciona os elementos de texto extraídos a um arquivo:
fs.appendFile('scraped_elements.txt', textElements.join('\\n'), err => {
    if (err) throw err;
    console.log('Extração completa.');
  });

  // Fecha o browser
  await browser.close();
}

// Chama a função scrapeWebsite
scrapeWebsite();