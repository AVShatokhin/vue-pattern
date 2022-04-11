# vue-pattern

## Краткое описание

Шаблон WEB-интерфейса на базе vue-matertial-dashboard-pro v.1.5.0. Используется совместно с node-pattern.

Сылка на используемую тему: https://www.creative-tim.com/product/vue-material-dashboard-pro
Документация к самой теме лежит рядом в файле: README_orig.md

## Директория и отдельные файлы шаблона

**/vue-pattern/pattern/** - корневая директория шаблона, здесь расопложены компоненты шаблона, лэйауты, страницы,модернизированные плагины.

### Отдельно нужно отметить файлы ШАБЛОНА:
  * **/vue-pattern/pattern/pattern_routes.js** - это файл шаблона, определяющий объект route. Этот импортируется в файле main.js
  * **/vue-pattern/pattern/scripts/pattern_ajax.js** - это файл шаблона, функции AJAX, необходимые для работы с шаблоном back-end'а в соотвествии с API. Шаблон back-end доступен по ссылке: https://github.com/AVShatokhin/node-pattern 
  * /vue-pattern/pattern/patternPublic/ - директория, содержащая файлы, необходимые для отображения визульных элементов шаблона, в основном это картинки. Для автоматизации процесса сборки предусмотрена команда **`npm run cp`**, которая копирует файлы из этой директории в **/vue-pattern/public/**. Одновременно с копированивем файлов из **/vue-pattern/pattern/patternPublic/** эта команда выполняет копирование кастомизированных иконок из директории **/vue-pattern/app/**. После выполнения команды копирования эти файлы доступны, как для выполнения команды **`npm run build`**, так и для статической раздачи этих файлов в режиме отладочного сервера - **`npm run serve`**. Картинки следует менять именно в директориях **/vue-pattern/pattern/patternPublic/** или **/vue-pattern/app/**. Команду копирования следует выполнять после изменения картинок, перед запуском сборки, либо перед запуском отладочного сервера.
  * **/vue-pattern/pattern/store/pattern_store.js** - это файл шаблона, экспортирующий объект store - экземпляр класса Vuex, для реализации централизованного хранения информации в приложении.

## Директория проекта 

**/vue-pattern/app/** - корневая директория проекта. В этом репозитории содержится пример минимального проекта. Файлы этого примера добавлены в репозиторий один раз и исключены из трека git, что даёт возможность отдельно содержать и обновлять репозиторий шаблона и репозиторий проекта.

### Отдельно нужно отметить файлы ПРОЕКТА:

  * **/vue-pattern/app/app_main.js** - файл, экспортирующий объект настроек проекта: имя проекта, основной URL проекта. Этот объект импортируется в **main.js**
  * **/vue-pattern/app/favicon.png** - кастомная иконка, копируется механизмом **`npm run cp`** (см раздел "Файлы шаблона")
  * **/vue-pattern/app/index.html** - шаблон базовой страницы, используется вебпаком, в нем следует переопределить тег title в соотвествии с названием проекта
  * **/vue-pattern/app/logo.png** - кастомный логотип, копируется механизмом **`npm run cp`** (см раздел "Файлы шаблона")

## Переключение к стандартной теме в main.js

Для переключения между темами изменить файл main.js

```
// import routes from "./routes/routes";
import routes from "./pattern/routes";
```
