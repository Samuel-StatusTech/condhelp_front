import { loginForm } from "./forms/login"
import { personForm } from "./forms/person"
import { categoryForm } from "./forms/category"
import { subcategoryForm } from "./forms/subcategory"
import { condoForm } from "./forms/condo"

// Modal

import { goalFill } from "./modals/goalFill"
import { goalApprove } from "./modals/goalApprove"
import { goalPoints } from "./modals/goalPoints"

const initials = {
  forms: {
    login: loginForm,
    person: personForm,
    category: categoryForm,
    subcategory: subcategoryForm,
    condo: condoForm,
  },
  modals: {
    goalFill: goalFill,
    goalApprove: goalApprove,
    goalPoints: goalPoints,
  },
}

export default initials
