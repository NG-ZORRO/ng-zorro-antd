import Calendar from './calendar/fr_BE';
import DatePicker from './date-picker/fr_BE';
import Pagination from './pagination/fr_BE';
import TimePicker from './time-picker/fr_BE';

export default {
  locale: 'fr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrer',
    filterConfirm: 'OK',
    filterReset: 'Réinitialiser',
    emptyText: 'Aucune donnée',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuler',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  Transfer: {
    notFoundContent: 'Pas de résultat',
    searchPlaceholder: 'Recherche',
    itemUnit: 'élément',
    itemsUnit: 'éléments',
  },
  Select: {
    notFoundContent: 'Pas de résultat',
  },
};
