const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://nimitz.atlassian.net/wiki/spaces/DPU/overview';

axios.get(url).then(function(response) {
  const html = response.data;
  const $ = cheerio.load(html);
  const links = [];

  // Assuming "Soluções" is a h2 heading
  const solutionsHeading = $('h2:contains("Soluções")');

  // Get the next sibling element that contains the links
  const nextElement = solutionsHeading.next();

  // Extract all the links
  nextElement.find('a').each((i, link) => {
    links.push({
      text: $(link).text(),
      href: $(link).attr('href'),
    });
  });

  console.log(JSON.stringify(links, null, 2));
}).catch(console.error);