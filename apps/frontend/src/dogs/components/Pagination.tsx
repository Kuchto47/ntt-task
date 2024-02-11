import { dogsState, setPage } from "../state/DogsState";
import { getVisibleNumbers } from "../utils/visiblePagesGenerator";
import { observer } from "mobx-react";

export const Pagination = observer(() => {
    const { page, totalPages } = dogsState;
    return (
      <div className="flex justify-center items-center mt-4">
          <div className="flex space-x-2">
            {page !== 1 && (
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setPage(dogsState, 1)}
                >
                    First
                </button>
            )}
            {getVisibleNumbers(page, totalPages).map((number, index) => {
                const isCurrent = number === page;
                return (
                    <button
                        key={index}
                        className={`${isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} px-3 py-1 rounded focus:outline-none focus:shadow-outline`}
                        onClick={() => setPage(dogsState, number)}
                    >
                        {number}
                    </button>
                );
            })}
            {page !== totalPages && (
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setPage(dogsState, totalPages)}
                >
                    Last
                </button>
            )}
          </div>
        </div>
    );
  });