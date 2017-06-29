const webDriver = require('selenium-webdriver');
const axeBuilder = require('axe-webdriverjs');
const expect = require('unexpected');
const util = require('util');

const driver = new webDriver.Builder()
  .forBrowser('phantomjs')
  .build();

// All rules are run by default, they're listed here only for reference
const rules = [
  'accesskeys',
  'area-alt',
  'aria-allowed-attr',
  'aria-hidden-body',
  'aria-required-attr',
  'aria-required-children',
  'aria-required-parent',
  'aria-roles',
  'aria-valid-attr-value',
  'aria-valid-attr',
  'audio-caption',
  'blink',
  'button-name',
  'bypass',
  'checkboxgroup',
  'color-contrast',
  'definition-list',
  'dlitem',
  'document-title',
  'duplicate-id',
  'empty-heading',
  'frame-title-unique',
  'frame-title',
  'heading-order',
  'hidden-content',
  'href-no-hash',
  'html-has-lang',
  'html-lang-valid',
  'image-alt',
  'image-redundant-alt',
  'input-image-alt',
  'label-title-only',
  'label',
  'layout-table',
  'link-in-text-block',
  'link-name',
  'list',
  'listitem',
  'marquee',
  'meta-refresh',
  'meta-viewport-large',
  'meta-viewport',
  'object-alt',
  'p-as-heading',
  'radiogroup',
  // 'region',
  'scope-attr-valid',
  'server-side-image-map',
  // 'skip-link',
  'tabindex',
  'table-duplicate-name',
  'table-fake-caption',
  'td-has-header',
  'td-headers-attr',
  'th-has-data-cells',
  'valid-lang',
  'video-caption',
  'video-description'
];

describe('aXe accessibility test', () => {
  it('should check the main page of akikoo.org', () => {
    return driver.get('https://www.akikoo.org/').then(() => {
      return new Promise((resolve) => {
        axeBuilder(driver).withRules(rules).analyze((results) => {
          if (results.violations.length > 0) {
            console.log(util.inspect(results.violations, true, null));
          }

          expect(results.violations.length, 'to equal', 0);
          console.log('Accessibility Violations: ', results.violations.length);

          resolve();
        });
      });
    }).then(() => {
      driver.quit();
    });
  }).timeout(0);
});