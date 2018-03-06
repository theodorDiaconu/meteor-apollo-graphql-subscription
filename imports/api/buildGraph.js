export default function(ast) {
  console.log(ast.fieldNodes[0].selectionSet);

  const fieldNodes = ast.fieldNodes;

  const body = extractSelectionSet(ast.fieldNodes[0].selectionSet);

  return body;
}

function extractSelectionSet(set) {
  let body = {};
  set.selections.forEach(el => {
    if (el.selectionSet === undefined) {
      body[el.name.value] = 1;
    } else {
      body[el.name.value] = extractSelectionSet(el.selectionSet);
    }
  });

  return body;
}
