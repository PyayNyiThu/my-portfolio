new TypeWriter(`#typewriter`, {
    loop: true,
    cursor: {
      speed: 700,
      size: 'larger',
      id: 'Some_TypeWriter_CSS'
    },
    timeout: 50
  })
  .write(`Pyay Nyi Thu`)
  .wait(2000)
  .removeAll()
  .write(`Web Developer`)
  .wait(2000)
  .remove(6)
  .removeAll()
  .start();