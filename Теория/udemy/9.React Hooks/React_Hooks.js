//? 95. Что такое React Hooks (хуки)
//* - Хуки дают возможность компонентам-функциям работать со состоянием, жизненным циклом и контекстом.
//* - Работаю в версии React не ниже 16.8.0

//? 97. useState()
//* - Добавляет state в функциональный компонент
// const [ параметр, setПараметр ] = useState(стартовое_Значение)
//* - Возвращает массив: текущее значение и функция(setter) для установки значения
//* - Всегда обновляет обьект полностью, а не отдельные поля как setState()

//? 98. useContext()
//* - Получает значение из заданого контекста
// const a = useContext(КомпонентКонтекст);
//* - В useContext() передается именно обьект-контекст, а не Consumer

//? 99.useEffect()
//* - Эффекты создаются и очищаются когда изменяются данные от которым этот эффект зависит
//* - Схож с функциями жизненных циклов компонента
//* - Принимает вторым параметром условия обновления для эффекта componentDidUpdate
// useEffect(первый_параметр_функция, [второй-условие в виде массива]) componentDidMount
//* - Если передать вторым агрументом пустой массив [ ] будет работать лишь если вернуть "return" функцию
//* - Она будет вызываться для очистки предыдущего эффекта - похоже на componentWillUnmount()

//? 101. Использование useEffect() для загрузки данных
//* - Если данные зависят от параметра(например от ID ресурса) - обязательно укажите его в массиве
//* - Promise нельзя отменить, но можно проигнорировать результаты
// useEffect(() => {
//     let cancelled = false; // флаг отвечающий за игнорирование результата промиса
//     fetch(`https://swapi.dev/api/planets/${props.id}`)
//         .then(res => res.json())
//         .then(data => !cancelled && setName(data.name))
//     return () => cancelled = true;
// }, [props.id]);

//? 102. Создание собственных хуков
//* - Собственные хуки - любая функция которая начинается на useИмяХука и может использовать другие хуки
// const useИмяКастомногоХука = (ID) => {
//     const [name, setName] = useState(null);

//     useEffect(() => {
//         let cancelled = false; // флаг отвечающий за игнорирование результата промиса
//         fetch(`https://swapi.dev/api/planets/${ID}`)
//             .then(res => res.json())
//             .then(data => !cancelled && setName(data.name))
//         return () => cancelled = true;
//     }, [ID]);

//     return name;
// };


//? useCallback() и useMemo()
//* Эти хуки используются чтобы сохранять значения, для того чтобы значения не изменялись
//* если данные от которых они зависят НЕ ИЗМЕНЯЮТСЯ между обновлениями компонента  

// f - функция из первого аргумента
// const f = useCallback(() => загружаемыеДанные(ID), [ID])

// v - результат функции из первого аргумента
// const f = useMemo(() => ПолучаемоеValue(ID), [ID])

//? useCallback()
//* - useCallback - сохраняет функцию между вызовами, если данные в массиве зависимостей не изменились
//* - Если данные не изменились useCallback - вернет ссылку на ту же функцию что мы использовали раньше

// синтаксис:
// useCallback(исполняемая функция, [cписок / массив данных которые должны измениться])

//? useMemo() 
//* - useMemo - сохраняет значения/обьект между вызовами, если данные в массиве зависимостей не изменились
//* Если в хуке нужно создавать какое-то значение, которое будет передано в useEffect =>
//* useEffect будет использовать это значение чтобы сравнить старое значение и новое
//* Кэширует результат работы функции (результат - обьект)

// синтаксис:
// const примерMemo = useMemo(() => ({ поля: значения }, [cписок/массив данных от которых зависит состояние])

//* - Создавая новый обьект имеющий те же значения что и старый это все равно новый обьект =>
//* при сравнении двух "разных" обьектов с одинаковыми полями useEffect будет говорить =>
//* что это разные обьекты и нужно вызвать "эффект"

//? 104. Правила и ограничения хуков
//* - Хуки нельзя использовать в циклах и условиях
//* - Хуки можно использовать только в React компонентах и других хуках
//* - Хуки нельзя использовать в классовых компонентах
//* - Не все возможности React можно реализовать при помощи хуков
//* например: componentDidCatch - можно использовать только в классовых компонентах

//* - Для каждого экземпляра компонента Реакт будет использовать 
//* обычный массив чтобы сохранять значения которые нужны для работы хуков
// const [name, setName] = useState('Jon'); где то в Реакт stateHookArray = ['Jon']
// const [age, setAge] = useState(25); где то в Реакт stateHookArray = ['Jon', 25 ]
// const [rate, setRate] = useState(25); где то в Реакт stateHookArray = ['Jon', 25, 25]
//* Необходимо вызывать хуки строго последовательно