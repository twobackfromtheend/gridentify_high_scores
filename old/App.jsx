class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      messages: [],
      errors: [],
    };
    this.onOpen = this.onOpen.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
  }
  componentDidMount() {
    const websocket = new WebSocket("wss://server.lucasholten.com:12121");
    websocket.onopen = this.onOpen;
    websocket.onmessage = this.onMessage;
    websocket.onerror = this.onError;
  }

  onOpen() {
    this.setState({ opened: true });
  }
  onMessage(message) {
    // console.log(message)
    const data = JSON.parse(message.data);
    this.setState((state) => ({ messages: [...state.messages, ...data] }));
  }

  onError(message) {
    this.setState((state) => ({ errors: [...state.errors, message] }));
  }

  render() {
    const status = this.state.opened ? "Connected" : "Not connected";

    const listGroup = (
      <ul className="list-group list-group-flush">
        {this.state.messages[0].map((message, i) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={JSON.stringify(message)}
          >
            <span style={{ width: 30, flexGrow: 0 }}>{i + 1}.</span>
            {message.name}
            <span style={{ flexGrow: 1 }}></span>
            <span
              class="badge badge-info badge-pill"
              style={{ backgroundColor: "#1a5aa2" }}
            >
              {message.score}
            </span>
          </li>
        ))}
      </ul>
    );

    return (
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          <h5 className="card-title">High Scores</h5>
        </div>
        {!this.state.opened && (
          <div className="card-body d-flex justify-content-center">
            <progress className="pure-material-progress-circular" />
          </div>
        )}
        {listGroup}
        <div className="card-footer text-muted">{status}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
