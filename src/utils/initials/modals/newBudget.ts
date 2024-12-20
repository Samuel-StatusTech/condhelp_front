import { TNewBudget } from "../../@types/data/budget"

export const newBudget: TNewBudget = {
  title: "",
  description: "",
  startDate: "",
  finishDate: "",
  attachedUrl: "",
  urgent: false,
  condominiumId: 0,
  serviceCategoryId: 0,
  serviceSubcategoryId: 0,
  userId: 0,
  status: "DISPONIVEL",
  providerIds: [],
}
