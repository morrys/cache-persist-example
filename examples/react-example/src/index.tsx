import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import createIdbStorage from 'cache-persist/lib/idbstorage';
import { CacheOptions } from 'cache-persist/lib/Cache';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }
  `

const StyledApp = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
`;

const App = () => {

    const optionLocalNew: CacheOptions = {
        name: 'persistnew',
    }

    const optionIDB: CacheOptions = {
        createStorage: createIdbStorage,
        serialize: false
    }

    const optionIDBnew: CacheOptions = {
        createStorage: createIdbStorage,
        name: 'persistnew',
        serialize: false,
    }

    return <StyledApp>
            <TodoList />
            <TodoList options = { optionLocalNew } />
            <TodoList options = { optionIDB }/>
            <TodoList options = { optionIDBnew }/>
         </StyledApp>
}

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
        <App />
    </React.Fragment>
    ,
  document.getElementById('root') as HTMLElement
);