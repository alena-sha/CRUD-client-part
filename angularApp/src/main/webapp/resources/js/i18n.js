// Подключаем модуль translate
var app = angular.module('i18n', ['pascalprecht.translate'])
 
.config(function ($translateProvider) {
  // Загружаем переводы в модуль:
  // Английский
  $translateProvider.translations('en', {
	ALERT:'Alert',
	ALERT_TEXT:'You should choose at least one employee to delete ',
	NAME: 'First name',
    SURNAME: 'Last name',
    GENDER:'Gender',
    AGE:'Date of birth',
    POSITION:'Position',
    LOGIN:'Login',
    PASSWORD:'Password',
    COMMENT:'Comment',
    VIEW: 'view',
    EDIT: 'edit',
    DELETE: 'delete',
    NEW: 'new',
    LIST:'list of employees',
    TITLE:'App: "Employees" ',
    SAVE:'save',
    CLOSE:'close',
    ENTER:'Login',
    MENULOGOUT:'log out',
    SEARCH:'Search...',
    DIALOG_LABEL:'Add/Edit employee',
    DIALOG_ERRORS:'Fix errors!',
    ERROR_REQUIRED:'This field is required!',
    ERROR_MINLENGTH:'At least 3 symbols',
    ERROR_MAXLENGTH:'Not more than 10 symbols',
    ERROR_UNAUTHORIZED:'No such user!!!!',
    CONFIRM:'Confirmation dialog',
    CONFIRM_TEXT:'Do you really want to delete employee?',
    MENULIST:'employees',
    CONTENT:'Content',
    PRIORITY:'Priority',
    BROWSEIMAGE:'Choose file',
    IMAGE:'Image',
    TASKS:'tasks'
    
  });
  // Русский
  $translateProvider.translations('ru', {
	  NAME: 'Имя',
	    SURNAME: 'Фамилия',
	    GENDER:'Пол',
	    AGE:'Дата рождения',
	    POSITION:'Позиция',
	    LOGIN:'Логин',
	    PASSWORD:'Пароль',
	    COMMENT:'Примечание',
	    VIEW: 'просмотреть',
	    EDIT: 'редактировать',
	    DELETE: 'удалить',
	    NEW: 'новый',
	    LIST:'список сотрудников',
	    TITLE:'Приложение: "Сотрудники"',
	    SAVE:'сохранить',
	    CLOSE:'закрыть',
	    ENTER:'Вход в систему',
	    MENULOGOUT:'выйти',
	    SEARCH:'Поиск...',
	    DIALOG_LABEL:'Добавление/Редактирование сотрудника',
	    DIALOG_ERRORS:'Исправьте ошибки!',
	    ERROR_REQUIRED:'Это поле является обязательным!',
	    ERROR_MINLENGTH:'Не менее 3 символов',
	    ERROR_MAXLENGTH:'Не более 10 символов',
	    ERROR_UNAUTHORIZED:'Такого пользователя не существует!!!!',
	    FEMALE:'жен',
	    MEN:'муж',
	    CONFIRM:'Подтверждение удаления',
	    CONFIRM_TEXT:'Вы действительно хотите удалить информацию о сотруднике?',
	    ALERT:'Предупреждение',
	    ALERT_TEXT:'Вы не выбрали ни одной записи для удаления',
	    MENULIST:'сотрудники',
	    CONTENT:'Содержание',
	    PRIORITY:'Приоритет',
	    BROWSEIMAGE:'Выберите файл',
	    IMAGE:'Фото',
	    TASKS:'таски'
  });
  // Устанавливаем язык по умолчанию
  $translateProvider.preferredLanguage('ru');
})
 

