

export function generateHelloContent(content) {
  return 'Hello, World!';
}

export function removeImportStatements(input) {
  const lines = input.split('\n');
  
  // Find the index of the first line that doesn't start with "import"
  const firstNonImportIndex = lines.findIndex(line => !line.trim().startsWith('import'));

  // If a non-import line is found, remove all lines above it
  const cleanedContent = firstNonImportIndex !== -1
    ? lines.slice(firstNonImportIndex).join('\n')
    : input;

  return cleanedContent;
}

export function removeBlogImage(input) {
  const imageTagPattern1 = /<BlogImage[^>]*>.*<\/BlogImage>/gs;
  const imageTagPattern2 = /<BlogImage[^>]*\/>/gs;
  const cleanContent = input.replace(imageTagPattern1, '<!image/>').replace(imageTagPattern2, '<!image/>');
  return cleanContent;
}

export function removeBlogImageWithContext(input) {
  const imageTagPattern1 = /<BlogImageWithContext[^>]*>.*<\/BlogImageWithContext>/gs;
  const imageTagPattern2 = /<BlogImageWithContext[^>]*\/>/gs;
  const cleanContent = input.replace(imageTagPattern1, '<!image-context/>').replace(imageTagPattern2, '');
  return cleanContent;
}

export function removePlantUml(input) {
  const imageTagPattern1 = /<PlantUML[^>]*>.*<\/PlantUML>/gs;
  const imageTagPattern2 = /<PlantUML[^>]*\/>/gs;
  const cleanContent = input.replace(imageTagPattern1, '<!plantuml/>').replace(imageTagPattern2, '');
  return cleanContent;
}

export default function mdxpurify(input) {
  var output = input;
  output = removeImportStatements(output);
  output = removeBlogImage(output);
  output = removeBlogImageWithContext(output);
  output = removePlantUml(output);
  return output;
}