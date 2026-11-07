import React, { useState } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm your HospitalLocker AI Health Assistant. I can help you understand your available healthcare records.",
    },
  ]);

  const getPatientContext = () => {
    let referral = null;
    let consultation = null;
    let prescription = null;

    try {
      referral = JSON.parse(
        localStorage.getItem("hospitalLockerReferral") || "null"
      );

      consultation = JSON.parse(
        localStorage.getItem("hospitalLockerConsultation") || "null"
      );

      prescription = JSON.parse(
        localStorage.getItem("hospitalLockerPrescription") || "null"
      );
    } catch (error) {
      console.error("Unable to read patient context:", error);
    }

    return {
      referral,
      consultation,
      prescription,
    };
  };

  const sendMessage = async (text = message) => {
    const userMessage = text.trim();

    if (!userMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const patientContext = getPatientContext();

      const response = await fetch(
        "http://localhost:5000/api/ai/assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            patientContext,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "I'm currently unable to connect to the AI service. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Summarize my healthcare journey",
    "What is my latest prescription?",
    "Explain my treatment in simple language",
  ];

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="ai-floating-button"
          aria-label="Open AI Health Assistant"
        >
          <Sparkles size={21} />
          <span>AI Assistant</span>
        </button>
      )}

      {open && (
        <div className="ai-assistant">
          {/* Header */}
          <div className="ai-header">
            <div className="ai-header-left">
              <div className="ai-icon">
                <Bot size={21} />
              </div>

              <div>
                <strong>AI Health Assistant</strong>
                <span>HospitalLocker AI</span>
              </div>
            </div>

            <button
              className="ai-close"
              onClick={() => setOpen(false)}
              aria-label="Close AI Assistant"
            >
              <X size={19} />
            </button>
          </div>

          {/* Security */}
          <div className="ai-security">
            <ShieldCheck size={15} />
            <span>
              Uses your available authorized health information
            </span>
          </div>

          {/* Messages */}
          <div className="ai-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.role === "user"
                    ? "ai-message user-message"
                    : "ai-message bot-message"
                }
              >
                {item.text}
              </div>
            ))}

            {loading && (
              <div className="ai-message bot-message loading-message">
                <LoaderCircle size={16} className="spin" />
                Thinking...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              <div className="quick-title">Try asking:</div>

              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="ai-input-area">
            <input
              type="text"
              placeholder="Ask about your health records..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!message.trim() || loading}
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="ai-disclaimer">
            AI provides information from available records and does not
            replace a qualified healthcare professional.
          </div>
        </div>
      )}

      <style>{`
        .ai-floating-button {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 99999;

          display: flex;
          align-items: center;
          gap: 9px;

          border: none;
          border-radius: 999px;

          padding: 13px 19px;

          background: #0f4c81;
          color: white;

          font-size: 14px;
          font-weight: 700;

          cursor: pointer;

          box-shadow: 0 8px 25px rgba(15, 76, 129, 0.28);

          transition: all 0.2s ease;
        }

        .ai-floating-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(15, 76, 129, 0.35);
        }

        .ai-assistant {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 99999;

          width: 380px;
          max-width: calc(100vw - 32px);

          background: white;
          border: 1px solid #dbe7f0;
          border-radius: 18px;

          overflow: hidden;

          box-shadow: 0 20px 50px rgba(15, 50, 80, 0.22);

          animation: aiSlideUp 0.25s ease;
        }

        @keyframes aiSlideUp {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .ai-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 16px 18px;

          background: #0f4c81;
          color: white;
        }

        .ai-header-left {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .ai-icon {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: rgba(255, 255, 255, 0.15);
        }

        .ai-header strong {
          display: block;
          font-size: 14px;
        }

        .ai-header span {
          display: block;
          margin-top: 2px;

          font-size: 11px;
          opacity: 0.8;
        }

        .ai-close {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: none;
          border-radius: 8px;

          background: transparent;
          color: white;

          cursor: pointer;
        }

        .ai-close:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .ai-security {
          display: flex;
          align-items: center;
          gap: 7px;

          padding: 9px 14px;

          background: #e8f7f5;
          color: #0f766e;

          font-size: 11px;
          font-weight: 600;
        }

        .ai-messages {
          height: 280px;

          overflow-y: auto;

          padding: 15px;

          background: #f5f9fc;
        }

        .ai-message {
          max-width: 85%;

          margin-bottom: 10px;
          padding: 10px 12px;

          border-radius: 12px;

          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .bot-message {
          margin-right: auto;

          background: white;
          border: 1px solid #e0eaf1;

          color: #16324f;

          border-bottom-left-radius: 4px;
        }

        .user-message {
          margin-left: auto;

          background: #0f4c81;
          color: white;

          border-bottom-right-radius: 4px;
        }

        .loading-message {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .quick-questions {
          padding: 10px 14px;

          border-top: 1px solid #e6edf2;
        }

        .quick-title {
          margin-bottom: 7px;

          color: #64748b;

          font-size: 11px;
          font-weight: 700;
        }

        .quick-questions button {
          display: block;

          width: 100%;

          margin-bottom: 6px;
          padding: 8px 10px;

          border: 1px solid #d8e5ed;
          border-radius: 8px;

          background: white;
          color: #16324f;

          text-align: left;
          font-size: 11px;

          cursor: pointer;

          transition: all 0.15s ease;
        }

        .quick-questions button:hover {
          background: #eaf4fb;
          border-color: #b9d3e5;
        }

        .ai-input-area {
          display: flex;
          gap: 8px;

          padding: 11px 14px;

          border-top: 1px solid #e6edf2;
          background: white;
        }

        .ai-input-area input {
          flex: 1;

          min-width: 0;

          padding: 10px 12px;

          border: 1px solid #d5e2ea;
          border-radius: 9px;

          outline: none;

          color: #16324f;
          font-size: 12px;
        }

        .ai-input-area input:focus {
          border-color: #0f4c81;
        }

        .ai-input-area button {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: none;
          border-radius: 9px;

          background: #0f4c81;
          color: white;

          cursor: pointer;
        }

        .ai-input-area button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .ai-disclaimer {
          padding: 8px 14px 12px;

          background: white;

          color: #94a3b8;

          font-size: 9px;
          line-height: 1.4;

          text-align: center;
        }

        @media (max-width: 500px) {
          .ai-assistant {
            right: 16px;
            bottom: 16px;
            width: calc(100vw - 32px);
          }

          .ai-floating-button {
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </>
  );
}