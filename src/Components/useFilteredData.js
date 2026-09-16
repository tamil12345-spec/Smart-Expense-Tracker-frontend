import { useMemo } from "react";

export default function useFilteredData(data, filters) {
  const { category, amountRange, dateFrom, dateTo } = filters;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const categoryMatch = category ? item.category === category : true;

      let amountMatch = true;
      if (amountRange === "0-50")
        amountMatch = item.amount >= 0 && item.amount <= 50;
      else if (amountRange === "50-100")
        amountMatch = item.amount > 50 && item.amount <= 100;
      else if (amountRange === "100-500")
        amountMatch = item.amount > 500 && item.amount <= 1000;
      else if (amountRange === "1000+") amountMatch = item.amount > 1000;

      const itemDate = new Date(item.date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      const dateMatch =
        (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate);

      return categoryMatch && amountMatch && dateMatch;
    });
  }, [data, category, amountRange, dateFrom, dateTo]);

  return filteredData;
}
