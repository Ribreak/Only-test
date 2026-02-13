import React from "react";
import styled from "styled-components";
import Header from './components/Header';
import Timeline from './components/Timeline';

const App = () => {  
  return (
      <Container>
        <Header />
        <Timeline />
      </Container>
  )
}
export default App;

const Container = styled.div`
  position: relative;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  padding: 50px 15px; 
  gap: 20px;
  margin: 0 auto;
`;