export function removeLeadingSlash(string: string) {
  return string.replace(/^\/+/, '')
}

export function createCartIdentifier(): string {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  )
}

export function getChildId(options, matrix) {
  let subMatrix

  if (options.length == 0 && typeof matrix == 'string') {
    return matrix
  }

  for (var x in options) {
    if (matrix[options[x]] == undefined) continue

    subMatrix = matrix[options[x]] // generate a new matrix of options that have yet to be found.
    options.splice(x, 1) //remove the 'found' option from options.

    return getChildId(options, subMatrix) // search sub matrix for remaining options
  }

  return null
}
