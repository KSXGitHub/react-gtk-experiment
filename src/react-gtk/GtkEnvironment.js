import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment'

const GtkEnvironment = {
  processChildrenUpdates (parent, updates) {
    updates.forEach(({ type, content }) => {
      switch (type) {
        case 'INSERT_MARKUP':
          parent.node.add(content)
          content.show_all()
          break
        default:
          break
      }
    })
  },
}

export default Object.assign(
  ReactComponentEnvironment,
  GtkEnvironment
)

