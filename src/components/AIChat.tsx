import { useState, useRef, useEffect } from "react";
import { Box, Card, Typography, InputBase, Button, useTheme } from "@mui/material";
import FeatherIcon from "feather-icons-react";

export default function AIChat() {
  const theme = useTheme();
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: "Sample AI response." }]);
    }, 500);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 380,
        height: "auto",
        borderRadius: 2,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: theme.palette.background.paper, // ivory/white
        border: `1px solid ${theme.palette.primary.main}20`,
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
        AI Assistant
      </Typography>

      {/* Messages container */}
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          borderRadius: 2,
          border: `1px solid ${theme.palette.primary.main}20`,
          backgroundColor: "#FFF",
        }}
      >
        {messages.length === 0 && (
          <Typography variant="body2" sx={{ color: "#999" }}>
            Ask me anything...
          </Typography>
        )}
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              p: 1.5,
              borderRadius: theme.shape.borderRadius,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.role === "user" ? theme.palette.primary.light + "40" : "#fdfafa",
              border: msg.role === "ai" ? `1px solid ${theme.palette.primary.main}20` : "none",
              color: theme.palette.primary.contrastText,
              maxWidth: "75%",
            }}
          >
            <Typography variant="body2">{msg.content}</Typography>
          </Box>
        ))}
      </Box>

      {/* Input row */}
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <InputBase
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{
            flex: 1,
            px: 2,
            py: 1,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.primary.main}40`,
          }}
        />
        <Button
          onClick={handleSend}
          sx={{
            borderRadius: theme.shape.borderRadius,
            minWidth: 40,
            minHeight: 40,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <FeatherIcon icon="send" color={theme.palette.primary.contrastText} />
        </Button>
      </Box>
    </Card>
  );
}
