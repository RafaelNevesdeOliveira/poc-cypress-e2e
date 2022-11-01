const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uf2zgw',
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
  "reporter":"mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports/mochawesome-report",
    "overwrite": false,
    "html": true,
    "json": false,
    "timestamp": "mmddyyyy_HH:MM:ss"
  }
});
