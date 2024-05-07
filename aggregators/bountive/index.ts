import fetchURL from "../../utils/fetchURL";
import { FetchResultV2, SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

const URL = 'https://app.bountive.fi';
const endpoint = '/api/metrics/volumes/';
const startTimestamp = 1709356735;// 02.03.2024

interface IAPIResponse {
    date: number;
    dailyVolume: string;
    totalVolume: string;
}

const fetch = async ({ endTimestamp, startTimestamp }): Promise<FetchResultV2> => {
    const { dailyVolume, totalVolume }: IAPIResponse = await fetchURL(
      `${URL}${endpoint}${startTimestamp * 1000}/${endTimestamp * 1000}`,
    );

    return {
      dailyVolume,
      totalVolume,
    };
};
  
const adapter: SimpleAdapter = {
    version: 2,
    adapter: {
        [CHAIN.STARKNET]: {
            fetch: fetch,
            start: startTimestamp,
        },
    },
};

export default adapter;