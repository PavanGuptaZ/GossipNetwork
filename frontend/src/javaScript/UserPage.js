export const displayAsideHandle = (userChatElement, button) => {
  if (getComputedStyle(userChatElement.current).left == "0px") {
    userChatElement.current.style.setProperty("left", "-100%")
    button.current.style.setProperty("left", "0px")
    button.current.style.setProperty("transform", "rotate(0deg)")

  } else {
    userChatElement.current.style.setProperty("left", "0px")
    button.current.style.setProperty("left", "200px")
    button.current.style.setProperty("transform", "rotate(180deg)")
  }
}

export const displayNavHandle = (NavLinkElement, button) => {
  if (getComputedStyle(NavLinkElement.current).right == "0px") {
    NavLinkElement.current.style.setProperty("right", "-100%")
    button.current.style.setProperty("transform", "rotate(180deg)")
    button.current.style.setProperty("right", "10px")
  } else {
    NavLinkElement.current.style.setProperty("right", "0px")
    button.current.style.setProperty("transform", "rotate(0deg)")
    button.current.style.setProperty("right", "170px")
  }
}