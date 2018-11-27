export function removeLeadingSlash(string: string) {
  return string.replace(/^\/+/, '')
}

export function createCartIdentifier(): string {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  )
}
