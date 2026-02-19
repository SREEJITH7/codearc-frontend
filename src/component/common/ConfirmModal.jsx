import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",  
}) => {
  const variantStyles = {
    danger: {
      icon: "text-red-400",
      iconBg: "bg-red-500/10 border-red-500/20",
      confirm: "bg-red-600 hover:bg-red-500 shadow-red-500/25",
    },
    warning: {
      icon: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/20",
      confirm: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/25",
    },
    info: {
      icon: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      confirm: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
    },
  };

  const s = variantStyles[variant] ?? variantStyles.danger;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle top gradient line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />

            <div className="p-6">
              {/* Close button */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700/80 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2.5 rounded-xl border ${s.iconBg} flex-shrink-0`}>
                  <AlertTriangle className={`w-5 h-5 ${s.icon}`} />
                </div>
                <div className="pt-0.5">
                  <h2 className="text-base font-semibold text-white">{title}</h2>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">{message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300
                    hover:bg-slate-800 hover:text-white transition-all text-sm font-medium"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium text-sm
                    shadow-lg transition-all ${s.confirm}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};