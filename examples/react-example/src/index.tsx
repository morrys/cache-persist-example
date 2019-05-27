import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import TodoList from './components/TodoList';


const App = () => {
    return <TodoList />
}

const StyledApp = styled(App) `
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
`;

ReactDOM.render(
    <StyledApp />,
  document.getElementById('root') as HTMLElement
);