import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, IToDo, toDoState } from '../context/atmos';

const food = ['pizza', 'mango', 'kimchi', 'kimbab'];

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const categories = useRecoilValue(categoriesState);

	const changeCategory = (selectedCategory: string) => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
			const newToDo = { text, category: selectedCategory, id };

			return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
		});
	};

	const deleteToDo = (toDoName: string) => {
		if (window.confirm(`${toDoName} 할 일을 정말 삭제하시겠어요?`)) {
			setToDos((oldToDos) => {
				const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);

				return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
			});
		}
	};

	return (
		<li>
			<span>{text}</span>
			<div>
				{Object.values(categories).map((availableCategory) => (
					<button
						disabled={availableCategory === category}
						key={availableCategory}
						onClick={() => changeCategory(availableCategory)}
					>
						{availableCategory}
					</button>
				))}
				<button onClick={() => deleteToDo(text)}>지우기</button>
			</div>
		</li>
	);
}

export default ToDo;
