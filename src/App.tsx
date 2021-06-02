import React from "react";
import {AddNewItem} from "./AddNewItem";
import {AppContainer} from "./styles";
import {Column} from "./Column";
import {useAppState} from "./state/AppStateContext";
import {addList} from "./state/actions";
import CustomDragLayer from "./CustomDragLayer";

function App() {

  const {lists, dispatch} = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer/>
      {lists.map(list => (
        <Column text={list.text} id={list.id} key={list.id}/>
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch(addList(text))}/>
    </AppContainer>
  );
}

export default App;
