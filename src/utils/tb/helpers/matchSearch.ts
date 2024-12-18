export const matchSearch = (value: string, search: string) => {
  let filtered = normalizeDefault(String(value))

  const ok = filtered
    .toLowerCase()
    .includes(normalizeDefault(search.toLowerCase().trim()))

  return ok
}

const normalizeDefault = (value: string) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w@.\s]/g, "")
    .toLowerCase()
}
