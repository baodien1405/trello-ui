export const convertTitleCase = (title: string) => {
  if (!title) return ''
  const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

  const exceptions = ['a', 'an', 'of', 'and', 'the', 'but', 'or', 'on', 'in', 'with', 'for', 'at']

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ')

  return capitalize(titleCase)
}

export const generatePlaceholderCard = (column: any) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
