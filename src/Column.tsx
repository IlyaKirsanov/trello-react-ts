import React from "react";
import {ColumnContainer, ColumnTitle} from "./styles";
import {AddNewItem} from "./AddNewItem";
import {useAppState} from "./state/AppStateContext";
import {Card} from "./Card";

type ColumnProps = {
  text: string;
  id: string
};

export const Column = ({
                         id, text
                       }: ColumnProps) => {

    const {getTasksByListId} = useAppState()

    const tasks = getTasksByListId(id)
    return (
      <ColumnContainer>
        <ColumnTitle>{text}</ColumnTitle>
        {tasks.map(task =>
          <Card id={task.id} text={task.text} key={task.id}/>
        )}
        <AddNewItem
          toggleButtonText="+ Add another task"
          onAdd={console.log}
          dark
        />
      </ColumnContainer>
    );
  }
;
