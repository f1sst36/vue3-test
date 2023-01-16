import {axiosInstance} from "@/api/axiosInstance";

export class TickersApi {
    static getTickerPriceByName(currencyName: string) {
        return axiosInstance.get("/price", {
            params: {
                fsym: currencyName,
                tsyms: "USD"
            }
        })
    }

    static getTickerPricesByNames(currencies: string[]) {
        return axiosInstance.get("/pricemulti", {
            params: {
                fsyms: currencies.join(","),
                tsyms: "USD"
            }
        });
    }

    static getCoinlist() {
        return axiosInstance.get("/all/coinlist", {
            params: {
                summary: true
            }
        })
    }
}