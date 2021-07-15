var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

/**
 *
 * @param ops {Array}
 * @returns converted object into string
 */
export function convertQuillToHtml(ops: Array<Record<string, Object>>) {
  const cfg = {};

  const converter = new QuillDeltaToHtmlConverter(ops, cfg);
  const html = converter.convert();

  return html;
}
