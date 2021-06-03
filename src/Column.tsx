import React, {useRef} from "react";
import {ColumnContainer, ColumnTitle} from "./styles";
import {AddNewItem} from "./AddNewItem";
import {useAppState} from "./state/AppStateContext";
import {Card} from "./Card";
import {useItemDrag} from "./utils/useItemDrag";
import {useDrop} from "react-dnd";
import {moveList, addTask, moveTask, setDraggedItem} from "./state/actions";
import {isHidden} from "./utils/isHidden";


type ColumnProps = {
	text: string;
	id: string;
	isPreview?: boolean;
};

export const Column = ({
	                       id, text, isPreview
                       }: ColumnProps) => {
		
		const {draggedItem, getTasksByListId, dispatch} = useAppState()
		
		const tasks = getTasksByListId(id)
		
		const ref = useRef<HTMLDivElement>(null);
		const {drag} = useItemDrag({type: "COLUMN", id, text})
		
		const [, drop] = useDrop({
			accept: ['COLUMN', 'CARD'],
			hover() {
				if (!draggedItem) {
					return
				}
				if (draggedItem.type === 'COLUMN') {
					if (draggedItem.id === id) {
						return
					}
					dispatch(moveList(draggedItem.id, id))
				} else {
					if (draggedItem.columnId === id) return;
					if (tasks.length) return;
					dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
					dispatch(setDraggedItem({...draggedItem, columnId: id}))
				}
			}
		})
		
		drag(drop(ref))
		
		return (
			<ColumnContainer
				ref={ref}
				isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
				isPreview={isPreview}
			>
				<ColumnTitle>{text}</ColumnTitle>
				{tasks.map(task =>
					<Card id={task.id} text={task.text} key={task.id} columnId={id}/>
				)}
				<AddNewItem
					toggleButtonText="+ Add another task"
					onAdd={text => dispatch(addTask(text, id))}
					dark
				/>
			</ColumnContainer>
		);
	}
;
