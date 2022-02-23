const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    async function waitForSelectors(selectors, frame, timeout) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, timeout);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function waitForSelector(selector, frame, timeout) {
      if (selector instanceof Array) {
        let element = null;
        for (const part of selector) {
          if (!element) {
            element = await frame.waitForSelector(part, { timeout });
          } else {
            element = await element.$(part);
          }
          if (!element) {
            throw new Error('Could not find element: ' + part);
          }
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('|'));
        }
        return element;
      }
      const element = await frame.waitForSelector(selector, { timeout });
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (selector instanceof Array) {
        let elements = [];
        let i = 0;
        for (const part of selector) {
          if (i === 0) {
            elements = await frame.$$(part);
          } else {
            const tmpElements = elements;
            elements = [];
            for (const el of tmpElements) {
              elements.push(...(await el.$$(part)));
            }
          }
          if (elements.length === 0) {
            return [];
          }
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
          i++;
        }
        return elements;
      }
      const element = await frame.$$(selector);
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
    {
        const targetPage = page;
        await targetPage.setViewport({"width":781,"height":609})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('http://automationpractice.com/index.php?id_product=5&controller=product');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Search"],["#search_query_top"]], targetPage, timeout);
        await element.click({ offset: { x: 53.67706298828125, y: 27} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Search"],["#search_query_top"]], targetPage, timeout);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('dress');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "dress");
        }
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#product > div.ac_results > ul > li.ac_even.ac_over > strong"]], targetPage, timeout);
        await element.click({ offset: { x: 6.135406494140625, y: 3} });
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        const element = await waitForSelectors([["aria/Search"],["#search_query_top"]], targetPage, timeout);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('Printed Summer Dress');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "Printed Summer Dress");
        }
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 266.6666564941406)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#quantity_wanted_p > a.btn.btn-default.button-plus.product_quantity_up > span > i"]], targetPage, timeout);
        await element.click({ offset: { x: 8.6875, y: 7.447906494140625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Black"],["#color_11"]], targetPage, timeout);
        await element.click({ offset: { x: 3.6875, y: 13.447906494140625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Size "],["#group_1"]], targetPage, timeout);
        await element.click({ offset: { x: 31.6875, y: 11.447906494140625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Size "],["#group_1"]], targetPage, timeout);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('2');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "2");
        }
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#buy_block > div > div.box-cart-bottom"]], targetPage, timeout);
        await element.click({ offset: { x: 58.6875, y: 61.447906494140625} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 400)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Add to cart","aria/[role=\"generic\"]"],["#add_to_cart > button > span"]], targetPage, timeout);
        await element.click({ offset: { x: 46.6875, y: 22.78125} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 0)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Close window"],["#layer_cart > div.clearfix > div.layer_cart_product.col-xs-12.col-md-6 > span"]], targetPage, timeout);
        await element.click({ offset: { x: 16.6666259765625, y: 14} });
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        const element = await waitForSelectors([["aria/Cart2 "],["#header > div:nth-child(3) > div > div > div:nth-child(3) > div > a"]], targetPage, timeout);
        await element.click({ offset: { x: 121.65625, y: 21} });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 533.3333129882812)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#cart_quantity_down_5_26_0_0 > span > i"]], targetPage, timeout);
        await element.click({ offset: { x: 2.1666259765625, y: 5.322914123535156} });
    }

    await browser.close();
})();
