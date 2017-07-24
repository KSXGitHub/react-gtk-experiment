import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class Spinner extends GtkComponent {
  createNewNode () {
    return new Gtk.Spinner()
  }
}

