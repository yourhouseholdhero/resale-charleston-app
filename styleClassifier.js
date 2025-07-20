export function classifyStyle(tags) {
  const styles = ['Boho', 'Mid-Century', 'Rustic', 'Coastal'];
  return styles.find(style => tags.includes(style)) || 'Unclassified';
}
