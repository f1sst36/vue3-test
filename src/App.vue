<template>
  <div class="container">
    <AddTickerForm @submitForm="addTicker" :currencyNames="currencyNames"/>
    <TickerList @deleteTicker="deleteTicker"
                @clickOnTicker="selectTicker"
                :tickersList="getTickersForPage"
                :selectedTickerId="selectedTicker?.id ?? null"
                @clickOnPrevButton="clickOnPrevButton"
                @clickOnNextButton="clickOnNextButton"
                :currentPage="page"
                :hasNextPage="hasNextPage"
    />
    <CurrencyChart v-if="selectedTicker" :prices="selectedTicker?.prices ?? []"/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import AddTickerForm from "@/components/AddTickerForm.vue";
import {Ticker} from "@/interfaces/ticker";
import CurrencyChart from "@/components/CurrencyChart.vue";
import TickerList from "@/components/TickerList.vue";
import {TICKERS_LIST} from "@/constants/localStorage";
import {TickersPaginationInfo} from "@/constants/pagination";
import {TickersApi} from "@/api/tickersApi";

const CHART_COLUMNS_COUNT = 80;

@Options({
  components: {TickerList, CurrencyChart, AddTickerForm},
  methods: {
    async addTicker(form: any) {
      try {
        const result = await TickersApi.getTickerPriceByName(form.currencyName);

        if (!result.data?.USD) throw new Error('error');

        const newTicker: Ticker = {
          id: Math.random(),
          price: result.data.USD,
          tickerName: form.currencyName.toUpperCase(),
          prices: []
        }

        this.tickersList = [...this.tickersList, newTicker];
        this.selectTicker(newTicker.id);
      } catch (e) {
        alert('Add ticker error');
      }
    },
    deleteTicker(id: number | string) {
      if (this.selectedTicker?.id === id) this.selectedTicker = null;
      this.tickersList = this.tickersList.filter((ticker: Ticker) => ticker.id !== id);
    },
    selectTicker(id: number | string) {
      this.selectedTicker = this.tickersList.find((ticker: Ticker) => ticker.id === id) || null;
    },
    fetchTickerListFromLocalStorage() {
      const rawTickers = localStorage.getItem(TICKERS_LIST);
      if (rawTickers) {
        this.tickersList = JSON.parse(rawTickers);
      }
      this.tickersList.forEach((ticker: Ticker) => {
        ticker.prices = [];
      })
    },
    async getCurrenciesNames() {
      try {
        const result = await TickersApi.getCoinlist();

        this.currencyNames = Object.keys(result.data.Data);
      } catch (e) {
        alert('Coinlist error');
      }
    },
    clickOnPrevButton() {
      this.page--;
    },
    clickOnNextButton() {
      this.page++;
    },
    setUrlParams() {
      const url = new URL(window.location.href);
      url.searchParams.set('page', this.page)
      window.history.pushState(
          null,
          document.title,
          url.href
      );
    },
    setFiltersValuesFromURL() {
      const params = Object.fromEntries(new URL(window.location.href).searchParams.entries());
      this.page = +params['page'] || 1;
    },
    subscribeForTickerPrices() {
      setInterval(async () => {
        if (!this.tickersList.length) return;

        const currencies = this.tickersList.reduce(
            (acc: string[], ticker: Ticker) =>
                (acc.push(ticker.tickerName) && acc),
            []
        );

        try {
          const result = await TickersApi.getTickerPricesByNames(currencies);

          if (!result.data[currencies[0]]) return;

          this.tickersList.forEach((ticker: Ticker) => {
            ticker.price = result.data[ticker.tickerName].USD;
            ticker.prices.push(result.data[ticker.tickerName].USD);
            if (ticker.prices.length >= CHART_COLUMNS_COUNT) {
              ticker.prices.splice(0, 1);
            }
          })
        } catch (e) {
          console.log('Interval error', e)
        }
      }, 6000);
    }
  },
  computed: {
    getOffsetForPagination() {
      return {
        offset: (this.page - 1) * TickersPaginationInfo.itemsPerPage,
        countOfItems: TickersPaginationInfo.itemsPerPage
      }
    },
    getTickersForPage() {
      return this.tickersList.slice(
          this.getOffsetForPagination.offset,
          this.getOffsetForPagination.offset + this.getOffsetForPagination.countOfItems
      );
    },
    hasNextPage() {
      return this.tickersList.length > (this.getOffsetForPagination.offset + this.getOffsetForPagination.countOfItems);
    }
  },
  watch: {
    page() {
      this.setUrlParams();
    },
    tickersList() {
      localStorage.setItem(TICKERS_LIST, JSON.stringify(this.tickersList));
    }
  },
  async created() {
    this.fetchTickerListFromLocalStorage();
    this.setFiltersValuesFromURL();

    await this.getCurrenciesNames();
    this.subscribeForTickerPrices();
  },
  data() {
    return {
      tickersList: [],
      currencyNames: [],
      selectedTicker: null,
      page: 1
    }
  }
})

export default class App extends Vue {
}
</script>


<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

.container {
  max-width: 800px;
  margin: auto;
}
</style>

