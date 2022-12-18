// Exists only for typescript
// This function usage gets removed by the babel plugin
export function tw(styles: TemplateStringsArray): string {
  return styles.join('');
}
