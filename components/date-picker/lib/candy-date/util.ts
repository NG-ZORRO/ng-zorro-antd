
/**
 * [Temporary] Get the first day of week depend on locale (0-6 represent as Sunday-Saturday)
 * @param locale Locale code
 */
export function firstDayOfWeek(locale?: string): number {
  return locale && [ 'zh-cn', 'zh-tw' ].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
}
