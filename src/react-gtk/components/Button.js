import GtkComponent from '../GtkComponent'

const Gtk = imports.gi.Gtk

export default class Button extends GtkComponent {
  createNewNode () {
    return new Gtk.Button()
  }
}

