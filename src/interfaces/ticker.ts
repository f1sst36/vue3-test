export interface Ticker {
    id: number | string;
    tickerName: string;
    price: number | null;
    prices: number[];
}