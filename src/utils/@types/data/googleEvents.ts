export type TGoogleEvent = {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink: string
  created: string
  updated: string
  summary: string
  creator: {
    email: string
    self: boolean
  }
  organizer: {
    email: string
    self: boolean
  }
  start: {
    dateTime?: string
    date?: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  iCalUID: string
  sequence: number
  reminders: {
    useDefault: boolean
  }
  eventType: string
}
