import { useEffect } from 'react'

export function useEasterEgg() {
  useEffect(() => {
    function triggerAllOutAttack() {
      if (document.getElementById('all-out-attack')) return
      const flash = document.createElement('div')
      flash.id = 'all-out-attack'
      const text = document.createElement('span')
      text.textContent = 'ALL-OUT ATTACK'
      flash.appendChild(text)
      document.body.appendChild(flash)
      requestAnimationFrame(() => flash.classList.add('active'))
      setTimeout(() => {
        flash.classList.remove('active')
        setTimeout(() => { if (flash.parentNode) flash.parentNode.removeChild(flash) }, 600)
      }, 1200)
    }

    // Konami code
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    let pos = 0
    function onKeyDown(e: KeyboardEvent) {
      if (e.keyCode === konami[pos]) {
        pos++
        if (pos === konami.length) { triggerAllOutAttack(); pos = 0 }
      } else {
        pos = 0
      }
    }

    // 10 clicks on profile photo
    let clicks = 0
    function onPhotoClick() {
      clicks++
      if (clicks >= 10) { triggerAllOutAttack(); clicks = 0 }
    }

    document.addEventListener('keydown', onKeyDown)
    const photo = document.querySelector('.profile-photo')
    if (photo) photo.addEventListener('click', onPhotoClick)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (photo) photo.removeEventListener('click', onPhotoClick)
    }
  }, [])
}
