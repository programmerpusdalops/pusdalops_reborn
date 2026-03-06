/**
 * Simple in-memory rate limiter.
 * @param {number} maxRequests - Max requests per window
 * @param {number} windowMs - Time window in milliseconds
 */
const rateLimiter = (maxRequests = 3, windowMs = 10 * 60 * 1000) => {
    const requests = new Map();

    // Cleanup expired entries every minute
    setInterval(() => {
        const now = Date.now();
        for (const [key, data] of requests) {
            if (now - data.startTime > windowMs) {
                requests.delete(key);
            }
        }
    }, 60 * 1000);

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();

        if (!requests.has(ip)) {
            requests.set(ip, { count: 1, startTime: now });
            return next();
        }

        const data = requests.get(ip);

        // Reset window if expired
        if (now - data.startTime > windowMs) {
            requests.set(ip, { count: 1, startTime: now });
            return next();
        }

        // Check if over limit
        if (data.count >= maxRequests) {
            return res.status(429).json({
                message: `Terlalu banyak laporan. Coba lagi dalam ${Math.ceil((windowMs - (now - data.startTime)) / 60000)} menit.`
            });
        }

        data.count++;
        return next();
    };
};

module.exports = rateLimiter;
