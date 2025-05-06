import { loginForm } from "./forms/login"
import { personForm } from "./forms/person"
import { categoryForm } from "./forms/category"
import { subcategoryForm } from "./forms/subcategory"
import { condoForm } from "./forms/condo"
import { regionForm } from "./forms/region"
import { errandForm } from "./forms/errand"
import { faqForm } from "./forms/faq"
import { tagForm } from "./forms/tag"

// Modal

import { goalApprove } from "./modals/goalApprove"
import { goalPoints } from "./modals/goalPoints"
import { newBudget } from "./modals/newBudget"
import { newMonitorContact } from "./modals/newMonitorContact"

// Pagination
import { initialPagination } from "./table/pagination"

// Dashboard
import { initialDashboard } from "./dashboards"

const initials = {
  dashboards: {
    admin: initialDashboard,
    branch: initialDashboard,
  },
  forms: {
    login: loginForm,
    person: personForm,
    category: categoryForm,
    subcategory: subcategoryForm,
    condo: condoForm,
    region: regionForm,
    errand: errandForm,
    tag: tagForm,
    faq: faqForm,
  },
  modals: {
    goalApprove: goalApprove,
    goalPoints: goalPoints,
    newBudget: newBudget,
    newMonitorContact: newMonitorContact,
  },
  pagination: initialPagination,
}

export default initials
