import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class Label extends GtkComponent {
  createNewNode () {
    return new Gtk.Label()
  }
}

