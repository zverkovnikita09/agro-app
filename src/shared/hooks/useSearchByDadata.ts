import { useCallback, useState } from "react"

const DADATA_TOKEN = "68137e7299f43f1d4869c08e43345f085af8fdf0"

export interface DadataResponse<T> {
  data: T;
  value: string;
  unrestricted_value: string;
}

export interface DadataCompany {
  address: {value: string, data: DadataAddress};
  inn: string | null;
  name: {full: string; full_with_opf: string; short: string; short_with_opf: string};
  management: {name?: string};
  ogrn: string | null;
  okved: string | null;
  type: "LEGAL" | "";
  kpp: string | null;
  fio: {
    name?: string;
    patronymic?: string;
    surname: string;
  }
}

export interface DadataAddress {
  region_type_full: string;
  region_type: string;
  region_with_type: string;
  region: string
}

export interface DadataFMS {
  code: string;
  name: string;
  region_code: string;
}

export const useSearchByDadata = <T,>(target: "address" | "party" | "fms_unit") =>{
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>();
  
  const onSearch = useCallback(async (query: string)=>{
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${target}`, {
        body: JSON.stringify({
          query,
        }),
        method: "POST",
        headers: {
          Authorization: `Token ${DADATA_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      const responceJson = await response.json();
      return responceJson.suggestions as DadataResponse<T>[];
    }
    catch(e){
      setError(e);
      setIsError(true)
    }
    finally{
      setIsLoading(false)
    }
  }, [target]);
  return [onSearch, {isLoading, isError, error}] as const;
}