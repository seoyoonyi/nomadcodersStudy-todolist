import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../context/atmos';

interface FormDataInterface {
	toDo: string;
}

function CreateToDo() {
	const { register, handleSubmit, setValue } = useForm<FormDataInterface>();
	const [toDos, setToDos] = useRecoilState(toDoState);
	const category = useRecoilValue(categoryState);

	const onValid = ({ toDo }: FormDataInterface) => {
		setValue('toDo', '');
		setToDos((current) => [{ text: toDo, category, id: Date.now() }, ...current]);
	};

	useEffect(() => {
		localStorage.setItem('toDos', JSON.stringify(toDos));
	}, [toDos]);

	return (
		<form onSubmit={handleSubmit(onValid)}>
			<input
				{...register('toDo', {
					required: 'Please write a To Do',
				})}
				placeholder={`${category} Write a to do`}
			/>
			<button>Add</button>
		</form>
	);
}

export default CreateToDo;
