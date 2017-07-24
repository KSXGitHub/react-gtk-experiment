import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class ListBoxRow extends GtkComponent {
  createNewNode () {
    return new Gtk.ListBoxRow()
  }
}

