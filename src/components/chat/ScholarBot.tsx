"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ChatStep =
  | "GREETING"
  | "ASK_NAME"
  | "ASK_EMAIL"
  | "ASK_PHONE"
  | "ASK_CLASS"
  | "SUBMITTING"
  | "DONE"
  | "ERROR";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  buttons?: { label: string; value: string }[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BOT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCTRl5WZYvMOCYVTFZpKxMdwgXgMzYCY2tFrG9YuTG_2HpQ2IEmc97w6G-8I-VPe10hjGtIux3Xc7mbhn85BATJyjabwHi31Z-sElcNIsR_2ohVEHCh2t-r9v9KsNyuLtfBY0VfWdZdLb7tOj6gcxSpkdkoAp9PCixhZ8oRfXDc7le0GBjPfoFxRJsoRds-e6dayy-n04oJBvaz40wRA2_1S7S6NOk_wHB9vJWaiw-PLZkJDEY1HW74FlFPXx1KJ_4p8RcpDJZRA3kc";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let msgCounter = 0;
function uid() {
  return `msg-${++msgCounter}-${Date.now()}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ScholarBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("GREETING");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Collected data
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---- auto open ---- */
  useEffect(() => {
    // If it's open, or user already completed the flow, don't set a timer
    if (isOpen || sessionStorage.getItem("scholarbot_completed") === "true") return;

    const closeCount = parseInt(sessionStorage.getItem("scholarbot_close_count") || "0", 10);

    let delay = 10000;
    if (closeCount === 1) delay = 15000;
    else if (closeCount === 2) delay = 25000;
    else if (closeCount >= 3) delay = 35000;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen]);

  /* ---- helpers ---- */

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }, []);

  const addBotMessage = useCallback(
    (text: string, buttons?: ChatMessage["buttons"]) => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "bot", text, buttons },
        ]);
        setIsTyping(false);
        scrollToBottom();
      }, 600);
    },
    [scrollToBottom],
  );

  const addUserMessage = useCallback(
    (text: string) => {
      setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  /* ---- init greeting when opened ---- */

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "👋 Greetings, Scholar! I'd love to know more about you. What's your name?",
      );
      setStep("ASK_NAME");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ---- focus input on step change ---- */

  useEffect(() => {
    if (
      isOpen &&
      (step === "ASK_NAME" || step === "ASK_EMAIL" || step === "ASK_PHONE")
    ) {
      setTimeout(() => inputRef.current?.focus(), 700);
    }
  }, [step, isOpen]);

  /* ---- submit lead to API ---- */

  const submitLead = useCallback(
    async (name: string, email: string, phone: string, classLevel: string) => {
      setStep("SUBMITTING");
      setIsTyping(true);
      scrollToBottom();

      try {
        const res = await fetch("/api/chat-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone: phone || undefined, classLevel }),
        });

        const data = (await res.json()) as {
          success?: boolean;
          isNew?: boolean;
          error?: string;
        };

        setIsTyping(false);

        if (res.ok && data.success) {
          addBotMessage(
            `🎉 Awesome, ${name}! You're all set. We'll reach out to you at ${email} with details about your ${classLevel} journey. Welcome to the Destiny 4 NEET family!`,
          );
          setStep("DONE");
          sessionStorage.setItem("scholarbot_completed", "true");
        } else {
          addBotMessage(
            `😔 Oops! ${data.error ?? "Something went wrong."} Let's try again.`,
          );
          setStep("ERROR");
        }
      } catch {
        setIsTyping(false);
        addBotMessage(
          "😔 Looks like there was a network issue. Please try again!",
        );
        setStep("ERROR");
      }
    },
    [addBotMessage, scrollToBottom],
  );

  /* ---- handle user input ---- */

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");

    switch (step) {
      case "ASK_NAME": {
        addUserMessage(trimmed);
        setLeadName(trimmed);
        setStep("ASK_EMAIL");
        addBotMessage(`Nice to meet you, ${trimmed}! 📧 What's your email address?`);
        break;
      }
      case "ASK_EMAIL": {
        if (!EMAIL_RE.test(trimmed)) {
          addUserMessage(trimmed);
          addBotMessage("Hmm, that doesn't look like a valid email. Could you try again?");
          return;
        }
        addUserMessage(trimmed);
        setLeadEmail(trimmed);
        setStep("ASK_PHONE");
        addBotMessage("Got it! What's your phone number?", [
          { label: "Skip", value: "SKIP_PHONE" }
        ]);
        break;
      }
      case "ASK_PHONE": {
        addUserMessage(trimmed);
        setLeadPhone(trimmed);
        setStep("ASK_CLASS");
        addBotMessage("📚 Which class are you in?", [
          { label: "Class 11", value: "Class 11" },
          { label: "Class 12", value: "Class 12" },
          { label: "Dropper", value: "Dropper" },
        ]);
        break;
      }
      case "ERROR": {
        // Retry: restart from name
        setLeadName("");
        setLeadEmail("");
        setLeadPhone("");
        setStep("ASK_NAME");
        addBotMessage("Let's start fresh! What's your name?");
        break;
      }
      default:
        break;
    }
  }, [input, step, addUserMessage, addBotMessage]);

  const handleButtonAction = useCallback(
    (value: string) => {
      if (step === "ASK_PHONE" && value === "SKIP_PHONE") {
        addUserMessage("Skipped");
        setLeadPhone("");
        setStep("ASK_CLASS");
        addBotMessage("📚 Which class are you in?", [
          { label: "Class 11", value: "Class 11" },
          { label: "Class 12", value: "Class 12" },
          { label: "Dropper", value: "Dropper" },
        ]);
      } else if (step === "ASK_CLASS") {
        addUserMessage(value);
        void submitLead(leadName, leadEmail, leadPhone, value);
      }
    },
    [step, addUserMessage, addBotMessage, submitLead, leadName, leadEmail, leadPhone],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ---- reset on close so next open is fresh ---- */
  const handleClose = () => {
    setIsOpen(false);
    const count = parseInt(sessionStorage.getItem("scholarbot_close_count") || "0", 10);
    sessionStorage.setItem("scholarbot_close_count", (count + 1).toString());
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  /* ---- can user type? ---- */
  const canType =
    step === "ASK_NAME" || step === "ASK_EMAIL" || step === "ASK_PHONE" || step === "ERROR";

  const inputPlaceholder =
    step === "ASK_NAME"
      ? "Enter your name..."
      : step === "ASK_EMAIL"
        ? "Enter your email..."
        : step === "ASK_PHONE"
          ? "Enter your phone number..."
          : step === "ERROR"
            ? "Type anything to retry..."
            : step === "DONE"
              ? "Thanks for connecting! 🎉"
              : "Please wait...";

  const isInputInvalid =
    step === "ASK_EMAIL" && input.trim().length > 0 && !EMAIL_RE.test(input.trim());
  const isSendDisabled = !canType || !input.trim() || isInputInvalid;

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {/* ---- Expanded Chat Window ---- */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originY: 1, originX: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-0 right-0 w-80 h-[26rem] rounded-2xl shadow-[0_20px_50px_rgba(10,88,202,0.2)] overflow-hidden bg-white border border-outline flex flex-col"
          >
            {/* ---- Header ---- */}
            <div className="bg-primary p-4 flex items-center justify-between text-white border-b border-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              />
              <div className="flex items-center gap-3 relative z-10">
                <div>
                  <p className="font-bold text-lg">Destiny 4 NEET Agent</p>
                  <p className="text-[0.6rem] text-white/80 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/10 p-1 rounded-full transition-colors relative z-10"
              >
                <span className="material-symbols-outlined text-xl block">
                  close
                </span>
              </button>
            </div>

            {/* ---- Messages ---- */}
            <div
              ref={scrollRef}
              className="flex-grow p-4 bg-slate-50 overflow-y-auto space-y-3"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 text-[0.8rem] font-semibold leading-relaxed shadow-sm ${
                      msg.role === "bot"
                        ? "bg-white border border-outline-variant rounded-2xl rounded-tl-sm text-on-surface"
                        : "bg-primary text-white rounded-2xl rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                    {/* Class selection buttons */}
                    {msg.buttons && (
                      <div className={`flex gap-2 ${msg.buttons.some(b => b.value === "SKIP_PHONE") ? "mt-1" : "mt-3"}`}>
                        {msg.buttons.map((btn) => (
                          <button
                            key={btn.value}
                            onClick={() => handleButtonAction(btn.value)}
                            disabled={step !== "ASK_CLASS" && step !== "ASK_PHONE"}
                            className={
                              btn.value === "SKIP_PHONE"
                                ? "px-2 py-0.5 text-[10px] text-slate-800 hover:text-black underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                : "px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-semibold rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            }
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 items-center px-3 py-2"
                >
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:300ms]" />
                </motion.div>
              )}
            </div>

            {/* ---- Input Bar ---- */}
            <div className="p-3 bg-white border-t border-outline-variant flex items-center gap-2">
              <div className="relative flex-grow flex items-center">
                <input
                  ref={inputRef}
                  className={`w-full bg-slate-50 text-xs focus:ring-1 px-4 py-2.5 rounded-full outline-none transition-all disabled:opacity-60 ${
                    isInputInvalid
                      ? "border border-red-400 focus:ring-red-400/50 text-red-900 bg-red-50"
                      : "border-none focus:ring-primary/30"
                  }`}
                  placeholder={inputPlaceholder}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!canType}
                />
                {isInputInvalid && (
                  <span className="material-symbols-outlined text-red-500 absolute right-3 text-sm">
                    error
                  </span>
                )}
              </div>
              <button
                onClick={handleSend}
                disabled={isSendDisabled}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-primary text-white rounded-full hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Floating Action Button (Toggle) ---- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="absolute bottom-0 right-0 w-14 h-14 bg-primary text-white rounded-full shadow-[0_10px_40px_rgba(10,88,202,0.4)] flex items-center justify-center border border-white/10 group"
          >
            {/* Subtle continuous pulse for the button to draw attention */}
            <motion.div
              className="absolute inset-0 rounded-full border border-primary"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="material-symbols-outlined text-2xl relative z-10 group-hover:animate-bounce">
              chat
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
