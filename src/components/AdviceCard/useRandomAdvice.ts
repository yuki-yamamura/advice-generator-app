import useSWR, { mutate } from 'swr';
import { Slip } from 'types/Slip';

// the api endpoint to get a random advice
const adviceSlipApiUrl = 'https://api.adviceslip.com/advice';

type Data = { slip: Slip } | undefined;

const useRandomAdvice = (): {
  data: Data;
  error: Error | undefined;
  isLoading: boolean;
  refreshAdvice: () => void;
} => {
  const { data, error, isLoading } = useSWR<Data, Error>(
    adviceSlipApiUrl,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      // set interval as 2 seconds because of the API restriction.
      // see https://api.adviceslip.com/#endpoint-random
      dedupingInterval: 2000,
    },
  );

  const refreshAdvice = () => {
    void mutate<Data>(adviceSlipApiUrl);
  };

  return { data, error, isLoading, refreshAdvice };
};

export default useRandomAdvice;
