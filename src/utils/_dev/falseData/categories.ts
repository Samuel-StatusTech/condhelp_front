import { TCategory } from "../../@types/data/category"

export const FDcategories: TCategory[] = [
  {
    id: 1,
    name: "Categoria 1",
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
    subcategories: [
      {
        id: "1",
        name: "Subategoria 1 - A",
        parent: {
          id: 1,
          name: "Categoria 1",
        },
      },
      {
        id: "2",
        name: "Subategoria 1 - B",
        parent: {
          id: 1,
          name: "Categoria 1",
        },
      },
      {
        id: "3",
        name: "Subategoria 1 - C",
        parent: {
          id: 1,
          name: "Categoria 1",
        },
      },
    ],
    description: "",
  },
  {
    id: 2,
    name: "Categoria 2",
    creator: {
      id: "1",
      role: "admin",
      name: "Sistema",
    },
    subcategories: [
      {
        id: "4",
        name: "Subategoria 2 - A",
        parent: {
          id: 2,
          name: "Categoria 2",
        },
      },
      {
        id: "5",
        name: "Subategoria 2 - B",
        parent: {
          id: 2,
          name: "Categoria 2",
        },
      },
    ],
    description: "",
  },
]
