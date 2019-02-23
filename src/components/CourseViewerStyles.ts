import styled from "styled-components";

export const StyledDiv = styled.div<{ background: string }>`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0 0 0;
    background-color: ${props => props.background};
    transition: background-color 0.25s linear;
    color: palevioletred;
    font-size: 1.5em;
    text-align: center;
  `;

export const StyledSpan = styled.div`
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 15px;
    min-height: 100px;
  `;