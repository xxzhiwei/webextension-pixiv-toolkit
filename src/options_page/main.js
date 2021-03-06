import Vue from 'vue'
import App from './App'
import router from './router'
import Browser from '@/modules/Browser/Browser'
import RouterMixin from '@/mixins/RouterMixin'

Vue.config.productionTip = false;
Vue.mixin(RouterMixin);

try {
  (function(browser) {
    window.browser = browser;

    /**
     * Update browser action badge
     */
    browser.browserAction.getBadgeText({}, function (text) {
      if (text.toLowerCase() === 'new') {
        /**
         * If badge text is 'new', remove the badge text.
         */
        browser.browserAction.setBadgeText({
          text: ''
        });
      }
    });

    browser.storage.local.get(null, items => {
      /* eslint-disable no-new */
      new Vue({
        el: '#app',

        router,

        render: h => h(App),

        data() {
          return {
            plusVersion: null, // deprecated
            browserItems: items,
            isFirefox_: navigator.userAgent.toLocaleLowerCase().indexOf('firefox') > -1
          }
        },

        beforeMount() {
          let vm = this;

          browser.storage.onChanged.addListener((items, scope) => {
            for (let key in items) {
              vm.browserItems[key] = items[key].newValue;
            }
          });
        }
      })
    });
  })(Browser.getBrowser());
} catch (e) {
  console.error(e);
}
