import interact from 'interactjs';

let shape = interact('.resizable');

shape
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 10, height: 10 }
      })
    ],
    autoScroll: true,

    inertia: true
  })

  /*
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: false,
      })
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')

      console.log("on end...")
    }
  })
  */
  .on('resizemove', function (event) {
    var target = event.target
    console.log(target)
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    

    if (target.nodeName.toLowerCase() === "canvas"){
      target.setAttribute('data-width',  event.rect.width)
      target.setAttribute('data-height', event.rect.height)
    }
    else{
      // update the element's style
      target.style.width = event.rect.width + 'px'
      target.style.height = event.rect.height + 'px'
    }


    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)'

    //target.setAttribute('data-x', x)
    //target.setAttribute('data-y', y)
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })


  /* function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener */