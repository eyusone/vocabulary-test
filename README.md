## Запуск проекта
 `npm install`

 `npm start`

Билд: `npm run build`

Локальный хост: http://localhost:3002

## Сложности
Столкнулся с тем, в случае, когда буквы одинаковые, то при вводе с клавиатуры их надо было как то различать.
 
Навесил на id элемента уникальный идентификатор, чтобы они не пересекались, при этом доставал значения по подстроке id элемента. 

Затем после добавления букв в контейнер ответа, умышленно упускал обработку, навешанную на keydown.

## Деплой / результат
[https://effortless-salmiakki-5fddc0.netlify.app](https://effortless-salmiakki-5fddc0.netlify.app/)

## Доработки
Добавил стилей в сборку, использовал SASS, добавил обработчик стилевых файлов в конфиг webpack, скормил вебпаку HTML файл.

Не стал пользоваться минификаторами, использовал Babel, TS, DevServer + hot reload + дефолтный prettier.

Заюзал паттерн состояния (подобие стейт-менеджера, тут должна быть картинка из двух собак). 

Также использовал паттерн pub/sub (EventBus), для отслеживания происходящих событий и изменения/сохранения данных.
