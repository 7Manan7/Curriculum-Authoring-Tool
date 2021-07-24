import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import "./Board.css";
import Download from "./Download";

const Board = () => {
	const [data, setData] = useState([
		{ id: uuid(), value: "Rational Numbers", tabs: 0 },
		{ id: uuid(), value: "Linear Equations in One Variable", tabs: 0 },
		{ id: uuid(), value: "Understanding Quadrilaterals", tabs: 1 },
	]);

	const onDragEnd = result => {
		if (!result.destination) return;

		const { source, destination } = result;

		const dataCopy = [...data];
		const [removed] = dataCopy.splice(source.index, 1);
		dataCopy.splice(destination.index, 0, removed);

		setData(dataCopy);
	};

	const leftIndent = index => {
		const dataCopy = [...data];

		if (dataCopy[index].tabs > 0) dataCopy[index].tabs--;
		setData(dataCopy);
	};

	const rightIndent = index => {
		const dataCopy = [...data];

		if (dataCopy[index].tabs < 3) dataCopy[index].tabs++;
		setData(dataCopy);
	};

	const deleteData = index => {
		const dataCopy = [...data];

		dataCopy.splice(index, 1);

		setData(dataCopy);
	};

	const addData = () => {
		setData([
			...data,
			{ id: uuid(), value: "Add a standard (e.g, Numbers)", tabs: 3 },
		]);
	};

	return (
		<DragDropContext onDragEnd={result => onDragEnd(result)}>
			<div className="board-wrapper">
			<div>
					Toggle Assignment [Manan Singh] [18BCS4267] [AIT CU Gharuan]
				</div><div>
					Note: Rows can be moved by : Click and hold row > Drag > Drop
				</div>
				<div>
					"Download PDF" feature still in beat phase
				</div>

				<Droppable droppableId={uuid()}>
					{(provided, snapshot) => {
						return (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{
									background: snapshot.isDraggingOver ? "aliceblue" : "none",
									width: "100%",
									height: "100%",
									minHeight: 350,
									borderRadius: 8,
								}}
								className="droppable-div">
								<div className="table-heading">MATHEMATICS</div>
								<div className="heading-wrapper">
									<span className="actions-span">
										Actions
										<span className="subtitle">Indent | Outdent | Delete</span>
									</span>
									<span className="standard-span">
										Standard
										<span className="subtitle">The text of the standard</span>
									</span>
								</div>
								{data.map(({ id, value, tabs }, index) => {
									return (
										<Draggable key={id} draggableId={id} index={index}>
											{(provided, snapshot) => {
												return (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={{
															userSelect: "none",
															opacity: snapshot.isDraggingOver ? "0.5" : "1",
															...provided.draggableProps.style,
														}}
														className="draggable">
														<div className="icons-wrapper">
															<abbr title="Left Indent">
																<img
																	src="https://img.icons8.com/dotty/24/000000/left.png"
																	key={id}
																	alt="left index"
																	className="left-icon"
																	onClick={() => leftIndent(index)}
																/>
															</abbr>
															<abbr title="Right Indent">
																<img
																	src="https://img.icons8.com/dotty/24/000000/arrow.png"
																	key={id}
																	alt="right indent"
																	className="right-icon"
																	onClick={() => rightIndent(index)}
																/>
															</abbr>
															<abbr title="Delete">
																<img
																	src="https://img.icons8.com/ios/25/000000/delete-forever--v1.png"
																	key={id}
																	alt="delete logo"
																	className="delete-icon"
																	onClick={() => deleteData(index)}
																/>
															</abbr>
														</div>
														<span
															style={{
																width: `${tabs * 20}px`,
																height: "100%",
															}}></span>
														<span
															style={{
																backgroundColor: "lightgray",
																width: "40px",
																height: "100%",
																marginRight: "5%",
																opacity: "0.3",
															}}></span>
														<input
															type="textarea"
															value={value}
															className="data-value"
															style={{
																color: tabs === 0 ? " #0275d8" : "black",
																fontWeight: "700",
																opacity: 2 / Math.pow(1.7, tabs),
															}}
															onChange={e => {
																const dataCopy = [...data];
																dataCopy[index].value = e.target.value;
																setData(dataCopy);
															}}
														/>
													</div>
												);
											}}
										</Draggable>
									);
								})}
								{provided.placeholder}
								<button onClick={addData} className="add-button">
									<img
										src="https://img.icons8.com/dusk/30/000000/add-row.png"
										alt="Add Icon"
										className="add-icon"
									/>
									Add a standard
								</button>
								<Download data={data}></Download>
							</div>
						);
					}}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default Board;
