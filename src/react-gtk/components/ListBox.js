import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class ListBox extends GtkComponent {
  createNewNode () {
    return new Gtk.ListBox()
  }
}

