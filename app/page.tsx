"use client";

import clsx from "clsx";
import "../styles/styles.css";
import { useEffect, useState } from "react";

interface Message {
  name: string;
  score: number;
}

type Tab = "Daily" | "All-time";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [messages, setMessages] = useState<Message[][]>([]);
  const [errors, setErrors] = useState<unknown[]>([]);
  const [tab, setTab] = useState<Tab>("Daily");

  useEffect(() => {
    const onOpen = () => {
      setOpened(true);
    };
    const onMessage = (message: any) => {
      console.log("Message", message);
      const data = JSON.parse(message.data);
      setMessages((messages) => [...messages, data]);
    };
    const onError = (error: any) => {
      console.log("Error", error);
      setErrors((errors) => [...errors, error]);
    };

    const websocket = new WebSocket("wss://server.lucasholten.com:12121");
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
  }, []);

  const status = opened ? "Connected" : "Not connected";

  const tabData: Message[] | undefined =
    tab === "All-time" ? messages[0] : messages[1];

  const listGroup = tabData ? (
    <ul
      className="list-group list-group-flush"
      style={{ borderTop: "transparent" }}
    >
      {tabData.map((message, i) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={JSON.stringify(message)}
        >
          <span style={{ width: 30, flexGrow: 0 }}>{i + 1}.</span>
          {message.name}
          <span style={{ flexGrow: 1 }}></span>
          <span
            className="badge badge-info badge-pill"
            style={{ backgroundColor: "#1a5aa2" }}
          >
            {message.score}
          </span>
        </li>
      ))}
    </ul>
  ) : undefined;

  return (
    <div className="card" style={{ width: 300 }}>
      <div className="card-body">
        <h5 className="card-title">High Scores</h5>
      </div>
      <ul className="nav nav-tabs" style={{ padding: "0 4px" }}>
        {(["Daily", "All-time"] as Tab[]).map((t) => (
          <TabItem tab={t} setTab={setTab} active={tab === t} />
        ))}
      </ul>

      {listGroup}

      {!opened && (
        <div className="card-body d-flex justify-content-center">
          <progress className="pure-material-progress-circular" />
        </div>
      )}
      <div className="card-footer text-muted">{status}</div>
    </div>
  );
}

const TabItem = ({
  tab,
  setTab,
  active,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
  active: boolean;
}) => {
  return (
    <li className="nav-item">
      <button
        className={clsx("nav-link", active && "active")}
        onClick={() => setTab(tab)}
      >
        {tab}
      </button>
    </li>
  );
};
