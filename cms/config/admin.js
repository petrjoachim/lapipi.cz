module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7022615f64935c41b9a5247975f549a8'),
  },
});
