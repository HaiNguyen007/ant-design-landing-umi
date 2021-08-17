import React, { useState } from "react";
import "./styles.css";

export default function Feedback() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const handleInput = e => {
    const copyFormData = { ...formData };
    copyFormData[e.target.name] = e.target.value;
    setFormData(copyFormData);
  };

  const sendData = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/akash/google_sheets/sfMHXggoJYiqThpH?tabId=Contact",
        {
          method: "post",
          body: JSON.stringify([[formData.email, formData.message]]),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const json = await response.json();
      console.log("Success:", JSON.stringify(json));
      setMessage(json.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error");
    }
  };

  return (
    <div className="App">
      <form
        className="input-form"
        id="contact"
        name="contact"
        onSubmit={sendData}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <textarea
          name="message"
          type="text"
          placeholder="Message"
          onChange={handleInput}
        />
        <input name="submit" type="submit" value="Send" />
        <div>{message}</div>
      </form>
    </div>
  );
}
