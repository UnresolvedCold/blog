import visit from 'unist-util-visit'

function transformer(ast) {
  visit(ast, 'TYPE', visitor)

  function visitor(node) {
    newNode = 'do work here'
    return Object.assign(node, newNode)
  }
}

function remarkLearn() {
  return transformer
}

export default remarkLearn