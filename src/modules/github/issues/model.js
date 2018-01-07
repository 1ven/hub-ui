export const compareByDate = (a, b) =>
  new Date(b.createdAt) - new Date(a.createdAt);
