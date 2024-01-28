export function addSend(message, chatBox, style) {
    let div = document.createElement('div')
    div.innerText = message
    div.classList.add(style)
    chatBox.current.appendChild(div)
}

export function addReceiver(message, chatBox, style) {
    let div = document.createElement('div')
    div.innerText = message
    div.classList.add(style)
    chatBox.current.appendChild(div)
}