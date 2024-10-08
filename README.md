### _Learn English_
___
##### Приложение для изучения английского языка (разработан только раздел для изучения слов). 
#
##### API своё, прод сервер на Vercel. 
###### Стек технологий сервер: 
1. Express.js для создания сервера.
2. MongoDB для хранения данных.
3. Mongoose для взаимодействия с MongoDB.
4. JWT (JSON Web Tokens) для авторизации.
5. Nodemailer для отправки токенов на почту.
6. bcrypt для хэширования паролей.

###### Стек технологий клиент: 
1. TypeScript
2. React
3. MUI
4. Axios
5. Js-Cookie
6. Redux Toolkit 
7. React Router

##### Какой есть функционал:
- Авторизация ( с регистрацией пользователя).
- Выбор темы для изучаемых слов. 
- Карточка слова.

##### Авторизация.
Пользователь, при переходе на главную страницу, не может увидеть ни тем, ни слов, пока не пройдет авторизацию. Т.е. ему нужно зарегестрироваться и войти. Вход осуществляется с помощью логина (почта) и пароля.

##### Выбор темы для изучаемых слов. 
Чтобы выбрать слова, нужно открыть боковую панель (которая доступна, только авторизованному пользователю). Слова разделены по группам (существительные, глаголы, местоимения). При выборе группы слов, откроется карточка слова, с выбранной темой.

##### Карточка слова.
В ней мы видим слово, на иностранном языке (английский). Четыре кнопки для выбора перевода, если выбран правильный ответ, то кнопка изменить цвет на зелёный, иначе красный, так же покажется правильный ответ, кнопка также будет зелёной, при правильном ответе. Есть подсказка кнопка в виде вопроса (откроется перевод слова). Слово можно произнести, кнопка микрофон. Когда уже выбран ответ, можно перейти к следующему слову, так же можно вернутся к предыдущему, кнопки следующее и предыдущее.

##### Личный кабинет (в разработке).
Информация о пользователе, ваша почта, смена пароля. 
В данном разделе, можно будет посмотреть информацию о своих достижениях: количество изученных слов, количество набранных баллов, ачивки (пример: 100 выученных слов

###### Дальнейшее развитие. 
Добавить разделы: 
1. Изучение времён. Грамматическая структура предложений, признаки времен, условия их использования.
2. Аудирование. Развитие навыков активного слушания.
