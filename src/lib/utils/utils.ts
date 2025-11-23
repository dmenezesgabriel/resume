export function preprocessMarkdown(content: string): string {
  if (!content) return '';

  let processed = content;

  // Replace HTML line breaks with double newlines
  processed = processed.replace(/<\s*\/?\s*br\s*\/?\s*>/gi, '\n\n');

  // Heuristically replace " - CapitalLetter" with "\n\n- CapitalLetter" to fix lists in folded YAML
  // We use \n\n to ensure it starts a new block (list item) even if remark-breaks is on
  processed = processed.replace(/\s-\s(?=[A-Z])/g, '\n\n- ');

  return processed;
}
