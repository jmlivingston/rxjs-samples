const sample = {
  dragDrop: (dragTarget => {
    const posList = []
    const mouseUp = Rx.Observable.fromEvent(
      document, 'mouseup')
    const mouseMove = Rx.Observable.fromEvent(
      document, 'mousemove')
    const mouseDown = Rx.Observable.fromEvent(
      dragTarget, 'mousedown')

    const originalTop = dragTarget.getBoundingClientRect().top
      - (dragTarget.offsetWidth / 2)
    const originalLeft = dragTarget.getBoundingClientRect().left

    const mouseDrag = mouseDown.mergeMap(md => {
      return mouseMove.map(mm => {
        mm.preventDefault()
        return {
          left: mm.pageX - md.offsetX - originalLeft,
          top: mm.pageY - md.offsetY - originalTop
        }
      }).takeUntil(mouseUp)
    })
    const subscription = mouseDrag.subscribe(pos => {
      dragTarget.style.top = pos.top + 'px'
      dragTarget.style.left = pos.left + 'px'
      posList.push(pos.top + ' X ' + pos.left)
      utility.updateResults('Next', JSON.stringify(posList, null, 2))
    })
  }),
  init: (selector) => {
    document.querySelectorAll(selector)
      .forEach(sample.dragDrop)
  }
}