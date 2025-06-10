// lib/animation/motionVariants.ts
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay = 0, duration = 0.6) => {
    let x = 0;
    let y = 0;

    switch (direction) {
        case "left":
            x = -50;
            break;
        case "right":
            x = 50;
            break;
        case "up":
            y = 50;
            break;
        case "down":
            y = -50;
            break;
    }

    return {
        initial: { opacity: 0, x, y },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { delay, duration, ease: "easeOut" },
    };
};

export const slideIn = (direction: "left" | "right" | "up" | "down" = "up", delay = 0, duration = 0.8) => {
    const variants = {
        hidden: { x: 0, y: 0 },
        show: { x: 0, y: 0 },
    };

    if (direction === "left") variants.hidden.x = -100;
    if (direction === "right") variants.hidden.x = 100;
    if (direction === "up") variants.hidden.y = 100;
    if (direction === "down") variants.hidden.y = -100;

    return {
        ...variants,
        hidden: { ...variants.hidden, opacity: 0 },
        show: {
            ...variants.show,
            opacity: 1,
            transition: { delay, duration, type: "spring", stiffness: 50 },
        },
    };
};

export const zoomIn = (delay = 0, duration = 0.6) => ({
    initial: { scale: 0.9, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { delay, duration, ease: "easeOut" },
    },
});

export const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});
  