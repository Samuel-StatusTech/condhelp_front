import { TSubCategory } from "../../@types/data/category/subcategories"

export const FDsubcategories: TSubCategory[] = [
  {
    id: "1",
    name: "Subcategoria 1 - A",
    parent: {
      id: "1",
      name: "Categoria 1",
    },
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
  },
  {
    id: "2",
    name: "Subcategoria 1 - B",
    parent: {
      id: "1",
      name: "Categoria 1",
    },
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
  },
  {
    id: "3",
    name: "Subcategoria 1 - C",
    parent: {
      id: "1",
      name: "Categoria 1",
    },
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
  },
  {
    id: "4",
    name: "Subcategoria 2 - A",
    parent: {
      id: "2",
      name: "Categoria 2",
    },
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
  },
  {
    id: "5",
    name: "Subcategoria 2 - B",
    parent: {
      id: "2",
      name: "Categoria 2",
    },
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
  },
]
