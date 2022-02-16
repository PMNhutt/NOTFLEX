import React from 'react'
import { motion } from 'framer-motion'

function AnimatedPage({ children }) {

    const animation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }
    return (
        <motion.div
            variants={animation}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    )
}

export default AnimatedPage