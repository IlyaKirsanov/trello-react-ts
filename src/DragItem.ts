export type ColumnDragItem = {
	id: string;
	text: string;
	type: "COLUMN"
};

export type CardDragItem = {
	id: string,
	text: string,
	type: "CARD",
	columnId: string
}

export type DragItem = CardDragItem | ColumnDragItem;