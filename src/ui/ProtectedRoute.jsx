import styled from "styled-components";
import {useUser} from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height:100vh;
    background-color:var(--color-grey-50);
    display:flex;
    align-items:center;
    justify-content:center;
`

function ProtectedRoute({children}) {
    // 是所有页面的父页面 每个页面中保存有这些状态 如果是false 那么会触发相应的跳转
    const navigate = useNavigate();
    const {isLoading,isAuthenticated} = useUser();
    
    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate("/login");
    },[isAuthenticated, isLoading, navigate]);
 
    if(isLoading) return (
      <FullPage>
        <Spinner/>
      </FullPage>);
    
    if(isAuthenticated) return children;
}

export default ProtectedRoute
