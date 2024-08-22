import { companyForm } from "./forms/company"
import { departmentForm } from "./forms/department"
import { goalForm } from "./forms/goal"
import { okrForm } from "./forms/okr"
import { loginForm } from "./forms/login"
import { newsForm } from "./forms/news"
import { personForm } from "./forms/person"

// Modal

import { goalFill } from "./modals/goalFill"
import { goalApprove } from "./modals/goalApprove"
import { goalPoints } from "./modals/goalPoints"

const initials = {
  forms: {
    company: companyForm,
    department: departmentForm,
    goal: goalForm,
    okr: okrForm,
    login: loginForm,
    news: newsForm,
    person: personForm,
  },
  modals: {
    goalFill: goalFill,
    goalApprove: goalApprove,
    goalPoints: goalPoints,
  },
}

export default initials
