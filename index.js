const express = require('express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const port = 3000;

//Load and parse
const openapiPath = path.join(__dirname, 'openapi.yaml');
const openapiSpec = YAML.load(openapiPath);

//Serve the documentation
function renderOpenAPIData(spec) {
  let html = '<html><body>';
  html += '<h1>API Documentation</h1>';
  html += '<h2>Endpoints</h2>';
  html += '<ul>';

  Object.entries(spec.paths).forEach(([path, methods]) => {
    html += `<li><strong>Path:</strong> ${path}</li>`;
    html += '<ul>';
    Object.entries(methods).forEach(([method, details]) => {
      html += `<li><strong>Method:</strong> ${method.toUpperCase()}`;
      html += `<ul><li><strong>Summary:</strong> ${details.summary || 'No summary'}</li></ul></li>`;
    });
    html += '</ul>';
  });

  html += '</ul>';
  html += '</body></html>';

  return html;
}

//Route
app.get('/', (req, res) => {
  const htmlContent = renderOpenAPIData(openapiSpec);
  res.send(htmlContent);
});

app.get('/pets', (req, res) => {
  res.json([
    { id: 1, name: 'Pitbull' },
    { id: 2, name: 'Westie' }
  ]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
