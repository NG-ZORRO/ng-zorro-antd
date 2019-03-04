import Calendar from './calendar/fr_FR';
import DatePicker from './date-picker/fr_FR';
import Pagination from './pagination/fr_FR';
import TimePicker from './time-picker/fr_FR';

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
    selectAll: 'Tout sélectionner',
    selectInvert: 'Inverser la sélection',
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
    searchPlaceholder: 'Recherche',
    itemUnit: 'élément',
    itemsUnit: 'éléments',
  },
  Upload: {
    uploading: 'Téléversement en cours...',
    removeFile: 'Supprimer',
    uploadError: 'Erreur de téléversement',
    previewFile: 'Afficher l\'aperçu du fichier',
  },
  Empty: {
    description: 'Aucune donnée',
  },
};
