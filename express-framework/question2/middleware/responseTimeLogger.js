const responseTimeLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`${req.method} ${req.originalUrl} - ${responseTime}ms`);
  });

  next();
};

export default responseTimeLogger;