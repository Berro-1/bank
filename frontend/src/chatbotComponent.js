import React, { useEffect } from "react";

const ChatbotComponent = () => {
  useEffect(() => {
    // Check if the chatbot script is already present
    if (
      !document.querySelector(
        `script[src="https://www.chatbase.co/embed.min.js"]`
      )
    ) {
      // Create a script element for the configuration
      const configScript = document.createElement("script");
      configScript.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "m3nqRCP0NEXhON8fdEQnN",
          domain: "www.chatbase.co"
        }
      `;
      document.body.appendChild(configScript);

      // Create a script element for the chatbot
      const chatbotScript = document.createElement("script");
      chatbotScript.src = "https://www.chatbase.co/embed.min.js";
      chatbotScript.setAttribute("chatbotId", "m3nqRCP0NEXhON8fdEQnN");
      chatbotScript.setAttribute("domain", "www.chatbase.co");
      chatbotScript.defer = true;
      document.body.appendChild(chatbotScript);
    }

    // Cleanup function to remove the scripts when the component unmounts
    return () => {
      const configScript = document.querySelector(
        `script[innerHTML*="window.embeddedChatbotConfig"]`
      );
      const chatbotScript = document.querySelector(
        `script[src="https://www.chatbase.co/embed.min.js"]`
      );
      if (configScript) document.body.removeChild(configScript);
      if (chatbotScript) document.body.removeChild(chatbotScript);
    };
  }, []);

  return <div>{/* You can add any additional markup or styling here */}</div>;
};

export default ChatbotComponent;
