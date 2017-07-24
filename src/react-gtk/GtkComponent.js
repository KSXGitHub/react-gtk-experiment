import ReactMultiChild from 'react/lib/ReactMultiChild'

const Gtk = imports.gi.Gtk

class GtkComponent {
  constructor (element) {
    this.node = null
    this._mountImage = null
    this._renderedChildren = null
    this._currentElement = element
    this._signals = {}
  }

  getPublicInstance () {
    return this.node
  }

  mountComponent (transaction, nativeParent, nativeContainerInfo, context) {
    if (!this.node) {
      this.node = this.createNewNode()
    }

    Object.keys(this._currentElement.props).forEach((prop) => {
      this.setProp(prop, this._currentElement.props[prop])
    })

    const mountImages = this.mountChildren(
      this._currentElement.props.children || null,
      transaction,
      context
    )

    mountImages.forEach((ch) => {
      this.node.add(ch)
    })

    return this.node
  }

  receiveComponent (nextElement, transaction, context) {
    const prevElement = this._currentElement
    this._currentElement = nextElement

    ;[
      ...new Set([
        ...Object.keys(prevElement),
        ...Object.keys(nextElement.props),
      ]),
    ].forEach((prop) => {
      const prev = prevElement.props[prop]
      const next = nextElement.props[prop]
      if (prev !== next) {
        this.setProp(prop, next)
      }
    })

    // this.updateChildren comes from ReactMultiChild.Mixin
    this.updateChildren(nextElement.props.children, transaction, context)
  }

  unmountComponent () {
    this.node.get_parent().remove(this.node)
  }

  getHostNode () {
    return this.node
  }

  setProp (prop, value) {
    if (prop === 'stylesheet') {
      const context = this.node.get_style_context()
      const provider = new Gtk.CssProvider()

      provider.load_from_data(value)
      context.add_provider(provider, Gtk.CssProvider.PRIORITY_USER)
    } else if (prop === 'className') {
      const classNames = value.split(' ')
      const context = this.node.get_style_context()

      classNames.forEach(className =>
        context.add_class(className))
    } else if (prop === 'children') {
      // child props
    } else if (/^on_/.test(prop)) {
      const signal = prop.substr(3)

      if (this._signals[signal]) {
        this.node.disconnect(this._signals[signal])
      }

      this._signals[signal] = this.node.connect(signal, value)
    } else if (/__/.test(prop)) {
      // parent props
    } else {
      const cv = this.node[prop]

      if (cv !== value) {
        this.node.set_property(prop, value)
      }
    }
  }
}

Object.assign(
  GtkComponent.prototype,
  ReactMultiChild.Mixin
)

export default GtkComponent

