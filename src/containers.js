//These constants are necessary for the sidenav component

import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
`;

export const Navigation = styled.div`
  width: 250px;
  flex-shrink: 0;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.125);
`;
export const Body = styled.div`
  padding: 12px;
  height: 100vh;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const ExampleContainer = styled.div`
  border: 1px solid #e5e5e5;
`;

export const ExampleNavigation = styled(Navigation)`
  height: 100%;
  margin-right: 4px;
`;

export const ExampleBody = styled.div`
  padding: 12px;
  width: 100%;
  height: 100%;
`;
