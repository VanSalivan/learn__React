//? 105. Что такое роутинг
//* - Роутинг - переключение между виртуальными "страницами" UI приложения
//* - Роутинг нужен чтобы упросить структуру приложения и организовать навигацию
//* - В Single Page Application страница одна и она не перезагружается

//? 106. Основы react-router
//* - React Router это не часть Реакт. Есть и другие библиотеки для роутинга, к примеру: UI-Router
// <Router>
//    <Route path="/путь-1" component={Отображемые Компонент-1 }/>
//    <Route path="/путь-2" component={Отображемые Компонент-2}/>
//    <Route path="/путь-3" component={Отображемые Компонент-3 }/>
// </Router>

//? 107. Link
//* - Чтобы переключать страницы, используйте компонент Link из react-route
// <Link to="/people">People</Link>
//* - Link работает почти как тег <a>, но не перезагружает страницу, при это обновляет URL в адресной строке

//? 108. Как работает Route
//* - В Route можно передать render функцию
// <Route path="/путь" render={ () => <p>Hi</p> }/>
//* - Route работает как фильтр - сравнивает path с текущим адресом, он решает отрисовать содержимое или нет
//* - Параметр "exact" - говорит что нужно использовать точное совпадение (a не "path является частью адреса")

//? 109. Динамические пути
//* - В Route можно передавать параметры:
// <Route path="/путь/:id" render={ ({match}) => <p>match.params.id</p>}/>
//* - ":id" может быть любой строкой, которая идет после /people/
//* - Если не установить "exact", то путь /people будет срабатывать всегда, когда срабатывает people/:id

//? 110. withRouter
//* - withRouter - Компонент высшего порядка, он передается компоненту обьекты react router:
//* - { match, location, history }
// - <Button onClick={ () => history.push('/new/path')}>ClickMe</Button>

//? 111. Относительные пути
//* - В react-router можно использовать относительные пути
// history.push('/путь') абсолютный путь
// history.push('относительный путь') относительный путь

//* - Закрывающий / слеш очень важен

// history.push('путь') - относительный путь
//? С / слешом
// текущий адрес - /site/catalog/
// результат - /site/catalog/путь

//? Без / слеша
// текущий адрес - /site/catalog
// результат - /site/путь - заменить "catalog"

//? 112. Опциональные параметры
//* - В path параметры могут быть опциональными:
// <Route path="/путь/:id ?/> то же что и  ? /путь/ или id 
//* - Приложение должно позволять перезагружать страницы или передавать URL другим пользователям
//* - Адрес должен содержать ID открытого элемента
//* тогда открыв URL пользователь попадет на тот - же экран при перезагрузке

//? 113. Авторизация и "закрытые" страницы
// TODO попрактиковать!
//* - Можно использовать компонент <Redirect> чтобы переслать пользователя на логин-страницу
// <Redirect to="/login" />
//* - Система авторизации - это не обеспечение безопасности, а лишь User Experience
//* - Проверка прав должна производиться на сервере

//? 114. Switch (обработка несуществующих адресов)
//* - Компонент Switch оборачивает другие компоненты (Route и Redirect)
// <Switch>
//  <Route path='/books'/>
//  <Route path='/blogs'/>
// </Switch>

//* - Switch отрисовывает ТОЛЬКО ПЕРВЫЙ элемент, который соответствует адресу

//* - Для кейса 404 в конце можно поставить 
//* - Переадресачию на другую страницу - Redirect
// или
//* - Route render = {<h2>Текст для ошибки 404</h2>}
//* - Route без свойства path - срабатывает всегда