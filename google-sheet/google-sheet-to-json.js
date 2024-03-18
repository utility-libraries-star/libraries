async function fetchTableFromUrl(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');

    if (!table) {
      throw new Error('No table found on the page');
    }

    const headers = [];
    const rows = [];

    table
      .querySelectorAll('th')
      .forEach((th) => headers.push(th.textContent.trim()));

    table.querySelectorAll('tr').forEach((tr) => {
      const row = {};
      tr.querySelectorAll('td').forEach((td, index) => {
        row[headers[index]] = td.textContent.trim();
      });
      if (Object.keys(row).length > 0) {
        rows.push(row);
      }
    });
    const tableData = rows;
    return JSON.stringify(tableData);
  } catch (error) {
    console.error('Error fetching or parsing the table:', error);
    return null;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const googleSheetUrl = urlParams.get('url');
if (googleSheetUrl) {
  fetchTableFromUrl(googleSheetUrl).then((jsonData) => {
    console.log(jsonData);
  });
}
