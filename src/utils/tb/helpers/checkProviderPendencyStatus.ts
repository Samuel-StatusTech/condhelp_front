import { TPendency } from "../../@types/data/_user/provider"
import { getDateDiff } from "./getDateDiff"

export const checkProviderPendencyStatus = ({
  isent,
  start,
  end,
  register,
}: {
  isent: boolean
  start?: string | null
  end?: string | null
  register?: string | null
}): TPendency => {
  let status: TPendency = "free"

  if (!isent && !!end) {
    if (getDateDiff(new Date(), end as string) < 0) status = "has"
    else status = "none"
  }

  return status
}
