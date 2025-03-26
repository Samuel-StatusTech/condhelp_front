import { Api } from "../../../../api"

const blobUrlToFile = async (blobUrl: string, fileName: string) => {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  const file = new File([blob], `${fileName}.${blob.type.split("/")[1]}`, {
    type: blob.type,
  })
  return file
}

type TSendFileProps = {
  type: "image" | "pdf"
  fileData: string | File
  showError: () => void
}

const checkFileType = (file: File, fileType: "image" | "pdf") => {
  let status = false

  if (fileType === "image") status = file.type.startsWith("image/")
  else status = file.type === "application/pdf"

  return status
}

export const sendFile = async ({
  type,
  fileData,
  showError,
}: TSendFileProps): Promise<string | null> => {
  try {
    const isFile = fileData instanceof File

    const isTypeOk = isFile ? checkFileType(fileData, type) : true

    if (isTypeOk) {
      const fd = new FormData()

      const fileName = `${new Date().getTime()}`
      const file =
        fileData instanceof File
          ? fileData
          : await blobUrlToFile(fileData, fileName)

      const isTypeOk2 = checkFileType(file, type)

      if (isTypeOk2) {
        fd.append("file", file)
        fd.append("fileName", fileName)

        const req = await Api.files.sendFile(fd)

        if (req.ok) return req.data as unknown as string
        else return null
      } else throw new Error()
    } else throw new Error()
  } catch (error) {
    showError()

    return null
  }
}
