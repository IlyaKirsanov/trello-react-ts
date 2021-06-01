import {createContext, useContext, FC, Dispatch} from 'react';
import {appStateReducer, AppState, List, Task} from "./appStateReducer";
import {Action} from "./actions";
import {useImmerReducer} from "use-immer";
import {DragItem} from "../DragItem";

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{id: "c0", text: "Generate ideas"}]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{id: "c1", text: "Learning React"}]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{id: "c2", text: "Get new passport"}]
    },
  ],
  draggedItem: null
}

type AppStateContextProps = {
  lists: List[]
  draggedItem: DragItem | null
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>


}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider: FC = ({children}) => {

  const [state, dispatch] = useImmerReducer(appStateReducer, appData)

  const {lists, draggedItem} = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider value={{lists, draggedItem, getTasksByListId, dispatch}}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () =>{
  return useContext(AppStateContext)
}