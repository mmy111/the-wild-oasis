import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking, getBookings } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // pre fetch
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if(page < pageCount)
  queryClient.prefetchQuery({
    queryKey:['bookings',filter,sortBy,page+1],
    queryFn:()=>getBookings({filter,sortBy,page:page+1})
  });

  if(page > 1) queryClient.prefetchQuery({
    queryKey:["bookings",filter,sortBy,page-1],
    queryFn:()=>getBookings({filter,sortBy,page:page-1})
  })
  return { bookings, isLoading, error, count };
}

export function useBooking(){
  const {bookingId} = useParams();
  const {data:booking,isLoading,error} = useQuery({
    queryKey:["booking",bookingId],
    queryFn: ()=>getBooking(bookingId),
    retry:false,
  });
  return {booking,isLoading,error}
}
// useParams 和 searchParams 不同
// searchParams 查询参数 URL: http://localhost:3000/bookings?bookingId=123
// useParams  URL 路径参数 URL: http://localhost:3000/bookings/123