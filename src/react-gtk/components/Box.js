import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class Box extends GtkComponent {
  createNewNode () {
    return new Gtk.Box()
  }
}

