import * as React from 'react';
import styled from 'styled-components';
import TodoTextInput from './TodoTextInput';
import Todo from './Todo';
import { Cache } from "cache-persist";
import { useEffect } from 'react';
import { useState } from 'react';

const StyledHeader = styled.div`
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  margin-right: 0px;
  background-color: #0066FF;
  color: #FFF;
  border: 2px solid #0066FF;
`;

const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  margin-right: 0px;
  background-color: #0066FF;
  color: #FFF;
  border: 2px solid #0066FF;
`;

const StyledList = styled.ul`
  list-style: none;
  color: red;
  padding-left: 0;
  width: 250px;
`;



const TodoList = () => {

  const [cache, ] = useState(new Cache())

  const [result, setResult] = useState<{loading: boolean, data: Map<string, object>}>({loading: true, data: new Map()});

  useEffect(() => {
    cache.restore().then(() => setResult({loading: false, data: cache.data}))
  },
    []);


  const handleTextInputSave = (text: string) => {
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    cache.set(key, text);
    setResult({...result, data: cache.data});
    return;
  };

  const deleteItem = (key: string) => {
    console.log("clickkk", key);
    cache.remove(key);
    setResult({...result, data: cache.data});
    return;
  };

  

  const {loading, data} = result;

  const todoEntries = data;
  const listItems = [];
  for (const [key, value] of todoEntries.entries()) {
    listItems.push(<Todo item={{ key, value }} deleteItem={deleteItem} />)
  }

  if(loading) {return <div>loading...</div>}

  return <div>
    <StyledHeader>
      <TodoTextInput
        placeholder="Add Task"
        onSave={handleTextInputSave}
      />
      <StyledButton > ... </StyledButton>
      <StyledList>{listItems}</StyledList>
    </StyledHeader>
  </div>
}

export default TodoList;