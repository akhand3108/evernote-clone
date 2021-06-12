export default function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, "")
}

export const getFormattedDate = (timestamp) => {
  const myDate = timestamp?.toDate()
  const dateString =
    myDate?.getDate() +
    "/" +
    (myDate?.getMonth() + 1) +
    "/" +
    myDate?.getFullYear()
  return dateString
}