import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from '../components/CreateToDo';
import ToDo from '../components/ToDo';
import { categoriesState, categoryState, toDoSelector } from '../context/atmos';

export const Home = () => {
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const [categories, setCategories] = useRecoilState(categoriesState);

	const onClick = (category: string) => {
		setCategory(category);
	};

	const addCategory = () => {
		const newCategory = prompt('What is the name of the new category?', '');

		if (newCategory) {
			if (categories.includes(newCategory)) {
				alert("Can't add a category with the same name because it already exists.");
				return;
			}

			setCategories([...categories, newCategory]);
			setCategory(newCategory);
		}
	};
	return (
		<div>
			<h1>To Dos</h1>
			<hr />

			<div>
				{categories.map((availableCategory) => (
					<div key={availableCategory}>
						<button
							onClick={() => onClick(availableCategory)}
							disabled={availableCategory === category}
						>
							{availableCategory}
						</button>
					</div>
				))}
				<div>
					<button onClick={addCategory}>+</button>
				</div>
			</div>

			<CreateToDo />
			{toDos?.map((toDo) => (
				<ToDo key={toDo.id} {...toDo} />
			))}
		</div>
	);
};
