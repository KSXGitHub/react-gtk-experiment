import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class Entry extends GtkComponent {
  createNewNode () {
    return new Gtk.Entry()
  }
}

