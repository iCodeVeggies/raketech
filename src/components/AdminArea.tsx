import React from "react";
import {
	Box,
	Button,
	Container,
	Grid,
	Typography,
	List,
	ListItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateCasinoOrder } from "../redux/casinoSlice";
import {
	DragDropContext,
	Droppable,
	Draggable,
} from "react-beautiful-dnd";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	userSelect: "none",
	padding: "16px",
	margin: "0 0 8px 0",
	background: isDragging ? "#f0f0f0" : "white",
	border: "1px solid #ccc",
	borderRadius: "2px",
	...draggableStyle,
});

const AdminArea: React.FC = () => {
	const dispatch = useDispatch();
	const casinos = useSelector((state: RootState) => state.casino.data);

	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const newCasinos = Array.from(casinos);
		const [removed] = newCasinos.splice(result.source.index, 1);
		newCasinos.splice(result.destination.index, 0, removed);

		dispatch(updateCasinoOrder(newCasinos));
	};

	return (
		<Container maxWidth="md">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Admin Area
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="casinos">
								{(provided) => (
									<List ref={provided.innerRef} {...provided.droppableProps}>
										{casinos.map((casino, index) => (
											<Draggable
												key={casino.brand_id}
												draggableId={casino.brand_id}
												index={index}
											>
												{(provided, snapshot) => (
													<ListItem
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={getItemStyle(
															snapshot.isDragging,
															provided.draggableProps.style
														)}
													>
														{casino.brand_id}
													</ListItem>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</List>
								)}
							</Droppable>
						</DragDropContext>
					</Grid>
					<Grid item xs={12}>
						<Button variant="contained" color="primary">
							Save
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default AdminArea;
