// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// PRESENTATION MODE: Slow down execution speed
const PRESENTATION_DELAY = 1500; // Delay in milliseconds (1500ms = 1.5 seconds)

// List of commands to slow down
const commandsToSlow = ['visit', 'click', 'type', 'select', 'check', 'uncheck'];

commandsToSlow.forEach((command) => {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const result = originalFn(...args);
    return new Cypress.Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, PRESENTATION_DELAY);
    });
  });
});