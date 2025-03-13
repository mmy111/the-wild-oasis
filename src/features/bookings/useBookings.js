import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method:"eq" };
  // 扩展：多个查询条件并列。可以传递一个数组，每一个数组内容都添加一次query条件

  // Sort
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
  const [field,direction] = sortByRaw.split('-');
  const sortBy ={field,direction};
  const page = !searchParams.get('page')?1:Number(searchParams.get('page'));

  const {
    data: { data: bookings, count } = {}, 
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings",filter,sortBy,page],
    queryFn: () => getBookings({ filter,sortBy,page }),
  });
  // 很优雅的方式->加上filter给key使得每次重新获取数据 
  // 依赖数组


  return { bookings, isLoading, error, count };
}
