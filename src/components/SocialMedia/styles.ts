import styled from 'styled-components';

export const Container = styled.div`
    position:fixed;
    display: flex;
    bottom:20px;
    left:0;
    right:0;
    justify-content:space-between;
    align-items:center;
    width:180px;
    margin:0 auto;
    pointer-events: none;
    
    a {
        border-radius:10px;
        padding:5px;
        transition:0.3s;
        color:#fff;
        margin:0 5px;
        :nth-child(1) {
            background:#3b5998;
        }

        :nth-child(2){
            background: #f09433; 
            background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
            background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
        }

        :hover {
            filter:brightness(1.2);
        }
    }

`