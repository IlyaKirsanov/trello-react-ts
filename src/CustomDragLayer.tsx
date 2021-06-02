import React from "react";

import {useDragLayer} from "react-dnd";
import {Column} from "./Column";
import {DragPreviewWrapper, CustomDragLayerContainer} from "./styles";
import {useAppState} from "./state/AppStateContext";

const CustomDragLayer = () => {
  const {draggedItem} = useAppState();
  const {currentOffset} = useDragLayer((monitor) => ({
    currentOffset: monitor.getClientOffset()
  }))

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        <Column id={draggedItem.id} text={draggedItem.text} isPreview/>
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null
}

export default CustomDragLayer