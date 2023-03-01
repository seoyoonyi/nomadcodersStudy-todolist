import { atom, selector } from 'recoil';

export interface IToDo {
	text: string;
	id: number;
	category: string;
}

export let defaultCategories: string[] = ['TO_DO', 'DOING', 'DONE'];

const localStorageEffect =
	(key: string) =>
	({ setSelf, onSet }: any) => {
		const savedValue = localStorage.getItem(key);
		// setSelf -> Callbacks to set or reset the value of the atom.
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		// onSet -> Subscribe to changes in the atom value.
		onSet((newValue: any, _: any, isReset: boolean) => {
			isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const categoryState = atom({
	key: 'category',
	default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
	key: 'categoriesState',
	default: JSON.parse(localStorage.getItem('categories') ?? JSON.stringify(defaultCategories)),
	effects: [localStorageEffect('categoriesState')],
});

export const toDoState = atom<IToDo[]>({
	key: 'toDo',
	default: [],
	effects: [localStorageEffect('toDo')],
});

export const toDoSelector = selector({
	key: 'toDoSelector',
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter((toDo) => toDo.category === category);
	},
});
