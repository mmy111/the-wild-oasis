import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins"; 
import Spinner from "../../ui/Spinner";
import Stats from './Stats';
import SalesChart from "../dashboard/SalesChart";
import DurationChart from './DurationChart';
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

/*
We need to distinguish between two types of data here:
1) BOOKINGS: the actual sales. For example, in the last 30 days, the hotel might have sold 10 bookings online, but these guests might only arrive and check in in the far future (or not, as booking also happen on-site)
2) STAYS: the actual check-in of guests arriving for their bookings. We can identify stays by their startDate, together with a status of either 'checked-in' (for current stays) or 'checked-out' (for past stays)
*/

function DashboardLayout() {
  const {isLoading1, bookings } = useRecentBookings();
  const {stays , confirmedStays, isLoading:isLoading2,numDays} = useRecentStays();
  const {cabins,isLoading:isLoading3} = useCabins();
  if(isLoading1 || isLoading2 || isLoading3) return <Spinner/>
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}>Statistics</Stats>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
);
}

export default DashboardLayout;
