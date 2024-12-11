import { loginForm } from "./forms/login"
import { personForm } from "./forms/person"
import { categoryForm } from "./forms/category"
import { subcategoryForm } from "./forms/subcategory"
import { condoForm } from "./forms/condo"
import { regionForm } from "./forms/region"
import { errandForm } from "./forms/errand"
import { faqForm } from "./forms/faq"

// Modal

import { goalApprove } from "./modals/goalApprove"
import { goalPoints } from "./modals/goalPoints"
import { newBudget } from "./modals/newBudget"

const initials = {
  forms: {
    login: loginForm,
    person: personForm,
    category: categoryForm,
    subcategory: subcategoryForm,
    condo: condoForm,
    region: regionForm,
    errand: errandForm,
    faq: faqForm,
  },
  modals: {
    goalApprove: goalApprove,
    goalPoints: goalPoints,
    newBudget: newBudget,
  },
}

export default initials
