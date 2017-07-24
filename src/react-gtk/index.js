import ReactInjection from 'react/lib/ReactInjection'
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy'

import instantiateReactComponent from 'react/lib/instantiateReactComponent'
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles'
import ReactUpdates from 'react/lib/ReactUpdates'

import GtkReconcileTransaction from './GtkReconcileTransaction'
import GtkEnvironment from './GtkEnvironment'
import GtkComponent from './GtkComponent'

const Gtk = imports.gi.Gtk

ReactInjection.Component.injectEnvironment(GtkEnvironment)
ReactInjection.HostComponent.injectGenericComponentClass(GtkComponent)
ReactInjection.Updates.injectReconcileTransaction(GtkReconcileTransaction)
ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy)

export default function render (nextElement, target, callback) {
  const rootId = ReactInstanceHandles.createReactRootID(0)
  const component = instantiateReactComponent(nextElement)

  Gtk.init(null)

  ReactUpdates.batchedUpdates(() => {
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled()
    transaction.perform(() => {
      const w = component.mountComponent(
        transaction,
        rootId,
        { _idCounter: 0 },
        {}
      )
      target.add(w)
      target.show_all()
      if (callback) {
        callback(component.getPublicInstance())
      }
    })
    ReactUpdates.ReactReconcileTransaction.release(transaction)
  })

  Gtk.main()
}

export { default as Box } from './components/Box'
export { default as Label } from './components/Label'
export { default as Entry } from './components/Entry'
export { default as Button } from './components/Button'
export { default as ScrolledWindow } from './components/ScrolledWindow'
export { default as TextView } from './components/TextView'
export { default as ListBox } from './components/ListBox'
export { default as ListBoxRow } from './components/ListBoxRow'
export { default as Spinner } from './components/Spinner'

