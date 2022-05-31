export const getAllParents = target => {
  const parents = []
  let currentNode = target.parentNode
  while (currentNode) {
    parents.push(currentNode)
    currentNode = currentNode.parentNode
  }
  return parents
}

export const disableParents = function (e) {
  const target = e.currentTarget
  const parents = getAllParents(target)

  for (const parent of parents) {
    // Disable click
    if (parent.style) parent.style.pointerEvents = "none"

    // Disable key press
    parent.onkeypressbkp = parent.onkeypress
    parent.onkeypress = e => {
      // e.preventDefault()
    }
  }

  function enableParents(e) {
    for (const parent of parents) {
      // Enable click
      if (parent.style) parent.style.pointerEvents = "all"

      // Enable key press
      parent.onkeypress = parent.onkeypressbkp
      delete parent.onkeypressbkp
    }
    window.removeEventListener("pointerup", enableParents)
    window.removeEventListener("keyup", enableParents)
  }

  window.addEventListener("pointerup", enableParents)
  window.addEventListener("keyup", enableParents)
}
