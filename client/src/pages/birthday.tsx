import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Star, Music, VolumeX, ChevronDown, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

interface Balloon {
  id: number;
  x: number;
  color: string;
  size: number;
  popped: boolean;
  delay: number;
}

interface GiftBox {
  id: number;
  color: string;
  ribbonColor: string;
  message: string;
  icon: string;
  opened: boolean;
}

const CONFETTI_COLORS = ["#FF6B9D", "#C77DFF", "#FFE66D", "#7DFFBB", "#FF7F7F", "#87CEEB", "#FFDAB9"];
const BALLOON_COLORS = ["#FF6B9D", "#C77DFF", "#FFE66D", "#7DFFBB", "#FF7F7F", "#87CEEB"];

const GIFT_MESSAGES: GiftBox[] = [
  {
    id: 1,
    color: "#FF6B9D",
    ribbonColor: "#C77DFF",
    message: "Tum bahut special ho! Duniya ki sabse pyari insaan!",
    icon: "heart",
    opened: false,
  },
  {
    id: 2,
    color: "#C77DFF",
    ribbonColor: "#FFE66D",
    message: "Har din tumhari smile se roshni aati hai!",
    icon: "star",
    opened: false,
  },
  {
    id: 3,
    color: "#FFE66D",
    ribbonColor: "#FF6B9D",
    message: "Tumhari khushiyan hamesha bani rahe!",
    icon: "sparkle",
    opened: false,
  },
];

function ConfettiPiece({ confetti }: { confetti: Confetti }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${confetti.x}%`,
        top: -20,
        width: confetti.size,
        height: confetti.size,
        backgroundColor: confetti.color,
        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
      }}
      initial={{ y: -100, rotate: 0, opacity: 1 }}
      animate={{
        y: "100vh",
        rotate: 720,
        opacity: 0,
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: confetti.delay,
        ease: "linear",
      }}
    />
  );
}

function BirthdayCake({ onAllCandlesLit }: { onAllCandlesLit: () => void }) {
  const [candles, setCandles] = useState([false, false, false, false, false]);
  const [showWish, setShowWish] = useState(false);

  const lightCandle = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = true;
    setCandles(newCandles);

    if (newCandles.every((c) => c)) {
      setTimeout(() => {
        setShowWish(true);
        onAllCandlesLit();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Candles */}
        <div className="flex justify-center gap-4 mb-2 relative z-10">
          {candles.map((lit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !lit && lightCandle(index)}
              data-testid={`candle-${index}`}
            >
              {/* Flame */}
              <AnimatePresence>
                {lit && (
                  <motion.div
                    className="w-4 h-6 rounded-full mb-1"
                    style={{
                      background: "linear-gradient(to top, #FF6B00, #FFE66D, #FFF)",
                      filter: "blur(1px)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <motion.div
                      className="w-full h-full rounded-full"
                      animate={{ scaleY: [1, 1.1, 0.9, 1], scaleX: [1, 0.9, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              {!lit && <div className="w-4 h-6 mb-1" />}
              {/* Candle stick */}
              <div
                className="w-3 h-12 rounded-sm"
                style={{
                  background: `linear-gradient(to right, ${
                    ["#FF6B9D", "#C77DFF", "#FFE66D", "#7DFFBB", "#87CEEB"][index]
                  }, ${["#FF8FB3", "#D99EFF", "#FFF099", "#9EFFD1", "#A8DCEF"][index]})`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Cake layers */}
        <div className="flex flex-col items-center">
          {/* Top layer */}
          <div
            className="w-48 h-16 rounded-t-2xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #FF6B9D, #FF8FB3)" }}
          >
            <div className="absolute inset-x-0 top-2 flex justify-around">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-white/50" />
              ))}
            </div>
            <div
              className="absolute bottom-0 inset-x-0 h-4"
              style={{
                background: "repeating-linear-gradient(90deg, #C77DFF, #C77DFF 10px, transparent 10px, transparent 20px)",
              }}
            />
          </div>

          {/* Middle layer */}
          <div
            className="w-56 h-14 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #C77DFF, #D99EFF)" }}
          >
            <div
              className="absolute inset-y-0 inset-x-0"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 10px, #FFE66D 10px, #FFE66D 12px)",
              }}
            />
          </div>

          {/* Bottom layer */}
          <div
            className="w-64 h-16 rounded-b-xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #FFE66D, #FFF099)" }}
          >
            <div className="absolute inset-x-0 bottom-2 flex justify-around">
              {[...Array(7)].map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-birthday-pink fill-birthday-pink" />
              ))}
            </div>
          </div>

          {/* Cake plate */}
          <div className="w-72 h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full mt-1 shadow-lg" />
        </div>
      </motion.div>

      {/* Instructions / Wish text */}
      <AnimatePresence mode="wait">
        {!showWish ? (
          <motion.p
            key="instruction"
            className="text-lg text-birthday-purple font-quicksand font-medium text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Candles par click karo unhe jalane ke liye!
          </motion.p>
        ) : (
          <motion.div
            key="wish"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl md:text-3xl font-dancing text-birthday-pink mb-2">
              Ab aankhen band karo...
            </p>
            <p className="text-xl md:text-2xl font-dancing text-birthday-purple animate-pulse-glow">
              Aur wish karo!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GiftBoxComponent({ gift, onOpen }: { gift: GiftBox; onOpen: () => void }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (!gift.opened) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        onOpen();
      }, 500);
    }
  };

  const getIcon = () => {
    switch (gift.icon) {
      case "heart":
        return <Heart className="w-8 h-8 text-birthday-pink fill-birthday-pink" />;
      case "star":
        return <Star className="w-8 h-8 text-birthday-yellow fill-birthday-yellow" />;
      case "sparkle":
        return <Sparkles className="w-8 h-8 text-birthday-purple" />;
      default:
        return <Gift className="w-8 h-8" />;
    }
  };

  return (
    <motion.div
      className={`cursor-pointer ${isShaking ? "animate-gift-shake" : ""}`}
      whileHover={{ scale: gift.opened ? 1 : 1.05, y: gift.opened ? 0 : -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      data-testid={`gift-box-${gift.id}`}
    >
      <Card className="relative w-40 h-48 md:w-48 md:h-56 overflow-hidden border-0 shadow-xl">
        <AnimatePresence mode="wait">
          {!gift.opened ? (
            <motion.div
              key="closed"
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ backgroundColor: gift.color }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Ribbon vertical */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6"
                style={{ backgroundColor: gift.ribbonColor }}
              />
              {/* Ribbon horizontal */}
              <div
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6"
                style={{ backgroundColor: gift.ribbonColor }}
              />
              {/* Bow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <div
                    className="absolute -left-6 -top-2 w-8 h-6 rounded-full rotate-[-30deg]"
                    style={{ backgroundColor: gift.ribbonColor }}
                  />
                  <div
                    className="absolute -right-6 -top-2 w-8 h-6 rounded-full rotate-[30deg]"
                    style={{ backgroundColor: gift.ribbonColor }}
                  />
                  <div
                    className="relative w-6 h-6 rounded-full z-10"
                    style={{ backgroundColor: gift.ribbonColor }}
                  />
                </div>
              </div>
              <p className="absolute bottom-4 text-white/80 font-quicksand text-sm">
                Click to open!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-birthday-lavender"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {getIcon()}
              </motion.div>
              <motion.p
                className="text-center font-quicksand text-sm md:text-base font-medium text-gray-700 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {gift.message}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function BalloonGame({ onPop }: { onPop: () => void }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    const newBalloons: Balloon[] = [];
    for (let i = 0; i < 12; i++) {
      newBalloons.push({
        id: i,
        x: 5 + Math.random() * 85,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        size: 50 + Math.random() * 30,
        popped: false,
        delay: Math.random() * 3,
      });
    }
    setBalloons(newBalloons);
  }, []);

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setScore((s) => s + 1);
    onPop();
  };

  return (
    <div className="relative min-h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-birthday-sky/30 to-birthday-lavender/30">
      {!gameStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <PartyPopper className="w-16 h-16 text-birthday-pink animate-bounce-slow" />
          <p className="text-xl font-quicksand font-semibold text-birthday-purple">
            Balloon Pop Game!
          </p>
          <Button
            onClick={startGame}
            className="bg-birthday-pink hover:bg-birthday-coral text-white font-quicksand font-semibold px-8 py-3 rounded-full"
            data-testid="start-balloon-game"
          >
            Shuru Karo!
          </Button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="font-quicksand font-bold text-birthday-purple">
              Score: {score}
            </span>
          </div>

          <AnimatePresence>
            {balloons.map(
              (balloon) =>
                !balloon.popped && (
                  <motion.div
                    key={balloon.id}
                    className="absolute cursor-pointer z-10"
                    style={{ left: `${balloon.x}%` }}
                    initial={{ y: "100vh" }}
                    animate={{ y: "-120%" }}
                    transition={{
                      duration: 6 + Math.random() * 4,
                      delay: balloon.delay,
                      ease: "linear",
                    }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => popBalloon(balloon.id)}
                    data-testid={`balloon-${balloon.id}`}
                  >
                    {/* Balloon */}
                    <div
                      className="rounded-full relative"
                      style={{
                        width: balloon.size,
                        height: balloon.size * 1.2,
                        backgroundColor: balloon.color,
                        boxShadow: `inset -10px -10px 30px rgba(0,0,0,0.1), inset 10px 10px 30px rgba(255,255,255,0.3)`,
                      }}
                    >
                      {/* Shine */}
                      <div className="absolute top-3 left-3 w-4 h-4 bg-white/40 rounded-full" />
                    </div>
                    {/* String */}
                    <div
                      className="w-0.5 h-12 mx-auto"
                      style={{ backgroundColor: balloon.color }}
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {balloons.every((b) => b.popped) && balloons.length > 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sparkles className="w-12 h-12 text-birthday-yellow animate-sparkle" />
              <p className="text-2xl font-quicksand font-bold text-birthday-purple">
                Bahut Badiya!
              </p>
              <p className="text-lg font-quicksand text-birthday-pink">
                Tumne saare balloons phodd diye!
              </p>
              <Button
                onClick={startGame}
                className="bg-birthday-purple hover:bg-birthday-pink text-white font-quicksand font-semibold px-6 py-2 rounded-full mt-2"
                data-testid="restart-balloon-game"
              >
                Phir Se Khelo!
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default function BirthdayPage() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [gifts, setGifts] = useState(GIFT_MESSAGES);
  const [isMuted, setIsMuted] = useState(true);

  // Initial confetti burst
  useEffect(() => {
    if (showConfetti) {
      const newConfetti: Confetti[] = [];
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 100,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          delay: Math.random() * 2,
          size: 8 + Math.random() * 8,
        });
      }
      setConfetti(newConfetti);

      const timeout = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 30; i++) {
      newConfetti.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 1,
        size: 8 + Math.random() * 8,
      });
    }
    setConfetti((prev) => [...prev, ...newConfetti]);
  };

  const openGift = (id: number) => {
    setGifts((prev) =>
      prev.map((g) => (g.id === id ? { ...g, opened: true } : g))
    );
    triggerConfetti();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-birthday-lavender via-white to-birthday-peach font-quicksand overflow-x-hidden">
      {/* Confetti */}
      {showConfetti && confetti.map((c) => <ConfettiPiece key={c.id} confetti={c} />)}

      {/* Music toggle */}
      <Button
        size="icon"
        variant="ghost"
        className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm shadow-lg rounded-full"
        onClick={() => setIsMuted(!isMuted)}
        data-testid="music-toggle"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-birthday-purple" />
        ) : (
          <Music className="w-5 h-5 text-birthday-purple" />
        )}
      </Button>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-10 text-birthday-pink"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Star className="w-8 h-8 fill-birthday-yellow text-birthday-yellow" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-16 text-birthday-purple"
          animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <Heart className="w-6 h-6 fill-birthday-pink text-birthday-pink" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-10 h-10 text-birthday-purple" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <PartyPopper className="w-8 h-8 text-birthday-coral" />
        </motion.div>

        {/* Main greeting */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-birthday-purple font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Happy Birthday
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-birthday-pink via-birthday-purple to-birthday-coral"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            data-testid="birthday-name"
          >
            Amishi
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Heart className="w-6 h-6 text-birthday-pink fill-birthday-pink animate-heart-beat" />
            <span className="text-lg md:text-xl text-birthday-purple font-dancing">
              Tumhara din bahut khaas ho!
            </span>
            <Heart className="w-6 h-6 text-birthday-pink fill-birthday-pink animate-heart-beat" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-birthday-purple/60" />
        </motion.div>
      </section>

      {/* Cake Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-birthday-lavender/30">
        <motion.h2
          className="text-3xl md:text-4xl font-dancing text-birthday-purple mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Birthday Cake!
        </motion.h2>
        <BirthdayCake onAllCandlesLit={triggerConfetti} />
      </section>

      {/* Gift Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-birthday-lavender/30 to-white">
        <motion.h2
          className="text-3xl md:text-4xl font-dancing text-birthday-pink mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Surprise Gifts!
        </motion.h2>
        <motion.p
          className="text-birthday-purple/70 mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Har gift mein ek special message hai tumhare liye!
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GiftBoxComponent gift={gift} onOpen={() => openGift(gift.id)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Balloon Game Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-birthday-sky/20">
        <motion.h2
          className="text-3xl md:text-4xl font-dancing text-birthday-purple mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Balloon Pop!
        </motion.h2>
        <motion.p
          className="text-birthday-purple/70 mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Saare balloons phodne ki koshish karo!
        </motion.p>
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <BalloonGame onPop={triggerConfetti} />
        </motion.div>
      </section>

      {/* Final Message Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-birthday-sky/20 to-birthday-peach/50 relative">
        {/* Decorations */}
        <motion.div
          className="absolute top-20 left-[10%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 fill-birthday-yellow text-birthday-yellow" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 fill-birthday-pink text-birthday-pink" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-[20%]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-birthday-purple" />
        </motion.div>

        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 mx-auto text-birthday-pink fill-birthday-pink" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-pacifico text-birthday-purple mb-8">
            Amishi
          </h2>

          <div className="space-y-4 text-lg md:text-xl font-quicksand text-gray-700">
            <p>Tumhara ye special din bahut khaas ho!</p>
            <p>Dher saari khushiyan, pyaar aur masti!</p>
            <p className="text-birthday-pink font-semibold">
              Bahut saara pyaar tumhare liye!
            </p>
          </div>

          <motion.div
            className="mt-12 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              >
                <Star
                  className="w-6 h-6 fill-birthday-yellow text-birthday-yellow"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="mt-8 text-2xl md:text-3xl font-dancing text-birthday-coral"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Happy Birthday!
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-birthday-peach/50">
        <p className="text-birthday-purple/60 font-quicksand text-sm">
          Made with{" "}
          <Heart className="inline w-4 h-4 text-birthday-pink fill-birthday-pink" />{" "}
          for Amishi
        </p>
      </footer>
    </div>
  );
}
