/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import Calendar from './calendar/ko_KR';
import DatePicker from './date-picker/ko_KR';
import Pagination from './pagination/ko_KR';
import TimePicker from './time-picker/ko_KR';

export default {
  locale: 'ko',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: '필터 메뉴',
    filterConfirm: '확인',
    filterReset: '초기화',
    selectAll: '모두 선택',
    selectInvert: '선택 반전'
  },
  Modal: {
    okText: '확인',
    cancelText: '취소',
    justOkText: '확인'
  },
  Popconfirm: {
    okText: '확인',
    cancelText: '취소'
  },
  Transfer: {
    searchPlaceholder: '여기에 검색하세요',
    itemUnit: '개',
    itemsUnit: '개'
  },
  Upload: {
    uploading: '업로드 중...',
    removeFile: '파일 삭제',
    uploadError: '업로드 실패',
    previewFile: '파일 미리보기'
  },
  Empty: {
    description: '데이터 없음'
  }
};
