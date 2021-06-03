import React from "react";

import {useDragLayer} from "react-dnd";
import {Column} from "./Column";
import {DragPreviewWrapper, CustomDragLayerContainer} from "./styles";
import {useAppState} from "./state/AppStateContext";
import {Card} from "./Card";

const CustomDragLayer = () => {
	const {draggedItem} = useAppState();
	const {currentOffset} = useDragLayer((monitor) => ({
		currentOffset: monitor.getClientOffset()
	}))
	
	return draggedItem && currentOffset ? (
		<CustomDragLayerContainer>
			<DragPreviewWrapper position={currentOffset}>
				{draggedItem.type === 'COLUMN' ?
					<Column id={draggedItem.id} text={draggedItem.text} isPreview={true}/> :
					<Card columnId={draggedItem.columnId} id={draggedItem.id} text={draggedItem.text} isPreview={true}/>
				}
			</DragPreviewWrapper>
		</CustomDragLayerContainer>
	) : null
}

export default CustomDragLayer