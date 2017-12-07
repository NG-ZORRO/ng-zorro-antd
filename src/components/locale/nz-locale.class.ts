/* tslint:disable:variable-name */
export class NzLocale {
  locale: string; // Present of this locale's lang code

  Pagination: {
    itemsPerPage: string;
    jumpTo: string;
    page: string;
    forwardPage: string;
    backwardPage: string;
    prevPage: string;
    nextPage: string;
    firstPage: string;
    lastPage: string;
    totalItems: string;
  };

  DateTime: {
    clear: string;
    chooseMonth: string;
    chooseYear: string;
    nYear: string;
    nMonth: string;
    nDay: string;
    prevYear: string;
    nextYear: string;
    prevMonth: string;
    nextMonth: string;
    prevDecade: string;
    nextDecade: string;
    chooseDecade: string;
    chooseTime: string;
    chooseDate: string;
    chooseTimePlease: string;
    chooseDatePlease: string;
    thisMoment: string;
    today: string;
    ok: string;
  };

  Modal: {
    okText: string;
    cancelText: string;
    understood: string;
  };

  Table: {
    emptyText: string;
  };

  Select: {
    notFoundContent: string;
  };

  Transfer: {
    titles: string,
    notFoundContent: string,
    searchPlaceholder: string,
    itemUnit: string,
    itemsUnit: string,
  };
}
