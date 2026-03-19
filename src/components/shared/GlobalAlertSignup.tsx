import { useState } from "react";
import { Bell, CheckCircle, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function GlobalAlertSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="rounded-xl border border-secondary/20 bg-gradient-to-r from-secondary/10 via-surface to-primary/5 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg bg-secondary p-2.5">
          <Bell size={20} className="text-secondary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground">{t("globalAlerts")}</h3>
          <div className="flex items-center gap-1.5">
            <Globe size={12} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">EN • PT • ES • FR — {t("alertsDesc")}</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg bg-accent/10 p-4"
          >
            <CheckCircle size={20} className="text-accent" />
            <p className="text-sm font-bold text-foreground">You're in! Watch your inbox for golden picks.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex gap-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <button
              type="submit"
              className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground transition-transform active:scale-95"
            >
              {t("subscribe")}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
