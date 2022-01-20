// Array
const nArRan = (array = [false, true]) => {
  return array[Math.ceil(Math.random() * array.length) - 1]
}
// Object, Key, Descending or Ascending
const nObArSort = (object, key, sort) => {
  if (!sort) return object.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0))
  return object.sort((b, a) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0))
}
// MM/DD/YYYY
const nCalculateAge = (mdyy) => {
  let now = new Date()
  let yearNow = now.getYear()
  let monthNow = now.getMonth()
  let dateNow = now.getDate()
  let dob = new Date(mdyy.substring(6, 10), mdyy.substring(0, 2) - 1, mdyy.substring(3, 5))
  let yearDob = dob.getYear()
  let monthDob = dob.getMonth()
  let dateDob = dob.getDate()
  let yearAge = yearNow - yearDob
  let monthAge
  let dateAge
  if (monthNow >= monthDob) {
    monthAge = monthNow - monthDob
  } else {
    yearAge--
    monthAge = 12 + monthNow - monthDob
  }
  if (dateNow >= dateDob) {
    dateAge = dateNow - dateDob
  } else {
    monthAge--
    dateAge = 31 + dateNow - dateDob
    if (monthAge < 0) {
      monthAge = 11
      yearAge--
    }
  }
  return { B: new Date(mdyy), D: dateAge, M: monthAge, Y: yearAge }
}
// Element
const nSelect = (element) => {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  return element.textContent.trim()
}
// Element
const nElementVisible = (element) => {
  const position = element.getBoundingClientRect()
  if (position.top >= 0 && position.bottom <= window.innerHeight) return true
  else if (position.top < window.innerHeight && position.bottom >= 0) return "true"
  else return false
}
// Selectors
const nElementsSort = (selectors) => {
  let i, switching, b, shouldSwitch
  switching = true
  while (switching) {
    switching = false
    b = document.querySelectorAll(selectors)
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false
      if (b[i].textContent.toLowerCase().trim() > b[i + 1].textContent.toLowerCase().trim()) {
        shouldSwitch = true
        break
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i])
      switching = true
    }
  }
}
// Src, After Load()
const nJSON = (src, func) => {
  fetch(src)
    .then((res) => res.json())
    .then((data) => {
      func(data)
    })
}
// Minimum, Maximum
const nMathRandom = (min = 0, max = 1) => {
  min = Math.ceil(min)
  return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min)
}
// Parent, InnerHTML, Class, Id
const nHTML = (parent = "div", innerH = "", classs = "", iddd = "") => {
  const parentE = document.createElement(parent.trim())
  if (classs !== "") parentE.setAttribute("class", classs.trim())
  if (iddd !== "") parentE.setAttribute("id", iddd.trim())
  parentE.innerHTML = innerH.trim()
  return parentE
}
// Time Separator, Date separator
const nTime = (ts = ":", ds = "-") => {
  const moonLanding = new Date()
  const year = moonLanding.getFullYear()
  const month = moonLanding.getMonth() + 1
  const date = moonLanding.getDate()
  const minutes = moonLanding.getMinutes()
  const seconds = "" + moonLanding.getSeconds()
  let amOrPm
  const checkLength = (main) => {
    main += ""
    if (main.length < 2) {
      main = "0" + main
      return main
    } else {
      return main
    }
  }
  const hours = () => {
    let a = moonLanding.getHours()
    if (!a) {
      a = 12
      amOrPm = "AM"
    } else if (a > 12) {
      a -= 12
      amOrPm = "PM"
    } else {
      amOrPm = "AM"
    }
    return a
  }
  return {
    time: checkLength(hours()) + ts + checkLength(minutes) + ts + checkLength(seconds) + " " + amOrPm,
    date: checkLength(date) + ds + checkLength(month) + ds + year,
  }
}
// Element, Text, Write Speed, Clear Speed, Write Delay, Clear Delay, Count, Clean Before Start, After Limit()
const nTypeWriter = (element, txt = [], wS = 75, cS = 50, wD = 500, cD = 1000, count = false, clean = true, fn = () => {}) => {
  let txtIndex = 0
  let i = 0
  let counter = 1
  const clear = () => {
    if (element.textContent.length) {
      element.textContent = element.textContent.slice(0, -1)
      i++
      setTimeout(clear, cS)
    } else {
      i = 0
      setTimeout(write, wD)
    }
  }
  const write = () => {
    if (i < txt[txtIndex].length) {
      element.append(txt[txtIndex].charAt(i))
      i++
      setTimeout(write, wS)
    } else {
      counter++
      if (count && count < counter) {
        fn(element, { wS, cS, wD, cD })
        return
      }
      i = 0
      if (txtIndex < txt.length - 1) {
        txtIndex++
      } else {
        txtIndex = 0
      }
      setTimeout(clear, cD)
    }
  }
  if (element.textContent.length && clean) clear()
  else write()
}
// Key, Value, Day, Hour, Minute, Second
const nCookie = function (key, value, day = 0, hour = 0, minute = 0, second = 0) {
  switch (arguments.length) {
    case 1:
      {
        let name = key + "="
        let ca = document.cookie.split(";")
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i]
          while (c.charAt(0) == " ") {
            c = c.substring(1)
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
          }
        }
        return ""
      }
      break
    default:
      {
        const d = new Date()
        d.setTime(d.getTime() + (day * 86400000 + hour * 3600000 + minute * 60000 + second * 1000))
        document.cookie = key + "=" + value + ";" + "expires=" + d.toUTCString() + ";path=/"
      }
      break
  }
}
