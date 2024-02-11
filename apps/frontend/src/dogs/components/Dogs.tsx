import { useCallback, useEffect } from "react";
import { useFetchDogs } from "../hooks/useFetchDogs";
import { DogsTable } from "./DogsTable";
import { Pagination } from "./Pagination";
import { observer } from "mobx-react";
import { addDataForPage, setTotalPages, isDataForPageAvailable, dogsState } from "../state/DogsState";
import { Route } from "../../routes/dogs";

export const Dogs = observer(() => {
    const fetchDogs = useFetchDogs();
    const search = Route.useSearch();
    const { cachedDogData, totalPages } = dogsState;
  
    const fetch = useCallback(async () => {
      if (!isDataForPageAvailable.get()(search.page)) {
        const data = await fetchDogs(search.page);
        if (!data) {
          // TODO retry and/or notification about failure of getting Nth page of dogs...
          return;
        }
        addDataForPage(dogsState, data.page, data.dogs);
        setTotalPages(dogsState, data.totalPages);
      }
    }, [fetchDogs, search.page, totalPages, cachedDogData]);
  
    useEffect(() => {
      fetch();
    }, [search.page, fetch]);
  
    return (
      <div className="p-2">
        <div className="container mx-auto mt-8">
          <DogsTable />
          <Pagination />
        </div>
      </div>
    );
  });