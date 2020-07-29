import React from 'react';
import styled from 'styled-components';

const CustomtoolTip = styled.div`
margin-bottom: 5px;
padding: 10px;
width: 80px;
-webkit-border-radius: 3px;
-moz-border-radius: 3px;
border-radius: 15px;
background-color: #61dafb;
background-color: hsla(#61dafb, 0%, 20%, 0.9);
color: #fff;
content: attr(data-tooltip);
text-align: center;
font-size: 16px;
line-height: 1.2;
&: after{
    position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-bottom: 5px solid #61dafb;
  border-bottom: 5px solid hsla(#61dafb, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: '\u25b2';
  font-size: 0;
  line-height: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
  pointer-events: none;
}
`;

function CustomTooltip(props) {
    return (
        <CustomtoolTip>
            {props.children}
        </CustomtoolTip>
    )
}

export default CustomTooltip;