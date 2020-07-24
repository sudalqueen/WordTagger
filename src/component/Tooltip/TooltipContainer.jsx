import React from 'react';
import styled from 'styled-components';

const ToolTipContainer = styled.div`
position: absolute;
z-index: 2;
cursor: pointer;
left: ${props => props.x ? (props.x - 80)+"px" : "50%"};
top: ${props => props.y ? (props.y + 5)+"px" : "10%"};
`;

function TooltipContainer(props) {
    return (
        <ToolTipContainer x={props.x} y={props.y}>
            {props.children}
        </ToolTipContainer>
    )
}

export default TooltipContainer;