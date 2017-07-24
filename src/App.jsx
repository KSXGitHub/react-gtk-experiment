import React from 'react'

import render, {
  Box,
  Label,
  ListBox,
  ListBoxRow,
  ScrolledWindow,
  Spinner,
} from './react-gtk'

import style from './style.css'

const Gtk = imports.gi.Gtk
const Gdk = imports.gi.Gdk
const Soup = imports.gi.Soup

const uriFromRepo = repo =>
  new Soup.URI(`https://api.github.com/repos/${repo}/milestones`)


class DemoWindow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      milestones: [],
      repository: 'facebook/react',
    }

    this.handleSourceChange = this.handleSourceChange.bind(this)
  }

  componentDidMount () {
    const uri = uriFromRepo(this.state.repository)
    const session = new Soup.SessionAsync()
    const request = new Soup.Message({
      method: 'GET',
      uri,
    })

    session.queue_message(
      request,
      this.handleMilestonesResponse.bind(this, request)
    )

    request.request_headers.append('User-Agent', 'GTK Application')
  }

  handleMilestonesResponse (request) {
    const milestones = JSON.parse(request.response_body.data)

    if (Array.isArray(milestones)) {
      this.setState({ milestones, loading: false })
    }
  }

  handleSourceChange (input) {
    print(input)
  }

  render () {
    return (
      <Box
        stylesheet={style}
        className="main-panel"
        orientation={Gtk.Orientation.VERTICAL}
      >
        {this.state.loading
          ? <Spinner active expand />
          : (
            <ScrolledWindow>
              <ListBox hexpand vexpand >
                {this.state.milestones.map(milestone => (
                  <ListBoxRow>
                    <Label
                      label={milestone.title}
                      halign={Gtk.Align.START}
                    />
                  </ListBoxRow>
                ))}
              </ListBox>
            </ScrolledWindow>
          )
        }
      </Box>
    )
  }
}

Gtk.init(null, null)

const window = new Gtk.Window({
  width_request: 550,
  height_request: 450,
})

window.set_titlebar(new Gtk.HeaderBar({
  title: 'Milestones',
  show_close_button: true,
}))

window.connect('delete-event', () => {
  Gtk.main_quit()
  return true
})

const provider = new Gtk.CssProvider()
provider.load_from_data(style)

Gtk.StyleContext.add_provider_for_screen(
  Gdk.Screen.get_default(), provider, 1
)

render(<DemoWindow />, window)

