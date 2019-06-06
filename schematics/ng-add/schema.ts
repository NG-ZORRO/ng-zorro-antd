export type Locale =
  | 'ar_EG'
  | 'bg_BG'
  | 'ca_ES'
  | 'cs_CZ'
  | 'da_DK'
  | 'de_DE'
  | 'el_GR'
  | 'en_GB'
  | 'en_US'
  | 'es_ES'
  | 'et_EE'
  | 'fa_IR'
  | 'fi_FI'
  | 'fr_BE'
  | 'fr_FR'
  | 'is_IS'
  | 'it_IT'
  | 'ja_JP'
  | 'ko_KR'
  | 'nb_NO'
  | 'nl_BE'
  | 'nl_NL'
  | 'pl_PL'
  | 'pt_BR'
  | 'pt_PT'
  | 'sk_SK'
  | 'sr_RS'
  | 'sv_SE'
  | 'th_TH'
  | 'tr_TR'
  | 'ru_RU'
  | 'uk_UA'
  | 'vi_VN'
  | 'zh_CN'
  | 'zh_TW';

export interface Schema {
  bootPage?: boolean;
  /** Name of the project to target. */
  project?: string;
  /** Whether to skip package.json install. */
  skipPackageJson?: boolean;
  dynamicIcon?: boolean;
  theme?: boolean;
  gestures?: boolean;
  animations?: boolean;
  locale?: Locale;
  i18n?: Locale;
}
