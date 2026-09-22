// Skillaz Start — прототип. Общий каркас интерфейса (шапка, сайдбар, переключатель ролей).
// Кастомный компонент навигации — в дизайн-системе Sidebar не поддерживает вложенные
// группы пунктов, а по ТЗ раздел "Адаптация" должен быть сразу в раскрытом виде.
// Здесь и далее используем только токены --sk-*.

(function () {
const {
  Header, SkillazLogo, Badge, Tag, Avatar, Divider, Menu, Snackbar, IconButton, SegmentedControl,
  Input, SkOverlayHeader, Button,
} = window.SkillazCoreDesignSystem_bf9566;

// ---------------- Иконки (в наборе ДС нет экспортируемых svg-икон отдельным
// компонентом — набор дополняем сами по спеке: 20/24px, обводка 1.5px). ----------------
function mkIcon(children, vb = 24) {
  return function Icon({ size = vb, color = "currentColor", style }) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none" style={{ color, flexShrink: 0, ...style }}>
        {children}
      </svg>
    );
  };
}
const IconSearch = mkIcon(<><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconChevronDown = mkIcon(<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconChevronRight = mkIcon(<path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconArrowLeft = mkIcon(<path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconCheck = mkIcon(<path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />);
const IconLock = mkIcon(<><rect x="5" y="10.5" width="14" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.5" /></>);
const IconClock = mkIcon(<><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconFileText = mkIcon(<><path d="M7 3.5h7l4 4v13H7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 12h6M10 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconLink2 = mkIcon(<><path d="M9.5 14.5l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M11 7.5l1-1a3.2 3.2 0 0 1 4.5 4.5l-1.4 1.4M13 16.5l-1 1a3.2 3.2 0 0 1-4.5-4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>);
const IconMessageCircle = mkIcon(<path d="M21 11.5a8.5 8.5 0 1 1-3.7-7L21 4l-1 4.6c.6 1 .9 2 1 2.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />);
const IconHelpCircle = mkIcon(<><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9.7 9.3a2.3 2.3 0 1 1 3.6 2c-.8.6-1.3 1-1.3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="16.3" r="0.9" fill="currentColor" /></>);
const IconInfo = mkIcon(<><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 11v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="8" r="0.9" fill="currentColor" /></>);
const IconBriefcase = mkIcon(<><rect x="3.5" y="7.5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.5" /></>);
const IconUsers = mkIcon(<><circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19c.6-3 2.7-4.7 5.5-4.7s4.9 1.7 5.5 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 6a3 3 0 0 1 0 5.8M20 19c-.4-2.2-1.5-3.7-3.3-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
// добавлено для пункта меню "Главная" (Сотрудник) — простой домик, отдельно от IconTarget/IconBriefcase.
const IconHome = mkIcon(<><path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10v9a1 1 0 0 0 1 1h3.5v-5h3v5H17a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconTarget = mkIcon(<><circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="1.1" fill="currentColor" /></>);
const IconMapPin = mkIcon(<><path d="M12 21s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.4 6.5 11 6.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.5" /></>);
const IconPhone = mkIcon(<path d="M6.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.6 19 5 13.4 4.5 6.7a2 2 0 0 1 2-2.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />);
const IconMail = mkIcon(<><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4.5 7l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconSend = mkIcon(<path d="M4 12.2 20 4l-6.4 16-3-6.6L4 12.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />);
const IconUpload = mkIcon(<><path d="M12 15.5V4.5M8 8.3 12 4.3l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
// Зеркало IconUpload — та же лента-трей снизу, стрелка развёрнута вниз (для кнопок
// скачивания: резюме отклика, экспорт CSV и т.п.).
const IconDownload = mkIcon(<><path d="M12 4.5V15.5M8 11.7 12 15.7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconX = mkIcon(<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />);
// Иконка "Фильтры" по спеке ДС — два слайдер-трека с бегунками (как на hh.ru), а не
// три убывающие полоски: так однозначнее читается как "настройка фильтров".
const IconFilter = mkIcon(<>
  <path d="M4 7.5h8.5M16 7.5h4M4 16.5h4.5M12 16.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  <circle cx="14" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.6" />
  <circle cx="10" cy="16.5" r="2" stroke="currentColor" strokeWidth="1.6" />
</>);
const IconAlertCircle = mkIcon(<><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="16.3" r="0.9" fill="currentColor" /></>);
// Тот же колокольчик, что в шапке ДС (см. Header.jsx) — общий, чтобы страницы не
// заводили свою локальную копию (как было в employee/vacancies.html и hr/vacancies.html).
const IconBell = mkIcon(<><path d="M12 4a6 6 0 0 0-6 6v3.2l-1.4 2.4a.8.8 0 0 0 .7 1.2h13.4a.8.8 0 0 0 .7-1.2L18 13.2V10a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M10 19.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>);
const IconGraduationCap = mkIcon(<><path d="M2.5 9.5 12 5l9.5 4.5-9.5 4.5-9.5-4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6.5 11.6v4c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4" stroke="currentColor" strokeWidth="1.5" /></>);
const IconGift = mkIcon(<><rect x="4" y="9.5" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M12 9.5V21M18 13v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 9.5c-1.8 0-3.3-1.1-3.3-2.8S9.8 4 10.8 4.5 12 6.8 12 9.5M12 9.5c1.8 0 3.3-1.1 3.3-2.8S14.2 4 13.2 4.5 12 6.8 12 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconLayers = mkIcon(<><path d="M12 3.5 21 8.5 12 13.5 3 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m3 13 9 5 9-5M3 10.75 12 15.75l9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconPlusSm = mkIcon(<path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />, 20);
const IconChevronUp = mkIcon(<path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconEye = mkIcon(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></>);
const IconPaperclip = mkIcon(<path d="M17.5 8.5 9.9 16a3 3 0 1 1-4.2-4.2l7.8-7.8a5 5 0 1 1 7.1 7.1L12.4 19.3a1.5 1.5 0 1 1-2.1-2.1l7.8-7.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />);
// добавлено для роли "Руководитель" — в исходном наборе иконок ДС не было календаря и одиночной фигуры пользователя
const IconCalendar = mkIcon(<><rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconUser = mkIcon(<><circle cx="12" cy="8.3" r="3.3" stroke="currentColor" strokeWidth="1.5" /><path d="M4.8 19.5c.9-3.4 3.5-5.3 7.2-5.3s6.3 1.9 7.2 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconMoreHorizontal = mkIcon(<><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></>);
const IconEdit = mkIcon(<path d="M15.2 4.8 19.2 8.8 8.4 19.6 4 20.5l.9-4.4Z M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />);
const IconTrash = mkIcon(<><path d="M5 7.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9.5 7.5V5.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7" stroke="currentColor" strokeWidth="1.5" /><path d="M7.3 7.5 8 19a1.6 1.6 0 0 0 1.6 1.5h4.8A1.6 1.6 0 0 0 16 19l.7-11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconFlag = mkIcon(<><path d="M6 3.5v17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 4.5c2-1.3 4-1.3 6 0s4 1.3 6 0v8c-2 1.3-4 1.3-6 0s-4-1.3-6 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
// добавлено для роли "HR-Админ" — в исходном наборе иконок ДС нет шестерёнки настроек
// и иконки списка задач/чек-листа для левого меню "Разделы плана" редактора адаптации.
// Шестерёнка настроек: кольцо + 8 зубцов (закрашенные прямоугольники, повёрнутые
// вокруг центра) — прежний вариант из тонких лучей на маленьком размере читался как
// звёздочка/компас, а не как шестерёнка.
const IconSettings = mkIcon(<>
  <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.5" />
  <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.5" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(45 12 12)" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(90 12 12)" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(135 12 12)" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(180 12 12)" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(225 12 12)" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(270 12 12)" />
  <rect x="10.8" y="2.6" width="2.4" height="3.6" rx="0.7" fill="currentColor" transform="rotate(315 12 12)" />
</>);
const IconClipboard = mkIcon(<><rect x="6" y="5.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="9" y="3.5" width="6" height="3.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><path d="M9 12h6M9 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconRocket = mkIcon(<><path d="M12 3c2.8 1.4 4.6 4.2 4.6 8 0 2-.6 3.7-1.6 5.1l-3-1-3 1c-1-1.4-1.6-3.1-1.6-5.1 0-3.8 1.8-6.6 4.6-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" /><path d="M9 15.5 7 18M15 15.5l2 2.5M10 19.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
// добавлено для сценария "Создание цели с ИИ-помощником" (роль Руководитель) — в наборе
// ДС нет иконки-маркера ИИ; звёздочки-искры — стандартный визуальный код для AI-функций.
const IconSparkles = mkIcon(<><path d="M12 3.5 13.5 9 19 10.5 13.5 12 12 17.5 10.5 12 5 10.5 10.5 9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></>);
const IconSparklesSolid = mkIcon(<><path d="M12 3.5 13.5 9 19 10.5 13.5 12 12 17.5 10.5 12 5 10.5 10.5 9Z" fill="currentColor" /><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" fill="currentColor" /></>);
// добавлено для "Полезные материалы" у шага цели (роль Руководитель) — раскрытая книга
// читается понятнее плюсика как маркер прикреплённых учебных/справочных материалов.
const IconBookOpen = mkIcon(<><path d="M12 6.5c-1.6-1.3-3.6-2-6.5-2-.6 0-1 .4-1 1v11c0 .6.4 1 1 1 2.7 0 4.7.6 6.5 2 1.8-1.4 3.8-2 6.5-2 .6 0 1-.4 1-1v-11c0-.6-.4-1-1-1-2.9 0-4.9.7-6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 6.5v13" stroke="currentColor" strokeWidth="1.5" /></>);
// добавлено для HR "Редактора адаптации" (DEV-62512) — набор для очереди назначения,
// колонок таблицы и панели массовых действий; в исходном наборе ДС таких иконок не было.
const IconUnlink = mkIcon(<><path d="M9.5 14.5l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M11 7.5l1-1a3.2 3.2 0 0 1 4.5 4.5l-1.4 1.4M13 16.5l-1 1a3.2 3.2 0 0 1-4.5-4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 3.2" /><path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>);
const IconUserSwitch = mkIcon(<><circle cx="9" cy="8.3" r="3.3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19.2c.8-3.2 2.9-4.9 5.5-4.9.7 0 1.4.1 2 .4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 8.5h5M18 6l2.5 2.5L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M20.5 15.5h-5M18 13l-2.5 2.5L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconRepeat = mkIcon(<><path d="M4 12a8 8 0 0 1 13.5-5.7L20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M20 4.5V9h-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 12a8 8 0 0 1-13.5 5.7L4 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M4 19.5V15h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconColumns = mkIcon(<><rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M9.5 4.5v15M14.5 4.5v15" stroke="currentColor" strokeWidth="1.5" /></>);
const IconInbox = mkIcon(<><path d="M4 12.5h4.2l1.3 2.3h5l1.3-2.3H20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5.3 6.5 4 12.5v5a1.6 1.6 0 0 0 1.6 1.6h12.8A1.6 1.6 0 0 0 20 17.5v-5l-1.3-6a1.6 1.6 0 0 0-1.6-1.3H6.9a1.6 1.6 0 0 0-1.6 1.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconUserX = mkIcon(<><circle cx="9" cy="8.3" r="3.3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19.2c.8-3.2 2.9-4.9 5.5-4.9.7 0 1.4.1 2 .4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 8.5l5 5M20.5 8.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
// добавлено для сценария "Создание цели с AI-помощником" (роль Руководитель) — компактные
// иконки дополнительных способов передать информацию (голос, изображение) рядом с полем ввода.
const IconMic = mkIcon(<><rect x="9" y="3.5" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3.2M9 20.7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>);
// Стандартная геометрия иконки "изображение" (как в Feather Icons) — рамка, солнце,
// одна гора в угол; предыдущая рука рисованная версия выходила за правый край рамки
// (path до x=21 при рамке шириной до x=20.5) и на жирной обводке смотрелась как
// "полоски" вылезающие сбоку. Тут всё внутри рамки по построению.
const IconImage = mkIcon(<><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" /><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>);
function IconCopyLocal2({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color, flexShrink: 0 }}>
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

window.SiteIcons = {
  IconSearch, IconChevronDown, IconChevronUp, IconChevronRight, IconArrowLeft, IconCheck, IconLock, IconClock,
  IconFileText, IconLink2, IconMessageCircle, IconHelpCircle, IconInfo, IconBriefcase, IconUsers,
  IconTarget, IconMapPin, IconPhone, IconMail, IconSend, IconUpload, IconDownload, IconX, IconFilter, IconAlertCircle, IconBell,
  IconGraduationCap, IconGift, IconLayers, IconPlusSm, IconEye, IconPaperclip, IconCalendar, IconUser,
  IconMoreHorizontal, IconEdit, IconTrash, IconFlag, IconSettings, IconClipboard, IconRocket, IconSparkles, IconSparklesSolid, IconBookOpen,
  IconUnlink, IconUserSwitch, IconRepeat, IconColumns, IconInbox, IconUserX, IconCopyLocal2, IconMic, IconImage,
  IconHome, IconAiSpark,
};

function directionHue(direction) {
  return (window.SITE_DATA.directionHues && window.SITE_DATA.directionHues[direction]) || "neutral";
}

// ---------------- Роли и навигация ----------------
const ROLES = [
  { id: "candidate", label: "Кандидат" },
  { id: "hr", label: "HR-Админ" },
  { id: "employee", label: "Сотрудник" },
  { id: "manager", label: "Руководитель" },
  { id: "assistant", label: "Наставник" },
];

function roleHref(base, roleId) {
  if (roleId === "employee") return base + "/employee/adaptation.html";
  if (roleId === "manager") return base + "/manager/team.html";
  if (roleId === "hr") return base + "/hr/templates.html";
  if (roleId === "assistant") return base + "/assistant/team.html";
  if (roleId === "candidate") return base + "/candidate/adaptation.html";
  return base + "/stub.html?role=" + roleId;
}

// items: [{ id, label, icon, href, indent? }] — плоский список с ручной группировкой,
// группа "Адаптация" рисуется как некликабельный заголовок + один-два вложенных пункта.
// "Главная" пока есть только у роли "Сотрудник" (см. employee/home.html) — у остальных
// ролей нет готовой стартовой страницы, поэтому пункт меню и клик по логотипу (см.
// logoHomeHref ниже) для них пока ведут туда же, куда и раньше.
function buildNavGroups(role, base) {
  const groups = [];
  if (role === "employee") {
    groups.push({ kind: "item", id: "home", label: "Главная", icon: <IconHome />, href: base + "/employee/home.html" });
  }
  if (role === "manager") {
    groups.push({ kind: "item", id: "team", label: "Моя команда", icon: <IconUsers />, href: base + "/manager/team.html" });
  }
  const adaptationChildren = [];
  if (role === "employee") {
    adaptationChildren.push({ id: "my-adaptation", label: "Моя адаптация", icon: <IconTarget />, href: base + "/employee/adaptation.html" });
  }
  if (role === "candidate") {
    // По ТЗ у кандидата по умолчанию — только пункт "Моя адаптация" и ничего больше
    // (без полного доступа к Skillaz Start), поэтому больше никаких групп ниже не добавляем.
    adaptationChildren.push({ id: "candidate-my-adaptation", label: "Моя адаптация", icon: <IconTarget />, href: base + "/candidate/adaptation.html" });
  }
  if (role === "assistant") {
    // По ТЗ "Моя адаптация" у наставника не является отдельным экраном (это не его личный
    // план), пункт показываем для консистентности структуры меню, но без перехода.
    adaptationChildren.push({ id: "assistant-my-adaptation", label: "Моя адаптация", disabled: true });
    adaptationChildren.push({ id: "assistant-adaptation", label: "Адаптация сотрудников", href: base + "/assistant/team.html" });
  }
  if (adaptationChildren.length) {
    groups.push({ kind: "group", label: "Адаптация", icon: <IconRocket />, children: adaptationChildren });
  }
  // HR-Админ: по паспорту продукта (п. 5.3 "Меню по ролям") — два раздела, оба сразу
  // в раскрытом виде: "Адаптация" (Планы сотрудников, Очередь назначения, Шаблоны планов,
  // Справочники, Аналитика) и "Контент" (Редактор материалов). Полностью отрисованы:
  // "Планы сотрудников" (hr/plans.html — назначенные + черновики, DEV-62512: чекбоксы,
  // колонки, массовые действия), "Очередь назначения" (hr/queue.html — DEV-62512) и
  // "Шаблоны планов" (hr/templates.html, hr/template.html). Остальные пункты — заглушка.
  if (role === "hr") {
    groups.push({
      kind: "group", label: "Адаптация", icon: <IconRocket />, children: [
        { id: "hr-plans", label: "Планы сотрудников", href: base + "/hr/plans.html" },
        { id: "hr-queue", label: "Очередь назначения", href: base + "/hr/queue.html" },
        { id: "hr-templates", label: "Шаблоны планов", href: base + "/hr/templates.html" },
        { id: "hr-refs", label: "Справочники", href: base + "/hr/goals-catalog.html" },
        { id: "hr-analytics", label: "Аналитика", href: base + "/stub.html?role=hr&section=analytics" },
      ],
    });
    groups.push({
      kind: "group", label: "Контент", icon: <IconEdit />, children: [
        { id: "hr-content", label: "Редактор материалов", href: base + "/stub.html?role=hr&section=content" },
      ],
    });
  }
  if (role === "employee" || role === "hr") {
    groups.push({ kind: "item", id: "vacancies", label: "Вакансии", icon: <IconBriefcase />, href: vacanciesHref(base, role) });
  }
  return groups;
}

// Клик по логотипу возвращает на "Главную" — пока она есть только у "Сотрудника"
// (см. комментарий у buildNavGroups), поэтому для остальных ролей логотип остаётся
// некликабельным, а не ведёт в никуда.
function logoHomeHref(role, base) {
  if (role === "employee") return base + "/employee/home.html";
  return null;
}

function NavSidebar({ role, active, base }) {
  const groups = buildNavGroups(role, base);
  const homeHref = logoHomeHref(role, base);
  return (
    <aside className="sk-scroll" style={{
      width: 224, flexShrink: 0, minHeight: "100%",
      background: "var(--sk-surface-secondary)", display: "flex", flexDirection: "column",
      padding: "16px", gap: 12, overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", height: 40, padding: "0 8px" }}>
        {homeHref ? (
          <a href={homeHref} style={{ display: "inline-flex", color: "inherit" }}>
            <SkillazLogo variant="full" height={22} />
          </a>
        ) : (
          <SkillazLogo variant="full" height={22} />
        )}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 12px",
        borderRadius: "var(--sk-radius-3)", background: "var(--sk-surface-page)",
        boxShadow: "inset 0 0 0 1px var(--sk-stroke)", color: "var(--sk-text-placeholder)", font: "var(--sk-label-3-regular)",
      }}>
        <IconSearch size={16} color="var(--sk-icon-secondary)" />
        Поиск по меню
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {groups.map((g, i) => g.kind === "item" ? (
          <NavItem key={g.id} icon={g.icon} label={g.label} href={g.href} selected={active === g.id} />
        ) : (
          <NavGroup key={"grp" + i} group={g} active={active} />
        ))}
      </nav>
      <Divider />
      <NavItem label="Поддержка" icon={<IconHelpCircle />} href="#" />
    </aside>
  );
}

// Группа с заголовком (иконка + название + шеврон свёртывания) и вложенными пунктами
// без собственных иконок — по спеке дизайна: сразу в раскрытом виде, но сворачиваемая.
// Размер заголовка и пунктов подогнан под размер обычного NavItem (как "Вакансии"),
// чтобы все разделы меню были одного масштаба.
function NavGroup({ group, active }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div className="sk-clickable" onClick={() => setOpen((o) => !o)} style={{
        display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 12px", borderRadius: "var(--sk-radius-3)",
      }}>
        <span style={{ display: "inline-flex", color: "var(--sk-icon-secondary)" }}>{group.icon}</span>
        <span style={{ flex: 1, font: "var(--sk-label-3)", color: "var(--sk-text-primary)" }}>{group.label}</span>
        {open ? <IconChevronUp size={15} color="var(--sk-icon-secondary)" /> : <IconChevronDown size={15} color="var(--sk-icon-secondary)" />}
      </div>
      {open && group.children.map((c) => (
        <NavChildItem key={c.id} label={c.label} href={c.href} selected={active === c.id} disabled={c.disabled} />
      ))}
    </div>
  );
}

// Вложенный пункт группы — без иконки, того же масштаба, что и обычный NavItem
// ("Вакансии"), с отступом слева и выделением текущего пункта скруглённой плашкой.
// disabled — пункт есть в структуре меню, но пока никуда не ведёт (например, "Моя
// адаптация" у роли "Наставник" — не отдельный экран).
function NavChildItem({ label, href, selected, disabled }) {
  const [hover, setHover] = React.useState(false);
  if (disabled) {
    return (
      <div style={{
        display: "flex", alignItems: "center", height: 40, padding: "0 12px 0 42px",
        color: "var(--sk-text-tertiary)", font: "var(--sk-label-3-regular)", cursor: "default",
      }}>
        {label}
      </div>
    );
  }
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "center", height: 40, padding: "0 12px 0 42px", borderRadius: "var(--sk-radius-3)",
      background: selected ? "var(--sk-hover-nav)" : hover ? "var(--sk-hover-nav)" : "transparent",
      color: "var(--sk-text-primary)", font: selected ? "var(--sk-label-3)" : "var(--sk-label-3-regular)",
    }}>
      {label}
    </a>
  );
}

function NavItem({ label, icon, href, selected, indent }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "center", gap: 12, height: 40,
      padding: indent ? "0 12px 0 20px" : "0 12px", borderRadius: "var(--sk-radius-3)",
      background: selected || hover ? "var(--sk-hover-nav)" : "transparent",
      color: "var(--sk-text-primary)", font: selected ? "var(--sk-label-3)" : "var(--sk-label-3-regular)",
    }}>
      {icon && <span style={{ display: "inline-flex", color: "var(--sk-icon-secondary)" }}>{icon}</span>}
      <span style={{ flex: 1 }}>{label}</span>
    </a>
  );
}

function vacanciesHref(base, role) {
  if (role === "hr") return base + "/hr/vacancies.html";
  if (role === "employee") return base + "/employee/vacancies.html";
  return base + "/stub.html?role=" + role + "&section=vacancies";
}

// Иконка для кнопки чата с AI-ассистентом в шапке — контур сообщения (как IconMessageCircle)
// плюс маленькая искра сверху справа, тот же визуальный код "AI", что и IconSparklesSolid.
const IconChatSparkle = mkIcon(<>
  <path d="M20 10.5a7.5 7.5 0 1 1-3.3-6.2L20 3l-.9 4.1c.6.9.9 2.1.9 3.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  <path d="M18 14.5l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z" fill="currentColor" />
</>);

// Простая кнопка-ссылка в шапке: иконка + подпись, без заливки (в отличие от старой
// заполненной пилюли) — под макет с двумя пунктами шапки ("Вакансии", "Чат с AI-ассистентом").
function HeaderNavButton({ href, onClick, icon, label, color }) {
  const Tag = onClick ? "button" : "a";
  return (
    <Tag href={href} onClick={onClick} type={onClick ? "button" : undefined} className="sk-clickable" style={{
      display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: 0,
      background: "none", border: "none", color: color || "var(--sk-text-secondary)", font: "var(--sk-label-3)",
    }}>
      {icon}
      {label}
    </Tag>
  );
}

function VacanciesButton({ role, base }) {
  return <HeaderNavButton href={vacanciesHref(base, role)} icon={<IconBriefcase size={18} />} label="Вакансии" />;
}

function AiChatHeaderButton() {
  return (
    <HeaderNavButton
      onClick={() => window.__skAiOpenAssistant && window.__skAiOpenAssistant()}
      icon={<IconChatSparkle size={18} />} label="Чат с AI-ассистентом" color="var(--sk-text-special)" />
  );
}

function RoleStrip({ role, base }) {
  return (
    <div style={{
      display: "flex", justifyContent: "flex-end", alignItems: "center",
      height: 48, padding: "0 24px", background: "var(--sk-surface-page)",
      borderBottom: "1px solid var(--sk-stroke-divider)", flexShrink: 0,
    }}>
      <SegmentedControl size="s" active={role}
        items={ROLES.map(r => ({ id: r.id, label: r.label }))}
        onChange={(id) => { if (id !== role) window.location.href = roleHref(base, id); }} />
    </div>
  );
}

// Свой хедер вместо ДС-компонента Header: у него всегда рисуется пилюля "Портал"
// без возможности её скрыть, а по этому макету шапка нужна без неё.
function AppHeaderBar({ children, role }) {
  const D2 = window.SITE_DATA;
  const viewer = role === "manager" ? D2.manager
    : role === "assistant" ? D2.assistantMe
    : role === "hr" ? D2.hrbp
    : role === "candidate" ? D2.candidatePerson
    : D2.person;
  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 16, height: 64, padding: "0 24px",
      background: "var(--sk-surface-secondary)", flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 24 }}>{children}</div>
      <span style={{ position: "relative", display: "inline-flex", color: "var(--sk-icon-secondary)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4a6 6 0 0 0-6 6v3.2l-1.4 2.4a.8.8 0 0 0 .7 1.2h13.4a.8.8 0 0 0 .7-1.2L18 13.2V10a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"></path>
          <path d="M10 19.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
        </svg>
        <Badge dot style={{ position: "absolute", top: 1, right: 2 }} />
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <Avatar src={personPhoto(viewer.name)} name={viewer.name} size={40} />
        <span style={{ font: "var(--sk-label-2-regular)", color: "var(--sk-text-primary)" }}>{viewer.name}</span>
      </span>
    </header>
  );
}

// Select из ДС не умеет очищаться сам (только шеврон, без крестика) — оборачиваем и
// подрисовываем серый крестик справа от шеврона, когда значение выбрано, чтобы можно
// было сбросить один конкретный фильтр не открывая выпадашку. Позиционирование от низа
// контейнера предполагает, что у Select есть label и нет helper/error (как во всех
// текущих фильтрах, где это используется) — тогда поле высотой 40 всегда внизу.
function ClearableSelect({ onClear, ...rest }) {
  const { Select } = window.SkillazCoreDesignSystem_bf9566;
  const [hover, setHover] = React.useState(false);
  const hasValue = rest.multiple ? (rest.value || []).length > 0 : !!rest.value;
  const h = rest.size === "l" ? 48 : 40;
  return (
    <div style={{ position: "relative" }}>
      <Select {...rest} />
      {hasValue && (
        <button type="button" onClick={onClear} title="Очистить"
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{
            position: "absolute", right: 34, bottom: (h - 22) / 2, width: 22, height: 22, zIndex: 2,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            border: "none", borderRadius: "50%", background: hover ? "var(--graphite-graphite-95)" : "transparent",
            padding: 0, cursor: "pointer", color: "var(--sk-icon-secondary)",
          }}>
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}

function AppShell({ role, active, base, breadcrumb, children }) {
  const showVacancies = role === "employee" || role === "hr";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <RoleStrip role={role} base={base} />
      <div className="sk-app-shell" style={{ flex: 1, minHeight: 0 }}>
        <NavSidebar role={role} active={active} base={base} />
        <div className="sk-app-main">
          <AppHeaderBar role={role}>
            {showVacancies && <VacanciesButton role={role} base={base} />}
            <AiChatHeaderButton />
          </AppHeaderBar>
          <div className="sk-app-content sk-scroll">
            <div className="sk-page-container">
              {breadcrumb && <div className="sk-muted" style={{ font: "var(--sk-label-4-regular)" }}>{breadcrumb}</div>}
              {children}
            </div>
          </div>
        </div>
      </div>
      <AiAssistantWidget role={role} />
    </div>
  );
}

// ---------------- Статус-теги (единая точка соответствия статус -> Tag) ----------------
const STATUS_MAP = {
  not_started: { label: "Не начата", hue: "neutral" },
  in_progress: { label: "В процессе", hue: "blue" },
  pending_review: { label: "На проверке", hue: "warning" },
  done: { label: "Выполнено", hue: "positive" },
  returned: { label: "Возвращена в работу", hue: "warning" },
  not_done: { label: "Не выполнено", hue: "negative" },
  cancelled: { label: "Отменена", hue: "gray" },
  completed: { label: "Завершён", hue: "positive" },
  in_progress_plan: { label: "В процессе", hue: "blue" },
  awaiting_start: { label: "Ожидает начала", hue: "warning" },
  on_review: { label: "На финальном ревью", hue: "warning" },
  failed_plan: { label: "Завершён неуспешно", hue: "negative" },
  cp_done: { label: "Проведена", hue: "positive" },
  cp_pending: { label: "Не проведена", hue: "neutral" },
  response_received: { label: "Отклик получен", hue: "neutral" },
  in_review: { label: "В обработке", hue: "blue" },
  interview: { label: "Назначено интервью", hue: "special" },
  rejected: { label: "Отказ", hue: "negative" },
  offer: { label: "Получен оффер", hue: "positive" },
  offer_accepted: { label: "Оффер принят", hue: "positive" },
  offer_declined: { label: "Оффер отклонён", hue: "negative" },
  withdrawn: { label: "Отклик отозван", hue: "gray" },
  vacancy_open: { label: "Идёт поиск", hue: "positive" },
  vacancy_closed: { label: "Закрыта", hue: "neutral" },
};
function StatusTag({ status, size = "s", style }) {
  const m = STATUS_MAP[status] || { label: status, hue: "neutral" };
  return <Tag size={size} hue={m.hue} style={style}>{m.label}</Tag>;
}

// ---------------- Фото участников плана ----------------
// В моках только двое реальных персонажей по полу: демо-сотрудник (Никита) и
// коллега-мужчина делят один референсный портрет, женщины-участницы — другой.
// Строго по полу, чтобы не перепутать карточки.
const PERSON_PHOTOS = {
  "Никита Гаврилов": "../assets/avatar-male.jpg",
  "Анна Козлова": "../assets/avatar-female.jpg",
  "Елена Петрова": "../assets/avatar-female.jpg",
  "Юлия Степанова": "../assets/avatar-female.jpg",
  "Дмитрий Волков": "../assets/avatar-male.jpg",
};
function personPhoto(name) {
  return PERSON_PHOTOS[name] || null;
}

// ==================== AI-ассистент Skillaz (демо) ====================
// Единая точка входа вместо AI-помощника на каждый модуль отдельно (см. ТЗ
// "Skillaz AI: сценарий демонстрации") — один и тот же виджет встроен в общий
// AppShell, поэтому доступен на всех страницах всех ролей. "Понимание" запроса —
// не настоящая генерация, а разбор текста по ключевым словам и фильтрация уже
// существующих моковых данных (SITE_DATA), чтобы ответы всегда совпадали с тем,
// что реально показано на самих страницах. Кнопка-триггер — круг со звёздочкой
// внизу слева; панель ответов открывается справа отдельным плавающим блоком без
// затемняющего фона (в отличие от Drawer/Modal из ДС) — так страница за ней
// остаётся видной и кликабельной.
function IconAiSpark({ size = 24, color = "currentColor", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 3.5 13.5 9 19 10.5 13.5 12 12 17.5 10.5 12 5 10.5 10.5 9Z" fill={color} />
      <path d="M18.5 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9Z" fill={color} />
    </svg>
  );
}

function aiPluralRu(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

// ---------------- Разбор запросов: HR-Админ / "Планы сотрудников" ----------------
function aiHrPlansIntent(queryRaw) {
  const D = window.SITE_DATA;
  const q = queryRaw.toLowerCase();
  let test, extraOf, label;
  if (q.indexOf("риск") !== -1) {
    test = (p) => p.risks.length > 0;
    extraOf = (p) => ({ risks: p.risks });
    label = "с риском";
  } else if (q.indexOf("цел") !== -1 && (q.indexOf("без") !== -1 || q.indexOf("не опубликова") !== -1)) {
    test = (p) => !p.goalsPublished;
    extraOf = () => ({ action: "Опубликовать цели" });
    label = "без опубликованных целей";
  } else if (q.indexOf("просроч") !== -1 || q.indexOf("контрольн") !== -1) {
    test = (p) => p.overdueCheckpoint;
    extraOf = () => ({ action: "Провести просроченную контрольную точку" });
    label = "с просроченной контрольной точкой";
  } else {
    return null;
  }
  const results = D.hrAssignedPlans.filter(test).map((p) => ({
    id: p.id, title: p.name, subtitle: p.planTitle + " · " + p.department,
    href: "plan-detail.html?id=" + p.id, openLabel: "Открыть план", ...extraOf(p),
  }));
  return {
    text: results.length
      ? "Нашёл " + results.length + " " + aiPluralRu(results.length, "план", "плана", "планов") + " " + label + " — вот что именно происходит по каждому:"
      : "Планов " + label + " сейчас нет.",
    results,
  };
}

// ---------------- Разбор запросов: Руководитель / "Моя команда" ----------------
function aiManagerTeamIntent(queryRaw) {
  const D = window.SITE_DATA;
  const q = queryRaw.toLowerCase();
  let test, extraOf, label;
  if (q.indexOf("риск") !== -1) {
    test = (m) => m.risks.length > 0;
    extraOf = (m) => ({ risks: m.risks });
    label = "с риском по адаптации";
  } else if (q.indexOf("не начал") !== -1) {
    test = (m) => m.status === "not_started";
    extraOf = () => ({ action: "План не начат" });
    label = "которые ещё не начали план";
  } else if (q.indexOf("вниман") !== -1 || q.indexOf("действ") !== -1 || q.indexOf("нужно") !== -1) {
    test = (m) => m.risks.length > 0 || !!m.action;
    extraOf = (m) => ({
      action: m.action ? m.action.label + (m.action.due && m.action.due !== "—" ? " до " + m.action.due : "") : null,
      risks: m.risks.length ? m.risks : null,
    });
    label = "которым нужно внимание";
  } else {
    return null;
  }
  const results = D.team.filter(test).map((m) => ({
    id: m.id, title: m.name, subtitle: m.position + " · " + m.department,
    href: "plan.html?employee=" + m.id, openLabel: "Открыть план сотрудника", ...extraOf(m),
  }));
  return {
    text: results.length
      ? "Нашёл " + results.length + " " + aiPluralRu(results.length, "сотрудника", "сотрудников", "сотрудников") + " " + label + " — вот что нужно сделать по каждому:"
      : "Сейчас таких сотрудников нет.",
    results,
  };
}

// ---------------- Разбор запросов: Руководитель / план сотрудника ----------------
function aiManagerPlanEmployee() {
  const D = window.SITE_DATA;
  const id = new URLSearchParams(window.location.search).get("employee");
  const m = D.team.find((t) => t.id === id && t.planId);
  return m || D.team.find((t) => t.id === "yulia");
}
function aiManagerPlanIntent() {
  const member = aiManagerPlanEmployee();
  return { text: "Открываю мастер создания целей адаптации для " + member.name + "…", results: [], action: "openAiGoalModal" };
}

function aiVacancySalaryLine(v) {
  return (v.salaryFrom && v.salaryTo ? v.salaryFrom.toLocaleString("ru-RU") + "–" + v.salaryTo.toLocaleString("ru-RU") + " ₽" : "По договорённости") + " · " + v.format;
}

// Простая объяснимая оценка соответствия вакансии профилю сотрудника: подразделение
// (внутренний переход), город/удалённый формат, требуемый опыт против стажа в
// компании — единственные поля, которые реально есть в профиле сотрудника (нет
// данных о навыках/резюме, поэтому не считаем это "настоящим" ML-скорингом).
function aiVacancyMatchScore(v, person) {
  let score = 40;
  if (v.department === person.department) score += 25;
  if (v.city === person.city || v.format === "Удалённо") score += 15;
  const tenureMonths = parseInt(person.tenure, 10) || 0;
  if (tenureMonths < 12) {
    if (v.experience === "Без опыта" || v.experience === "От 1 года") score += 15;
    else if (v.experience === "От 5 лет") score -= 15;
    else score += 5;
  } else {
    score += 10;
  }
  return Math.max(30, Math.min(96, score));
}

// Короткие человеко-читаемые причины совпадения — те же факторы, что и в
// aiVacancyMatchScore, только словами, плюс ключевые навыки вакансии для
// понимания "чем" она подходит (в профиле сотрудника нет своих навыков,
// поэтому сравниваем с тем, что реально есть — подразделением/городом/опытом).
function aiVacancyMatchReasons(v, person) {
  const lines = [];
  if (v.department === person.department) lines.push("Совпадает подразделение — это внутренний переход");
  if (v.city === person.city) lines.push("Город совпадает с вашим");
  else if (v.format === "Удалённо") lines.push("Формат удалённый — город не важен");
  const tenureMonths = parseInt(person.tenure, 10) || 0;
  if (tenureMonths < 12) {
    if (v.experience === "Без опыта" || v.experience === "От 1 года") lines.push("Требования по опыту подходят новичку");
    else if (v.experience === "От 5 лет") lines.push("Опыта в требованиях больше, чем ваш стаж (" + person.tenure + ")");
  }
  lines.push("Ключевые навыки: " + v.requiredSkills.slice(0, 3).join(", "));
  return lines;
}

// ---------------- Разбор запросов: Сотрудник / витрина вакансий ----------------
// Витрина вакансий рендерится с двух разных путей (employee/vacancies.html и
// hr/vacancies.html — у HR она выглядит так же, как у Сотрудника), а карточка
// вакансии живёт только в employee/ — отсюда относительный путь зависит от того,
// с какой страницы сейчас построена ссылка.
function aiVacancyPath() {
  return /\/hr\//.test(window.location.pathname) ? "../employee/vacancy.html" : "vacancy.html";
}
function aiEmployeeVacanciesMatchIntent() {
  const D = window.SITE_DATA;
  const pool = D.vacancies.filter((v) => v.visibleToEmployees !== false && v.status === "open");
  const scored = pool.map((v) => ({ v, pct: aiVacancyMatchScore(v, D.person) })).sort((a, b) => b.pct - a.pct).slice(0, 5);
  const results = scored.map(({ v, pct }) => ({
    id: v.id, title: v.title, subtitle: v.city + " · " + v.department,
    reasons: aiVacancyMatchReasons(v, D.person).concat([aiVacancySalaryLine(v)]), matchPct: pct,
    actions: [
      { kind: "link", label: "Открыть", href: aiVacancyPath() + "?id=" + v.id },
      { kind: "apply", label: "Откликнуться", vacancyId: v.id },
    ],
  }));
  return { text: "Оценил открытые вакансии по подразделению, городу и опыту — вот что подходит лучше всего:", results };
}
function aiEmployeeVacanciesIntent(queryRaw) {
  const D = window.SITE_DATA;
  const raw = (queryRaw || "").trim();
  if (raw.indexOf("__applyConfirm:") === 0) {
    const vacancy = D.vacancies.find((v) => v.id === raw.slice("__applyConfirm:".length));
    if (!vacancy) return { text: "Не нашёл эту вакансию.", results: [] };
    return { text: "Открываю форму отклика на «" + vacancy.title + "» с черновиком письма…", results: [], action: "navigateApply", actionPayload: vacancy.id };
  }
  if (raw.indexOf("__apply:") === 0) {
    const vacancy = D.vacancies.find((v) => v.id === raw.slice("__apply:".length));
    if (!vacancy) return { text: "Не нашёл эту вакансию.", results: [] };
    const blocked = aiVacancyApplyGuard(vacancy);
    if (blocked) return { text: blocked, results: [] };
    return {
      text: "Помочь заполнить отклик на «" + vacancy.title + "»? Вам останется его проверить перед отправкой.",
      results: [],
      confirm: { yesLabel: "Да, заполни", yesQuery: "__applyConfirm:" + vacancy.id },
    };
  }
  const q = raw.toLowerCase();
  if (!q) return null;
  if (q.indexOf("подходящ") !== -1 || q.indexOf("мне подойд") !== -1 || q.indexOf("меня подойд") !== -1) {
    return aiEmployeeVacanciesMatchIntent();
  }
  const pool = D.vacancies.filter((v) => v.visibleToEmployees !== false && v.status === "open");
  const constraints = [];
  const cityList = D.cities.filter((c) => c !== "Удалённо");
  const stem = (s) => (s.length > 5 ? s.slice(0, 5) : s);
  const foundCity = cityList.find((c) => q.indexOf(stem(c.toLowerCase())) !== -1);
  if (foundCity) constraints.push((v) => v.city === foundCity);
  if (q.indexOf("удал") !== -1) constraints.push((v) => v.format === "Удалённо");
  else if (q.indexOf("гибрид") !== -1) constraints.push((v) => v.format === "Гибрид");
  else if (q.indexOf("офис") !== -1) constraints.push((v) => v.format === "Офис");
  if (q.indexOf("подразделен") !== -1 || q.indexOf("департамент") !== -1) {
    constraints.push((v) => v.department === D.person.department);
  }
  if (q.indexOf("должност") !== -1) constraints.push((v) => v.title === D.person.position);

  let matched;
  if (constraints.length) {
    matched = pool.filter((v) => constraints.every((fn) => fn(v)));
  } else {
    matched = pool.filter((v) =>
      v.title.toLowerCase().indexOf(q) !== -1 || v.direction.toLowerCase().indexOf(q) !== -1
      || v.department.toLowerCase().indexOf(q) !== -1 || v.city.toLowerCase().indexOf(q) !== -1);
  }
  const results = matched.map((v) => ({
    id: v.id, title: v.title, subtitle: v.city + " · " + v.department,
    reasons: [aiVacancySalaryLine(v)], href: aiVacancyPath() + "?id=" + v.id, openLabel: "Открыть вакансию",
  }));
  return {
    text: results.length
      ? "Нашёл " + results.length + " " + aiPluralRu(results.length, "вакансию", "вакансии", "вакансий") + ":"
      : "По такому запросу вакансий не нашлось — попробуйте другой город или формат работы.",
    results,
  };
}

// ---------------- Разбор запросов: Сотрудник / карточка вакансии ----------------
function aiCurrentVacancy() {
  const D = window.SITE_DATA;
  const id = new URLSearchParams(window.location.search).get("id");
  return D.vacancies.find((v) => v.id === id) || D.vacancies[0];
}
function aiEmployeeVacancyMatchIntent() {
  const D = window.SITE_DATA;
  const vacancy = aiCurrentVacancy();
  const person = D.person;
  const sameDept = vacancy.department === person.department;
  const sameCity = vacancy.city === person.city;
  const lines = [];
  lines.push(sameDept
    ? "Вакансия в вашем текущем подразделении (" + person.department + ") — это внутренний переход."
    : "Подразделение вакансии — «" + vacancy.department + "», у вас сейчас «" + person.department + "».");
  lines.push(sameCity
    ? "Город совпадает с вашим (" + person.city + ")."
    : "Город вакансии — " + vacancy.city + " (формат: " + vacancy.format + "), у вас указан " + person.city + ".");
  lines.push("Грейд " + vacancy.grade + ", опыт " + vacancy.experience + " — сопоставьте с вашим стажем в текущей роли (" + person.tenure + ").");
  lines.push("Ключевые навыки в требованиях: " + vacancy.requiredSkills.join(", ") + ".");
  lines.push("Если появятся вопросы — можно написать рекрутёру, " + vacancy.recruiter.name + ".");
  return { text: lines.join("\n"), results: [] };
}
// Женский род определяем по окончанию отчества ("-вна") — единственный надёжный
// признак пола в моковых данных профиля (нет отдельного поля gender).
function aiIsFemale(person) {
  return !!(person.patronymic && person.patronymic.slice(-2) === "на");
}
function aiVacancyLetterDraft(vacancy) {
  const D = window.SITE_DATA;
  const p = D.person;
  const g = aiIsFemale(p) ? "а" : "";
  const sameDept = vacancy.department === p.department;
  const reasonLine = sameDept
    ? "Хочу применить опыт, накопленный в текущей команде, уже на новом уровне ответственности."
    : "Хочу попробовать себя в новом направлении — уверен" + g + ", что быстро войду в контекст.";
  return "Здравствуйте! Меня заинтересовала позиция «" + vacancy.title + "». Сейчас работаю на позиции «" + p.position + "» в подразделении «" + p.department + "», стаж в компании — " + p.tenure + ". " + reasonLine + " Буду рад" + g + " обсудить детали.";
}
// Общая проверка для обоих входов в сценарий отклика (карточка вакансии и
// кнопка "Откликнуться" прямо в карточке результата на витрине).
function aiVacancyApplyGuard(vacancy) {
  const D = window.SITE_DATA;
  if (vacancy.status === "closed") return "Вакансия «" + vacancy.title + "» уже закрыта — отклик отправить нельзя.";
  const already = D.myResponses.find((r) => r.vacancyId === vacancy.id);
  if (already) return "Вы уже откликались на «" + vacancy.title + "» — повторный отклик не нужен, статус можно посмотреть в разделе «Мои отклики».";
  return null;
}
function aiEmployeeVacancyResponseIntent() {
  const vacancy = aiCurrentVacancy();
  const blocked = aiVacancyApplyGuard(vacancy);
  if (blocked) return { text: blocked, results: [] };
  const letter = aiVacancyLetterDraft(vacancy);
  return {
    text: "Подставляю ваши данные из профиля и черновик мотивационного письма:\n\n«" + letter + "»\n\nОткрываю форму отклика — проверьте, прикрепите резюме и отправьте сами.",
    results: [], action: "openApplyModal", actionPayload: letter,
  };
}
function aiEmployeeVacancyIntent(queryRaw) {
  const q = (queryRaw || "").toLowerCase();
  if (q.indexOf("отклик") !== -1 || q.indexOf("заявк") !== -1) return aiEmployeeVacancyResponseIntent();
  return aiEmployeeVacancyMatchIntent();
}

// ---------------- Разбор запросов: Сотрудник / мой план адаптации ----------------
// В отличие от остальных сценариев виджет не переходит на другую страницу, а
// открывает нужный дровер/модалку прямо на текущей странице плана — так же, как
// уже устроен переход в мастер целей у руководителя (window.__skAiOpenGoalModal).
// Синтетические команды ("__openSubgoal:...", "__openCheckpoint:...", "__openItem:...")
// приходят от кнопок в карточках результата, а не от текста, который ввёл пользователь.
// Локальные копии helper'ов из employee/plan.html — тот инлайновый скрипт не
// экспортирует их на window, а виджет живёт в отдельном shell.js.
function aiStripDuePrefix(label) {
  return (label || "").replace(/^до\s+/i, "");
}
function aiFindChecklistItem(plan, id) {
  for (const s of plan.stages) {
    const it = s.items.find((i) => i.id === id);
    if (it) return { item: it, stage: s };
  }
  return null;
}
function aiEmployeePlanCurrent() {
  const D = window.SITE_DATA;
  const id = new URLSearchParams(window.location.search).get("plan");
  return D.plans[id] || D.plans.onboarding;
}
function aiEmployeePlanUpcomingCheckpoint(plan) {
  const cps = Object.values(plan.checkpoints || {});
  return cps.find((c) => c.status !== "done") || null;
}
function aiEmployeePlanActiveSubgoals(plan) {
  return (plan.goals || []).flatMap((g) => (g.subgoals || [])
    .filter((sg) => sg.status === "in_progress" || sg.status === "returned")
    .map((sg) => ({ ...sg, goalId: g.id, goalTitle: g.title })));
}
function aiEmployeePlanUrgentChecklist(plan) {
  return plan.stages.flatMap((s) => s.items.filter((i) => i.kind !== "checkpoint" && !i.done && i.highlight === "warning"));
}
// ---------------- Поиск по FAQ плана ----------------
// Наставники в контакт-центре перегружены — это подтверждают отзывы сотрудников
// («огромная загруженность наставников»). Поэтому вопрос, который новичок задал бы
// наставнику, должен закрываться без него. Помощник не держит собственную базу:
// он ищет по тем же карточкам FAQ, которые сотрудник видит во вкладке плана, —
// один источник правды, и его наполняет заказчик, а не разработчик.
// Синонимы нужны потому, что в чат пишут разговорно («клиент послал»),
// а в FAQ формулировки нейтральные («оскорбления»).
const AI_FAQ_SYNONYMS = [
  { when: ["мат", "оскорб", "груб", "хам", "кричит", "орет", "орёт", "послал", "нецензур", "обозвал"], add: "оскорбления грубит" },
  { when: ["угрож", "угроз", "жалоб", "суд", "прокурат"], add: "угрожает жалобой" },
  { when: ["плач", "истер", "горе", "болен", "умер"], add: "плачет тяжёлая ситуация" },
  { when: ["руководит", "старшего", "начальник"], add: "требует руководителя" },
  { when: ["не знаю", "незнаю", "нет в скрипте", "не нашёл", "не нашел"], add: "скрипте базе знаний уточню" },
  { when: ["сбой", "завис", "оборвал", "отключ"], add: "зависла оборвался" },
  { when: ["ошиб", "напутал", "неправильно сказал", "неверно сказал"], add: "неверное исправить" },
  { when: ["идентифик", "персональн", "паспорт", "чужие данные"], add: "идентификацию данные" },
  { when: ["очеред", "затян", "долго говор"], add: "затянулся очередь" },
  { when: ["страшно", "боюсь", "волну", "первый звонок"], add: "страшно первым звонком" },
  { when: ["наставник", "никто не отвеч"], add: "наставник занят" },
  { when: ["преми", "зарплат", "деньг", "выплат", "оплачив", "доход"], add: "доход премия оплачивается" },
  { when: ["метрик", "оцен", "балл", "прослушк", "норматив"], add: "оценка метрикам баллов норматив" },
  { when: ["перерыв", "график"], add: "перерывы расписанию" },
  { when: ["дистанц", "удалён", "удален", "из дома"], add: "дистанционно супервайзер" },
  { when: ["проект законч", "другой проект", "переве"], add: "проект закончится" },
  { when: ["тестирован", "экзамен", "аттест", "допуск"], add: "тестирование обучения" },
  { when: ["пропустил", "прогул", "заболел"], add: "пропустил обучения" },
];
// Слова, которые встречаются почти в каждой карточке и поэтому ничего не различают.
const AI_FAQ_STOP = ["клиент", "делать", "нужно", "можно", "когда", "почему", "какой", "какие",
  "этот", "если", "чтобы", "будет", "план", "плана", "работа", "работе", "сотрудник", "смены", "свой"];

function aiFaqExpand(q) {
  let out = q;
  AI_FAQ_SYNONYMS.forEach((syn) => { if (syn.when.some((w) => q.indexOf(w) !== -1)) out += " " + syn.add; });
  return out;
}

function aiFaqLookup(plan, q) {
  const faq = (plan && plan.faq) || [];
  if (!faq.length) return null;
  const tokens = aiFaqExpand(q)
    .split(/[^a-zа-яё0-9ё]+/i)
    .filter((t) => t.length >= 4 && AI_FAQ_STOP.indexOf(t) === -1);
  if (!tokens.length) return null;
  const stem = (t) => t.slice(0, Math.max(4, t.length - 2));
  const scored = faq.map((f) => {
    const inQ = f.q.toLowerCase(), hay = (f.q + " " + f.a).toLowerCase();
    let score = 0;
    tokens.forEach((t) => {
      const st = stem(t);
      if (hay.indexOf(st) !== -1) score += 1;
      if (inQ.indexOf(st) !== -1) score += 1; // совпадение в самом вопросе весит вдвое
    });
    return { f, score };
  }).filter((x) => x.score >= 3).sort((a, b) => b.score - a.score);
  if (!scored.length) return null;
  const best = scored[0].f;
  return {
    text: best.q + "\n\n" + best.a,
    results: scored.slice(1, 3).map((x, i) => ({
      id: "faq-" + i, title: x.f.q, subtitle: "Ещё в FAQ плана",
      actions: [{ kind: "query", label: "Показать ответ", query: x.f.q }],
    })),
  };
}

function aiEmployeePlanIntent(queryRaw) {
  const D = window.SITE_DATA;
  const plan = aiEmployeePlanCurrent();
  const raw = (queryRaw || "").trim();

  if (raw.indexOf("__openSubgoal:") === 0) {
    const [goalId, subgoalId] = raw.slice("__openSubgoal:".length).split(":");
    const goal = (plan.goals || []).find((g) => g.id === goalId);
    const sg = goal && goal.subgoals.find((s) => s.id === subgoalId);
    if (!sg) return { text: "Не нашёл этот шаг.", results: [] };
    return { text: "Открываю шаг «" + sg.title + "»…", results: [], action: "openSubgoal", actionPayload: { goalId, subgoalId } };
  }
  if (raw.indexOf("__openCheckpoint:") === 0) {
    const cpId = raw.slice("__openCheckpoint:".length);
    const cp = plan.checkpoints[cpId];
    if (!cp) return { text: "Не нашёл эту контрольную точку.", results: [] };
    return { text: "Открываю контрольную точку «" + cp.title + "»…", results: [], action: "openCheckpoint", actionPayload: cpId };
  }
  if (raw.indexOf("__openItem:") === 0) {
    const itemId = raw.slice("__openItem:".length);
    const found = aiFindChecklistItem(plan, itemId);
    if (!found) return { text: "Не нашёл этот шаг.", results: [] };
    return { text: "Открываю «" + found.item.title + "»…", results: [], action: "openItem", actionPayload: itemId };
  }

  const q = raw.toLowerCase();
  if (!q) return null;
  const activeSubgoals = aiEmployeePlanActiveSubgoals(plan);
  const urgentChecklist = aiEmployeePlanUrgentChecklist(plan);
  const nextCp = aiEmployeePlanUpcomingCheckpoint(plan);

  if (q.indexOf("контрольн") !== -1 || q.indexOf(" кт") !== -1) {
    if (!nextCp) return { text: "Ближайших контрольных точек по этому плану сейчас нет.", results: [] };
    const stepsText = (nextCp.agenda || []).map((a) => "• " + a).join("\n");
    const surveyLine = nextCp.survey ? nextCp.survey.length + " " + aiPluralRu(nextCp.survey.length, "вопрос", "вопроса", "вопросов") + " в коротком опросе." : "";
    return {
      text: "К контрольной точке «" + nextCp.title + "» (" + nextCp.dueLabel + "):\n\n" + stepsText + "\n\n" + surveyLine,
      results: [{
        id: nextCp.id, title: nextCp.title, subtitle: (nextCp.daysLeftLabel ? nextCp.daysLeftLabel + " · " : "") + nextCp.dueLabel,
        actions: [{ kind: "query", label: "Пройти контрольную точку", query: "__openCheckpoint:" + nextCp.id }],
      }],
    };
  }

  if (q.indexOf("работе") !== -1 || q.indexOf("текущ") !== -1) {
    if (!activeSubgoals.length) return { text: "Сейчас нет шагов, взятых в работу — загляните во вкладку «Цели адаптации» и возьмите очередной шаг.", results: [] };
    return {
      text: "Вот что у вас сейчас в работе:",
      results: activeSubgoals.map((sg) => ({
        id: sg.id, title: sg.title, subtitle: sg.goalTitle + " · " + aiStripDuePrefix(sg.dueLabel),
        actions: [{ kind: "query", label: "Открыть", query: "__openSubgoal:" + sg.goalId + ":" + sg.id }],
      })),
    };
  }

  if (q.indexOf("провер") !== -1) {
    const pending = (plan.goals || []).flatMap((g) => (g.subgoals || [])
      .filter((sg) => sg.status === "pending_review")
      .map((sg) => ({ ...sg, goalId: g.id, goalTitle: g.title })));
    if (!pending.length) return { text: "Сейчас ничего не ждёт проверки руководителя.", results: [] };
    return {
      text: "На проверке у руководителя сейчас:",
      results: pending.map((sg) => ({
        id: sg.id, title: sg.title, subtitle: (sg.reviewer || D.manager.name) + " · " + aiStripDuePrefix(sg.dueLabel),
        actions: [{ kind: "query", label: "Открыть", query: "__openSubgoal:" + sg.goalId + ":" + sg.id }],
      })),
    };
  }

  if (q.indexOf("сегодня") !== -1 || q.indexOf("сделать") !== -1) {
    const results = [];
    urgentChecklist.forEach((it) => results.push({
      id: "item-" + it.id, title: it.title, subtitle: "Базовые действия",
      warning: "Осталось 2 дня",
      actions: [{ kind: "query", label: "Открыть", query: "__openItem:" + it.id }],
    }));
    activeSubgoals.forEach((sg) => results.push({
      id: "sg-" + sg.id, title: sg.title, subtitle: sg.goalTitle + " · " + aiStripDuePrefix(sg.dueLabel),
      actions: [{ kind: "query", label: "Открыть", query: "__openSubgoal:" + sg.goalId + ":" + sg.id }],
    }));
    if (nextCp) results.push({
      id: "cp-" + nextCp.id, title: nextCp.title, subtitle: (nextCp.daysLeftLabel ? nextCp.daysLeftLabel + " · " : "") + nextCp.dueLabel,
      actions: [{ kind: "query", label: "Пройти контрольную точку", query: "__openCheckpoint:" + nextCp.id }],
    });
    return {
      text: results.length ? "Вот что сейчас актуально по вашему плану адаптации:" : "Срочных задач по плану сейчас нет — можно спокойно двигаться в своём темпе.",
      results,
    };
  }

  // Всё, что не про навигацию по плану, пробуем ответить из FAQ — это и есть
  // разгрузка наставника: вопрос закрывается там же, где задан.
  const fromFaq = aiFaqLookup(plan, q);
  if (fromFaq) return fromFaq;

  return null;
}

// ---------------- Разбор запросов: Главная / режим "Команда" ----------------
// Та же логика, что у aiManagerTeamIntent (manager/team.html), продублирована здесь с
// hrefs относительно employee/, потому что вызывается с Главной, а не со страницы команды.
function aiHomeTeamIntent(q) {
  const D = window.SITE_DATA;
  if (q.indexOf("саммариз") !== -1) {
    return {
      text: "Сильные стороны: исследование пользователей и работа с гипотезами. Зона развития: финансовое моделирование. Резюме — по последнему доступному отчёту 360.",
      results: [],
    };
  }
  let test, label;
  if (q.indexOf("риск") !== -1) { test = (m) => m.risks.length > 0; label = "с риском по адаптации"; }
  else if (q.indexOf("не начал") !== -1) { test = (m) => m.status === "not_started"; label = "которые ещё не начали план"; }
  else if (q.indexOf("вниман") !== -1 || q.indexOf("действ") !== -1 || q.indexOf("нужно") !== -1) { test = (m) => m.risks.length > 0 || !!m.action; label = "которым нужно внимание"; }
  else return null;
  const results = D.team.filter(test).map((m) => ({
    id: m.id, title: m.name, subtitle: m.position + " · " + m.department,
    href: "../manager/plan.html?employee=" + m.id, openLabel: "Открыть план сотрудника",
    risks: m.risks.length ? m.risks : null,
  }));
  return {
    text: results.length
      ? "Нашёл " + results.length + " " + aiPluralRu(results.length, "сотрудника", "сотрудников", "сотрудников") + " " + label + ":"
      : "Сейчас таких сотрудников нет.",
    results,
  };
}

// ---------------- Разбор запросов: Главная / режим "Администрирование" ----------------
// Та же логика, что у aiHrPlansIntent (hr/plans.html), продублирована здесь с hrefs
// относительно employee/.
function aiHomeAdminIntent(q) {
  const D = window.SITE_DATA;
  if (q.indexOf("черновик курса") !== -1 || q.indexOf("создать курс") !== -1) {
    return {
      text: "Готовлю структуру курса: 3 раздела (теория, практика, итоговый тест). Дальше уточним программу в редакторе материалов.",
      results: [],
    };
  }
  if (q.indexOf("сгенерировать тест") !== -1) {
    return {
      text: "Подготовила 10 вопросов: 6 с одним ответом, 3 с несколькими и 1 открытый. Можно проверить формулировки перед публикацией.",
      results: [],
    };
  }
  let test, label;
  if (q.indexOf("риск") !== -1) { test = (p) => p.risks && p.risks.length > 0; label = "с риском"; }
  else if (q.indexOf("цел") !== -1 && (q.indexOf("без") !== -1 || q.indexOf("не опубликова") !== -1)) { test = (p) => !p.goalsPublished; label = "без опубликованных целей"; }
  else if (q.indexOf("просроч") !== -1 || q.indexOf("контрольн") !== -1) { test = (p) => p.overdueCheckpoint; label = "с просроченной контрольной точкой"; }
  else return null;
  const results = D.hrAssignedPlans.filter(test).map((p) => ({
    id: p.id, title: p.name, subtitle: p.planTitle + " · " + p.department,
    href: "../hr/plan-detail.html?id=" + p.id, openLabel: "Открыть план",
  }));
  return {
    text: results.length
      ? "Нашёл " + results.length + " " + aiPluralRu(results.length, "план", "плана", "планов") + " " + label + ":"
      : "Планов " + label + " сейчас нет.",
    results,
  };
}

// ---------------- Разбор запросов: Сотрудник / Главная ----------------
// Переиспользует те же вопросы, что и виджет на самой странице плана
// (aiEmployeePlanIntent), но результаты всегда ведут обратно на employee/plan.html
// обычной ссылкой, а не открывают дровер конкретного шага "на месте" —
// window.__skAiOpenSubgoal/__skAiOpenCheckpoint/__skAiOpenItem регистрирует только
// сама страница плана (см. employee/plan.html), на "Главной" их не существует, и
// синтетические команды __openSubgoal:/__openItem: там бы просто ничего не сделали.
// Вопросы про вакансии отдаём как есть в aiEmployeeVacanciesIntent — там уже настоящие
// ссылки и action:"navigateApply" (location.href), которые работают с любой страницы.
function aiEmployeeHomeIntent(queryRaw) {
  const raw = (queryRaw || "").trim();
  if (raw.indexOf("__apply") === 0) return aiEmployeeVacanciesIntent(raw);
  const q = raw.toLowerCase();
  if (!q) return null;
  if (q.indexOf("вакан") !== -1 || q.indexOf("подходя") !== -1) return aiEmployeeVacanciesIntent(raw);

  // "Оценка" и "ИПР" не реализованы как отдельные разделы в этом прототипе (нет своих
  // страниц/данных), но Главная показывает по ним иллюстративный пример контента для демо —
  // здесь только текстовый ответ, без карточек-результатов, чтобы не было ссылок в никуда.
  // Проверяем раньше "курс"/"обучен", иначе "Подобрать обучение по целям ИПР" перехватит
  // соседняя ветка про курсы.
  // Подбор обучения под цели ИПР — единственный сценарий по ИПР, доведённый до карточек:
  // цели ИПР заданы здесь же (своих данных у ИПР в прототипе нет), а вот пересечение с
  // планом адаптации настоящее — курс e19 действительно назначен Юлии на этапе
  // "Продвинутые материалы", и повторно предлагать его как новое обучение было бы враньём.
  // Поэтому он показан отдельной карточкой со ссылкой в план, а в подтверждении явно
  // исключён из добавляемых. Проверяем раньше общей ветки про ИПР — иначе она перехватит.
  if (raw === "__idpAddLearning") {
    return {
      text: "Добавила три курса в черновик ИПР «Развитие продуктовых компетенций» — задачами к соответствующим целям, со сроками до дат целей.\n\nКурс по работе с возражениями дублировать не стала: он уже назначен вам в плане адаптации.\n\nЧерновик уйдёт руководителю на согласование вместе с ИПР — до согласования вы можете поправить состав.",
      results: [],
    };
  }
  if (q.indexOf("ипр") !== -1 && (q.indexOf("обучен") !== -1 || q.indexOf("курс") !== -1 || q.indexOf("подобрать") !== -1)) {
    const idpPlanHref = "plan.html?plan=" + aiEmployeePlanCurrent().id;
    return {
      text: "В ИПР «Развитие продуктовых компетенций» две цели. Подобрала обучение под каждую — по разрывам из оценки 360 и требований к роли:",
      results: [
        {
          id: "idp-l1", title: "Продукт компании: расширенный курс",
          subtitle: "Курс · 4 часа · каталог обучения",
          action: "Цель «Проводить демо продукта без пресейла» · закрывает разрыв по модулям и интеграциям",
        },
        {
          id: "idp-l2", title: "Демонстрация продукта: сценарии и вопросы клиента",
          subtitle: "Курс · 2 часа · каталог обучения",
          action: "Цель «Проводить демо продукта без пресейла» · практика на типовых возражениях по функционалу",
        },
        {
          id: "idp-l3", title: "Расчёт и защита коммерческого предложения",
          subtitle: "Курс · 3 часа · каталог обучения",
          action: "Цель «Готовить КП по сложным сделкам» · разбор скидок, рассрочек и нестандартных условий",
        },
        {
          id: "idp-l4", title: "Курс по работе с возражениями",
          subtitle: "Уже назначен вам — этап «Продвинутые материалы» плана адаптации",
          action: "Цель «Готовить КП по сложным сделкам» · отдельно назначать не нужно",
          href: idpPlanHref, openLabel: "Открыть план адаптации",
        },
      ],
      confirm: { yesLabel: "Добавить в ИПР", yesQuery: "__idpAddLearning" },
    };
  }
  if (q.indexOf("ипр") !== -1 || q.indexOf("план развития") !== -1) {
    return {
      text: "Ваш ИПР «Развитие продуктовых компетенций» сейчас заполнен на 30% (2 цели, 5 задач), черновик. Раздел «ИПР» ещё не реализован в этом прототипе как отдельная страница, но по итогам последней оценки 360 я уже смогу предложить цели и подобрать под них обучение.",
      results: [],
    };
  }
  if (q.indexOf("360") !== -1 || q.indexOf("оценк") !== -1) {
    return {
      text: "Ближайшая оценка — самооценка «Product competencies», 12 вопросов, до 20 августа. Раздел «Оценка» ещё не реализован в этом прототипе как отдельная страница, но помочь подготовиться я уже могу: соберу список компетенций и последние комментарии руководителя.",
      results: [],
    };
  }
  if (q.indexOf("отчёт") !== -1 || q.indexOf("отчет") !== -1) {
    return {
      text: "Отдельного раздела отчётов в этом прототипе пока нет, но я уже могу собрать сводку: прогресс по плану адаптации, пройденные курсы, статус целей. Что включить в отчёт?",
      results: [],
    };
  }
  // Режимы "Команда"/"Администрирование" на Главной (см. employee/home.html) переиспользуют
  // те же вопросы, что и у настоящих aiManagerTeamIntent/aiHrPlansIntent (manager/team.html,
  // hr/plans.html) — но с реальными D.team/D.hrAssignedPlans и ссылками относительно
  // employee/, а не копированием чужих hrefs, которые вели бы не туда с этой страницы.
  const teamReply = aiHomeTeamIntent(q);
  if (teamReply) return teamReply;
  const adminReply = aiHomeAdminIntent(q);
  if (adminReply) return adminReply;

  const plan = aiEmployeePlanCurrent();
  const planHref = "plan.html?plan=" + plan.id;
  const nextCp = aiEmployeePlanUpcomingCheckpoint(plan);
  const activeSubgoals = aiEmployeePlanActiveSubgoals(plan);
  const urgentChecklist = aiEmployeePlanUrgentChecklist(plan);

  if (q.indexOf("контрольн") !== -1 || q.indexOf(" кт") !== -1) {
    if (!nextCp) return { text: "Ближайших контрольных точек по плану адаптации сейчас нет.", results: [] };
    return {
      text: "К контрольной точке «" + nextCp.title + "» (" + nextCp.dueLabel + "):",
      results: [{
        id: nextCp.id, title: nextCp.title,
        subtitle: (nextCp.daysLeftLabel ? nextCp.daysLeftLabel + " · " : "") + nextCp.dueLabel,
        href: planHref, openLabel: "Открыть план адаптации",
      }],
    };
  }
  if (q.indexOf("работе") !== -1 || q.indexOf("текущ") !== -1) {
    if (!activeSubgoals.length) return { text: "Сейчас нет шагов, взятых в работу — загляните в план адаптации и возьмите очередной шаг.", results: [] };
    return {
      text: "Вот что у вас сейчас в работе:",
      results: activeSubgoals.map((sg) => ({
        id: sg.id, title: sg.title, subtitle: sg.goalTitle + " · " + aiStripDuePrefix(sg.dueLabel),
        href: planHref, openLabel: "Открыть план адаптации",
      })),
    };
  }
  if (q.indexOf("курс") !== -1 || q.indexOf("обучен") !== -1) {
    const courseItems = plan.stages.flatMap((s) => s.items.filter((i) => i.kind === "course"));
    if (!courseItems.length) return { text: "В плане адаптации пока нет курсов.", results: [] };
    return {
      text: "Вот курсы из вашего плана адаптации:",
      results: courseItems.map((c) => ({
        id: c.id, title: c.title, subtitle: c.done ? "Пройден" : (c.date ? "Начнётся " + c.date : "Ещё не начат"),
        href: planHref, openLabel: "Открыть план адаптации",
      })),
    };
  }
  if (q.indexOf("сегодня") !== -1 || q.indexOf("сделать") !== -1) {
    const results = [];
    urgentChecklist.forEach((it) => results.push({
      id: "item-" + it.id, title: it.title, subtitle: "Базовые действия",
      warning: "Осталось 2 дня",
      href: planHref, openLabel: "Открыть план адаптации",
    }));
    activeSubgoals.forEach((sg) => results.push({
      id: "sg-" + sg.id, title: sg.title, subtitle: sg.goalTitle + " · " + aiStripDuePrefix(sg.dueLabel),
      href: planHref, openLabel: "Открыть план адаптации",
    }));
    if (nextCp) results.push({
      id: "cp-" + nextCp.id, title: nextCp.title,
      subtitle: (nextCp.daysLeftLabel ? nextCp.daysLeftLabel + " · " : "") + nextCp.dueLabel,
      href: planHref, openLabel: "Открыть план адаптации",
    });
    return {
      text: results.length ? "Вот что сейчас актуально по вашему плану адаптации:" : "Срочных задач по плану сейчас нет — можно спокойно двигаться в своём темпе.",
      results,
    };
  }
  const fromFaq = aiFaqLookup(aiEmployeePlanCurrent(), q);
  if (fromFaq) return fromFaq;

  return null;
}

// ---------------- Конфигурация виджета по текущей странице ----------------
function aiPageKey() {
  const p = window.location.pathname;
  if (/\/employee\/home\.html$/.test(p)) return "employee-home";
  if (/\/hr\/plans\.html$/.test(p)) return "hr-plans";
  if (/\/manager\/team\.html$/.test(p)) return "manager-team";
  if (/\/manager\/plan\.html$/.test(p)) return "manager-plan";
  if (/\/employee\/vacancies\.html$/.test(p)) return "employee-vacancies";
  if (/\/hr\/vacancies\.html$/.test(p)) return "employee-vacancies";
  if (/\/employee\/vacancy\.html$/.test(p)) return "employee-vacancy";
  if (/\/hr\/vacancy\.html$/.test(p)) return "employee-vacancy";
  if (/\/employee\/plan\.html$/.test(p)) return "employee-plan";
  return null;
}
const AI_PAGE_CONFIG = {
  "employee-home": {
    chips: ["Что мне сделать сегодня?", "Подготовиться к контрольной точке", "Какие курсы у меня есть?", "Подобрать обучение по целям ИПР", "Какие вакансии мне подходят?"],
    resolve: aiEmployeeHomeIntent,
  },
  "hr-plans": {
    chips: ["Какие планы у меня в риске?", "Где ещё не опубликованы цели?", "Где просрочены контрольные точки?"],
    resolve: aiHrPlansIntent,
  },
  "manager-team": {
    chips: ["Кто требует моего внимания?", "Сотрудники с рисками в планах", "Кто ещё не начал план?"],
    resolve: aiManagerTeamIntent,
  },
  "manager-plan": {
    chips: ["Создать цели адаптации с AI"],
    resolve: aiManagerPlanIntent,
  },
  "employee-vacancies": {
    chips: ["Подходящие мне вакансии", "Есть вакансии в Москве?", "Есть вакансии удалённо?", "Вакансии в моём подразделении"],
    resolve: aiEmployeeVacanciesIntent,
  },
  "employee-vacancy": {
    chips: ["Подойдёт ли мне эта вакансия?", "Заполнить отклик за меня"],
    resolve: aiEmployeeVacancyIntent,
  },
  "employee-plan": {
    chips: ["Что мне сделать сегодня?", "Клиент грубит — что делать?", "Где искать ответ, если наставник занят?", "Что у меня в работе?", "Что сейчас на проверке?"],
    resolve: aiEmployeePlanIntent,
  },
};
const AI_FALLBACK_LINKS = {
  hr: { label: "Планы сотрудников", href: "hr/plans.html" },
  manager: { label: "Моя команда", href: "manager/team.html" },
  employee: { label: "Витрина вакансий", href: "employee/vacancies.html" },
};
const AI_GREETING = "Вижу что происходит на странице — подскажу, помогу с навигацией или выполню действия за вас. С чем помочь?";

function AiResultCardBody({ r }) {
  return (
    <React.Fragment>
      <div className="sk-row sk-gap-2" style={{ justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
        <div className="sk-label-3" style={{ color: "var(--sk-text-primary)", minWidth: 0 }}>{r.title}</div>
        {typeof r.matchPct === "number" && (
          <span style={{
            flexShrink: 0, display: "inline-flex", alignItems: "center", height: 20, padding: "0 8px",
            borderRadius: "var(--sk-radius-full)", background: "var(--sk-special-secondary)",
            color: "var(--sk-icon-special)", font: "var(--sk-label-4)",
          }}>Подходите на {r.matchPct}%</span>
        )}
      </div>
      <div className="sk-muted" style={{ font: "var(--sk-label-4-regular)", marginTop: 2 }}>{r.subtitle}</div>
      {r.action && (
        <div className="sk-row sk-gap-1" style={{
          marginTop: 6, alignItems: "flex-start", padding: "6px 8px",
          borderRadius: "var(--sk-radius-2)", background: "var(--sk-accent-secondary)",
        }}>
          <IconTarget size={13} color="var(--sk-icon-accent)" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ font: "var(--sk-label-4)", color: "var(--sk-text-primary)" }}>{r.action}</span>
        </div>
      )}
      {r.warning && (
        <div className="sk-row sk-gap-1" style={{
          marginTop: 6, alignItems: "flex-start", padding: "6px 8px",
          borderRadius: "var(--sk-radius-2)", background: "var(--sk-warning-secondary)",
        }}>
          <IconClock size={13} color="var(--sk-warning)" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ font: "var(--sk-label-4)", color: "var(--sk-text-warning-dark)" }}>{r.warning}</span>
        </div>
      )}
      {r.risks && r.risks.length > 0 && (
        <div style={{ marginTop: 6, padding: "8px 10px", borderRadius: "var(--sk-radius-2)", background: "var(--sk-negative-secondary)" }}>
          <div className="sk-row sk-gap-1" style={{ alignItems: "center", marginBottom: 4 }}>
            <IconAlertCircle size={13} color="var(--sk-icon-negative)" />
            <span style={{ font: "var(--sk-label-4)", color: "var(--sk-text-negative)" }}>Риски</span>
          </div>
          <div className="sk-col sk-gap-1">
            {r.risks.map((line, i) => (
              <div key={i} style={{ font: "var(--sk-label-4-regular)", color: "var(--sk-text-negative)" }}>• {line}</div>
            ))}
          </div>
        </div>
      )}
      {r.reasons && r.reasons.length > 0 && (
        <div className="sk-col sk-gap-1" style={{ marginTop: 4 }}>
          {r.reasons.map((line, i) => (
            <div key={i} className="sk-muted" style={{ font: "var(--sk-label-4-regular)" }}>
              {r.reasons.length > 1 ? "• " + line : line}
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

function AiBubble({ from, text, results, confirm, thinking, onSend }) {
  const isUser = from === "user";
  const avatar = (
    <span style={{
      display: "inline-flex", width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 2,
      background: "var(--sk-special-secondary)", alignItems: "center", justifyContent: "center",
    }}>
      <IconAiSpark size={14} color="var(--sk-icon-special)" />
    </span>
  );
  if (thinking) {
    return (
      <div className="sk-row sk-gap-2" style={{ alignItems: "center" }}>
        {avatar}
        <span className="sk-muted" style={{ font: "var(--sk-label-4-regular)" }}>Печатает…</span>
      </div>
    );
  }
  return (
    <div className="sk-row sk-gap-2" style={{ alignItems: "flex-start", flexDirection: isUser ? "row-reverse" : "row" }}>
      {!isUser && avatar}
      <div style={{ maxWidth: "84%", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{
          background: isUser ? "var(--sk-accent)" : "var(--sk-surface-secondary)",
          color: isUser ? "var(--sk-text-contrast)" : "var(--sk-text-primary)",
          borderRadius: "var(--sk-radius-3)", padding: "10px 14px", font: "var(--sk-label-3-regular)", whiteSpace: "pre-line",
        }}>{text}</div>
        {results && results.length > 0 && (
          <div className="sk-col sk-gap-2">
            {results.map((r) => {
              const cardStyle = {
                border: "1px solid var(--sk-stroke)", borderRadius: "var(--sk-radius-3)", padding: "10px 12px",
                background: "var(--sk-surface-page)", boxSizing: "border-box",
              };
              if (r.actions && r.actions.length > 0) {
                return (
                  <div key={r.id} style={cardStyle}>
                    <AiResultCardBody r={r} />
                    <div className="sk-row sk-gap-2" style={{ marginTop: 10 }}>
                      {r.actions.map((a, i) => (
                        <Button key={i} size="s" mode={a.kind === "apply" ? "primary" : "secondary"}
                          variant={a.kind === "apply" ? "accent" : undefined}
                          onClick={() => {
                            if (a.kind === "apply") onSend("__apply:" + a.vacancyId);
                            else if (a.kind === "query") onSend(a.query);
                            else window.location.href = a.href;
                          }}>
                          {a.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div key={r.id} style={cardStyle}>
                  <AiResultCardBody r={r} />
                  {r.openLabel && (
                    <div style={{ marginTop: 10 }}>
                      <Button size="s" mode="secondary" variant="neutral" onClick={() => { window.location.href = r.href; }}>
                        {r.openLabel}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {confirm && (
          <div className="sk-row sk-gap-2">
            <Button size="s" variant="accent" onClick={() => onSend(confirm.yesQuery)}>{confirm.yesLabel}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function AiAssistantWidget({ role }) {
  const pageKey = React.useMemo(aiPageKey, []);
  const config = pageKey ? AI_PAGE_CONFIG[pageKey] : null;
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const scrollRef = React.useRef(null);
  const msgRefs = React.useRef({});
  // Индекс сообщения, к которому надо прокрутить сразу после рендера — используется
  // только при открытии дровера снаружи (см. __skAiOpenAssistant), чтобы показать диалог
  // начиная с сообщения-запроса, а не с самого низа переписки.
  const [scrollToMsgIndex, setScrollToMsgIndex] = React.useState(null);
  // После прокрутки к конкретному сообщению дальше НЕ следуем автоматически к низу при
  // приходе ответа ИИ — пользователь сам долистает, когда захочет; обычный чат (открытие
  // кнопкой-шариком, ручной ввод) продолжает по умолчанию ехать к последнему сообщению.
  const autoScrollRef = React.useRef(true);

  React.useEffect(() => {
    if (!scrollRef.current) return;
    if (scrollToMsgIndex != null) {
      if (msgRefs.current[scrollToMsgIndex]) msgRefs.current[scrollToMsgIndex].scrollIntoView({ block: "start" });
      setScrollToMsgIndex(null);
      autoScrollRef.current = false;
      return;
    }
    if (autoScrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking, open]);

  // Точка входа для кнопок вне виджета ("Вакансии для меня" на витрине сотрудника) —
  // открывает дровер и сразу прогоняет запрос, как если бы его отправили в чат. Регистрируем
  // на каждый рендер (не только на монтирование), чтобы замыкание всегда видело актуальный send.
  React.useEffect(() => {
    window.__skAiOpenAssistant = (query) => {
      setOpen(true);
      if (query) { setScrollToMsgIndex(messages.length); send(query); }
    };
    return () => { delete window.__skAiOpenAssistant; };
  });

  // Ручная отправка (чип или поле ввода) — если до этого дровер был открыт кнопкой снаружи
  // и автопрокрутка была выключена, возвращаем обычное поведение чата.
  function sendFromUser(text) {
    autoScrollRef.current = true;
    send(text);
  }

  const greetingText = config
    ? AI_GREETING
    : "В этой демо-версии для этой страницы пока нет готового сценария." + (AI_FALLBACK_LINKS[role] ? " Попробуйте: «" + AI_FALLBACK_LINKS[role].label + "»." : "");

  function send(text) {
    const trimmed = (text || "").trim();
    if (!trimmed || thinking) return;
    // Синтетические команды ("__apply:vId" от кнопки "Откликнуться" в карточке,
    // "__applyConfirm:vId" от подтверждения) не показываем как реплику пользователя —
    // это клик по кнопке, а не текст, который он ввёл.
    const isSynthetic = trimmed.indexOf("__") === 0;
    if (!isSynthetic) setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setThinking(true);
    window.setTimeout(function () {
      const reply = (config && config.resolve && config.resolve(trimmed))
        || { text: "Не нашёл подходящего сценария для этого запроса в демо. Попробуйте один из вариантов выше.", results: [] };
      setThinking(false);
      setMessages((m) => [...m, { from: "ai", text: reply.text, results: reply.results || [], confirm: reply.confirm || null }]);
      if (reply.action === "openAiGoalModal") {
        window.setTimeout(function () {
          if (window.__skAiOpenGoalModal) { window.__skAiOpenGoalModal(); setOpen(false); }
        }, 500);
      }
      if (reply.action === "openApplyModal") {
        window.setTimeout(function () {
          if (window.__skAiOpenApplyModal) { window.__skAiOpenApplyModal(reply.actionPayload); setOpen(false); }
        }, 500);
      }
      if (reply.action === "navigateApply") {
        window.setTimeout(function () {
          window.location.href = aiVacancyPath() + "?id=" + reply.actionPayload + "&aiApply=1";
        }, 500);
      }
      if (reply.action === "openSubgoal") {
        window.setTimeout(function () {
          if (window.__skAiOpenSubgoal) { window.__skAiOpenSubgoal(reply.actionPayload); setOpen(false); }
        }, 500);
      }
      if (reply.action === "openCheckpoint") {
        window.setTimeout(function () {
          if (window.__skAiOpenCheckpoint) { window.__skAiOpenCheckpoint(reply.actionPayload); setOpen(false); }
        }, 500);
      }
      if (reply.action === "openItem") {
        window.setTimeout(function () {
          if (window.__skAiOpenItem) { window.__skAiOpenItem(reply.actionPayload); setOpen(false); }
        }, 500);
      }
    }, 550);
  }

  return (
    <React.Fragment>

      {open && (
        <div style={{
          position: "fixed", top: 12, right: 12, bottom: 12, width: 400, maxWidth: "calc(100vw - 24px)",
          background: "var(--sk-surface-page)", borderRadius: "var(--sk-radius-4)", boxShadow: "var(--sk-shadow-l)",
          display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 155,
        }}>
          <SkOverlayHeader dense
            title={<span className="sk-row sk-gap-2" style={{ alignItems: "center" }}><IconAiSpark size={18} color="var(--sk-icon-special)" />Skillaz AI</span>}
            onClose={() => setOpen(false)} />
          <div ref={scrollRef} className="sk-scroll" style={{ flex: "1 1 auto", overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <AiBubble from="ai" text={greetingText} />
            {config && config.chips.length > 0 && (
              <div className="sk-col sk-gap-2">
                {config.chips.map((c) => (
                  <button key={c} onClick={() => sendFromUser(c)} className="sk-clickable" style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
                    border: "1px solid var(--sk-stroke)", background: "var(--sk-surface-page)",
                    borderRadius: "var(--sk-radius-3)", padding: "10px 14px", font: "var(--sk-label-3-regular)",
                    color: "var(--sk-text-primary)", cursor: "pointer",
                  }}>
                    <IconAiSpark size={14} color="var(--sk-icon-special)" style={{ flexShrink: 0 }} />
                    {c}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} ref={(el) => { msgRefs.current[i] = el; }}>
                <AiBubble from={m.from} text={m.text} results={m.results} confirm={m.confirm} onSend={sendFromUser} />
              </div>
            ))}
            {thinking && <AiBubble from="ai" thinking />}
          </div>
          <div style={{ flexShrink: 0, borderTop: "1px solid var(--sk-stroke-divider)", padding: 14 }}>
            <div className="sk-row sk-gap-2">
              <Input size="s" placeholder="Спросите что-нибудь…" value={input}
                onChange={(e) => setInput(e.target.value || "")}
                onKeyDown={(e) => { if (e.key === "Enter") sendFromUser(input); }}
                style={{ flex: 1 }} />
              <IconButton size="s" mode="primary" variant="accent" disabled={!input.trim()}
                onClick={() => sendFromUser(input)} title="Отправить">
                <IconSend size={16} />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

// ---------------- Обложка карточки плана ----------------
// Вертикальный блок слева от содержимого карточки, на всю её высоту: цвет плана и
// диагональ из исходной обложки, без иконки — с ней обложка читалась слишком пёстро.
// Контур ленты обведён из assets/cover NN.png и лежит в assets/cover-art.js. Компонент
// общий для ролей "Сотрудник" и "Кандидат".
//
// Все обложки берут ленту жёлтой картинки и одно окно: через плитку проходит ровно одна
// диагональ — сверху светлая часть ленты, снизу насыщенный фон. Вершина клина в кадр не
// попадает, иначе в маленькой плитке она читается как острый шип. Разные ленты для разных
// цветов давали заметно разный наклон, поэтому геометрия общая, отличается только цвет.
const PLAN_COVER_RIBBON = "yellow";
const PLAN_COVER_BAND = "60 300 520 400";
const PLAN_COVER_THEME = {
  yellow: { bg: "#FDE284", light: "#FFF3C7" },
  blue:   { bg: "#98DEFF", light: "#DEF4FF" },
  green:  { bg: "#8FFF92", light: "#D9FFDB" },
  pink:   { bg: "#FFB7E8", light: "#FFE9F8" },
};
const PLAN_COVER_HUE = { completed: "green", in_progress_plan: "blue", awaiting_start: "yellow" };

function TracedShape({ shape, fill }) {
  return (
    <g transform={`translate(${shape.tx},${shape.ty}) scale(${shape.sx},${shape.sy})`}>
      <path d={shape.d} fill={fill} />
    </g>
  );
}

function PlanCover({ hue, width = 80 }) {
  const art = window.CoverArt;
  const t = PLAN_COVER_THEME[hue] || PLAN_COVER_THEME.blue;
  if (!art) return null;
  return (
    <div style={{
      // Встык с контентом: обложка занимает левый край карточки на всю её высоту.
      // Скругление слева даёт сама карточка — у неё overflow: hidden.
      position: "relative", width, alignSelf: "stretch", flexShrink: 0, background: t.bg, overflow: "hidden",
    }}>
      <svg viewBox={PLAN_COVER_BAND} preserveAspectRatio="none"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}>
        <TracedShape shape={art.RIBBONS[PLAN_COVER_RIBBON]} fill={t.light} />
      </svg>
    </div>
  );
}

window.Site = {
  ROLES, roleHref, AppShell, StatusTag, directionHue, ClearableSelect,
  Icons: window.SiteIcons,
  personPhoto,
  PlanCover, PLAN_COVER_HUE,
  AI: { vacancyApplyGuard: aiVacancyApplyGuard, vacancyLetterDraft: aiVacancyLetterDraft },
};
})();
