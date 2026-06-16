import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function AppLayout() {
  return (
    <>
      <div className="px-16">
        <Header />
        <main className="pt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </>
  );
}
